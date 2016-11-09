var app = angular.module('godmin', ['ngMaterial', 'md.data.table', 'ui.select', 'ngFileUpload']);

app.config(['$mdThemingProvider', '$mdIconProvider', '$sceDelegateProvider', function($mdThemingProvider, $mdIconProvider, $sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    // Adding 'self' to the whitelist, will allow requests from the current origin.
    'self',
    // Using double asterisks here, will allow all URLs to load.
    // We recommend to only specify the given domain you want to allow.
    '**'
  ]);

  $mdIconProvider.defaultIconSet('//s3-eu-west-1.amazonaws.com/godmin-material/icons/mdi.svg');
  
  // Extend the purple theme with a different color
  // var purple = $mdThemingProvider.extendPalette('purple', {
  //   '500': 'rgba(131,24,120, 1)',
  // });
  // var purpleAccent = $mdThemingProvider.extendPalette('purple', {
  //   'A200': 'rgba(200, 246, 253, 0.8)',
  //   'contrastDefaultColor': 'light'
  // });

  // // Register the new color palette map with the name SpartacusPurple
  // $mdThemingProvider.definePalette('SpartacusPurple', purple);
  // $mdThemingProvider.definePalette('SpartacusPurpleAccent', purpleAccent);
  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
}]);

app.controller('GodminController', ['$scope', '$mdSidenav', '$mdDialog', '$http', '$window', function($scope, $mdSidenav, $mdDialog, $http, $window) {
  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  }

  $scope.deleteRow = function(path, id) {
    $http.delete(path);
    $window.location.reload();
  }

  $scope.showServerRenderedDialog = function(ev, title, content, label, ok, cancel, callback, args) {
    var confirm = $mdDialog.confirm()
      .title(title)
      .textContent(content)
      .ariaLabel(label)
      .targetEvent(ev)
      .ok(ok)
      .cancel(cancel);

    $mdDialog.show(confirm).then(function() {
      callback.apply(this, args)
    }, function() {
    });
  }

  $scope.showDialog = function(ev, contentId) {
    $mdDialog.show({
      contentElement: contentId,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };

}])

app.directive('flash', ['$document', '$mdToast', function($document, $mdToast) {

  function link(scope, element, attrs) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(attrs.message)
        .position(attrs.position || 'bottom left')
        .hideDelay(4000)
    );
  }

  return {
    restrict: 'E',
    transclude: true,
    link: link
  }
}]);

app.directive('search', ['$http', function($http) {

  return {
    restrict: 'E',
    scope: {
      model:        '=',
      query:        '@',
      url:          '@',
      defaultQuery: '@',
      hiddenName:   '@',
      firstKey:     '@',
      secondKey:    '@'
    },
    template: "<input ng-model='query' ng-init='query = defaultQuery' ng-keyup='search()' ng-focus='search()' autocomplete='off' />"+
              "<div ng-if='results.length > 0' class='dropdown md-whiteframe-z4'>"+
                "<div class='backdrop' ng-click='resetSearch()'></div>"+
                "<md-button ng-click='selectResult(result)' ng-repeat='result in results' class='result'>"+
                  "{{firstKey && result[firstKey]}} {{secondKey && result[secondKey]}}"+
                "</md-button>"+
              "</div>"+
              "<input type='hidden' name='{{hiddenName}}' value='{{selectedResult.id}}'>",

    controller: ['$scope', '$element', function($scope, $element) {

      $scope.search = function() {
        if ($scope.query.length == 0) {
          $scope.results = [];
        } else {
          if ($scope.query.length > 2) {
            $http.put($scope.url, {q: $scope.query}).then(function(res) {
              $scope.results = res.data;
            });
          }
        }
      }

      $scope.resetSearch = function() {
        $scope.results = [];
      }
      $scope.selectResult = function(result) {
        $scope.resetSearch();
        $scope.query =  ($scope.firstKey && !$scope.secondKey) ?
                          result[$scope.firstKey] :
                        ($scope.firstKey && $scope.secondKey) ?
                          result[$scope.firstKey]  + ' ' + result[$scope.secondKey] :
                        $scope.query;
        $scope.selectedResult = result;
        if($scope.model) {
          $scope.model(result);
        } 
      }
    }]
  };
}]);