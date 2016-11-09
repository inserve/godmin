
app.config(['$mdThemingProvider', function($mdThemingProvider) {

  $mdThemingProvider.definePalette('godmin', {
    '50': 'rgba(74, 172, 57, 1)',
    '100': 'rgba(74, 172, 57, 1)',
    '200': 'rgba(74, 172, 57, 1)',
    '300': 'rgba(74, 172, 57, 1)',
    '400': 'rgba(74, 172, 57, 1)',
    '500': 'rgba(74, 172, 57, 1)', // Primary color
    '600': 'rgba(74, 172, 57, 0.8)', // Hover color etc.
    '700': 'rgba(74, 172, 57, 1)',
    '800': 'rgba(74, 172, 57, 1)',
    '900': 'rgba(74, 172, 57, 1)',
    'A100': 'rgba(74, 172, 57, 1)',
    'A200': 'rgba(74, 172, 57, 1)',
    'A400': 'rgba(74, 172, 57, 1)',
    'A700': 'rgba(74, 172, 57, 1)',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('godmin')
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
}]);