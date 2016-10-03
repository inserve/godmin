var app = angular.module('godmin', ['ngMaterial', 'md.data.table', 'ui.select']);

app.config(['$mdThemingProvider', '$mdIconProvider', '$sceDelegateProvider', function($mdThemingProvider, $mdIconProvider, $sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    // Adding 'self' to the whitelist, will allow requests from the current origin.
    'self',
    // Using double asterisks here, will allow all URLs to load.
    // We recommend to only specify the given domain you want to allow.
    '**'
  ]);

  $mdIconProvider.defaultIconSet('//godmin-material.s3-website-eu-west-1.amazonaws.com/icons/mdi.svg');

  // // Extend the cyan theme with a different color
  // var cyan = $mdThemingProvider.extendPalette('cyan', {
  //   '500': 'rgba(0, 127, 145, 1)',
  // });
  // var cyanAccent = $mdThemingProvider.extendPalette('cyan', {
  //   'A200': 'rgba(200, 246, 253, 0.8)',
  //   'contrastDefaultColor': 'light'
  // });

  // // Register the new color palette map with the name SpartacusCyan
  // $mdThemingProvider.definePalette('SpartacusCyan', cyan);
  // $mdThemingProvider.definePalette('SpartacusCyanAccent', cyanAccent);
  // // Use that theme for the primary intentions
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('SpartacusCyan')
  //   .accentPalette('SpartacusCyanAccent');
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