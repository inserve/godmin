var app = angular.module('godmin', ['ngMaterial', 'md.data.table', 'ui.select']);

app.config(['$mdThemingProvider', '$mdIconProvider', '$sceDelegateProvider', function($mdThemingProvider, $mdIconProvider, $sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    // Adding 'self' to the whitelist, will allow requests from the current origin.
    'self',
    // Using double asterisks here, will allow all URLs to load.
    // We recommend to only specify the given domain you want to allow.
    '**'
  ]);

  $mdIconProvider.defaultIconSet('//http://s3-eu-west-1.amazonaws.com/godmin-material/icons/mdi.svg');

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