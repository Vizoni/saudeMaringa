angular.module('routes', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('menuPrincipal', {
    url: '/menuPrincipal',
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  .state('especialidades', {
    url: '/especialidades/{coreTipo}',
    templateUrl: 'templates/listagemSemFoto.html',
    controller: 'ListagemCtrl',
    params: {
      coreTipo: {value: null}
    }
  })

  .state('listagemCore', {
    url: '/listagemCore/{coreTipo}/{especialidadeTipo}',
    templateUrl: 'templates/listagemComFoto.html',
    controller: 'ListagemCoreCtrl',
    params: {
      coreTipo: {value: null},
      especialidadeTipo: {value: null},
    }
  })

  .state('listagemExame', {
    url: '/listagemExame/{coreTipo}',
    templateUrl: 'templates/listagemSemFoto.html',
    controller: 'ListagemExameCtrl',
    params: {
      coreTipo: {value: null},
    }
  })

  .state('perfil', {
    url: '/perfil/{id_tipo}/{id}',
    templateUrl: 'templates/perfil.html',
    controller: 'perfilCtrl',
    params: {
      id_tipo: {value: null},
      id: {value: null}
    }
  })

  $urlRouterProvider.otherwise('/menuPrincipal');

});
