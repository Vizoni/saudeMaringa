angular.module('app', ['ionic','app.controllers','routes','app.factories','app.directives'])

.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        var alerta = $ionicPopup.alert({
              title: "Você não está conectado à internet!",
              template: "Verifique sua conexão e tente novamente.",
              okText: " Entendi!",
              okType: 'ion-wifi button-balanced'
        });
        alerta.then( function (response) {
          ionic.Platform.exitApp();
        })
      }
    // }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });


})
