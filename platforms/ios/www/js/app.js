
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
   
  })
  
  .state('app.settings',{
      url: '/settings',
      views: {
          'menuContent': {
              templateUrl: 'templates/settings.html',
              controller: 'SettingsCtrl'
          }
      }
      
      
  })
  
   .state('app.list', {
    url: '/list/:listID',
    views: {
      'menuContent': { 
        templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/list/1');
});
