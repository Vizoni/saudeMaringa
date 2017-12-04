angular.module('app.controllers', [])
.controller('MenuCtrl', function ($scope,$state,$ionicHistory) {

  console.log("O objeto de parametro passado é:",$state.params);

  $scope.menuItems = [
    {id:"1",img:"img/08.png",img2:"img/icon011.png",name:"Médico",link:"especialidades"},
    {id:"2",img:"img/06.png",img2:"img/icon022.png",name:"Dentista",link:"/app/services"},
    {id:"3",img:"img/03.png",img2:"img/icon033.png",name:"Exames",link:"/app/about-us"},
    {id:"4",img:"img/02.png",img2:"img/icon011.png",name:"Clínicas",link:"/app/services"},
    {id:"5",img:"img/04.png",img2:"img/icon044.png",name:"Farmácias",link:"/app/contact-us"},
    {id:"6",img:"img/icon02.png",img2:"img/icon022.png",name:"Fisioterapeutas",link:"/app/services"},
    {id:"7",img:"img/icon03.png",img2:"img/icon033.png",name:"Fonoaudiólogos",link:"/app/about-us"},
    {id:"8",img:"img/icon04.png",img2:"img/icon044.png",name:"Psicólogos",link:"/app/contact-us"},
    {id:"9",img:"img/icon04.png",img2:"img/icon011.png",name:"Pilates",link:"/app/contact-us"}
  ];

  $scope.activeItem = function (index) {
    // $scope.activeIcon = index;
  }

  $scope.mudarPagina = function (rota) {
    $state.go(rota);
  }

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

})

.controller('ListagemCoreCtrl', function ($scope,$state,$ionicHistory,vizoniAPI,vizoniLoading,statusHTTP,alertFactory) {

  var coreTipo = $state.params.coreTipo;
  var idElementoDaLista = $state.params.especialidadeTipo;
  vizoniLoading.showDefaultLoading();
  console.log("listagem core controller params: ",$state.params);
  var tratamentoDeErroSemConexao = function () {
    vizoniLoading.hide();
    alertFactory.showNoInternet();
  };

  var callBackSucessoAPI = function (apiResponse) {
    console.log("data.id:",apiResponse.data[0].id,"  data.id_tipo: ",apiResponse.data[0].id_tipo);
    vizoniLoading.hide();
    if (apiResponse.status === statusHTTP.OK) {
      $scope.listaCoreArray = apiResponse.data;
    } else {
      alertFactory.showServerUnavailable();
    }
  }

  if (parseInt(coreTipo) == 1 || parseInt(coreTipo) == 2) {
    /* API que pega a lista de especialidades baseada no tipo do core MÉDICO OU DENTISTA*/
    console.log("é do tipo medico/dentista");
    vizoniAPI.getMedicosDaquelaEspecialidade($state.params).then(function (apiResponse) {
      callBackSucessoAPI(apiResponse);
    }, function (error) {
      tratamentoDeErroSemConexao();
    });
  } else if (parseInt(coreTipo) == 3) {
    console.log("é do tipo exame/clinica");
    /* API que pega a lista das clínicas que faz tal exame*/
    vizoniAPI.getClinicasRealizamAqueleExame(idElementoDaLista).then(function (apiResponse) {
      callBackSucessoAPI(apiResponse);
    }, function (error) {
      tratamentoDeErroSemConexao();
    });
  } else if (parseInt(coreTipo) > 3) {
    console.log("é do tipo Farmácia, Fisio, Fono, Psico e Pilates");
    /* Farmácia, Fisio, Fono, Psico e Pilates tem o mesmo layout de tela */
    vizoniAPI.getCoreListagemComFoto(idElementoDaLista).then(function (apiResponse) {
      callBackSucessoAPI(apiResponse);
    }, function (error) {
      tratamentoDeErroSemConexao();
    });
  }

  // $scope.listaCoreArray =[
  //   {id:"1",id_especialidade:"1",foto:"img/1.png",nome:"DR: Aksel Hennie",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   {id:"2",id_especialidade:"2",foto:"img/2.png",nome:"DR: Sean Bean",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   {id:"3",id_especialidade:"3",foto:"img/3.png",nome:"DR: Kate Mara",bio:"Lorem ipsum dolor sit amet."},
  //   {id:"4",id_especialidade:"4",foto:"img/4.png",nome:"DR: Chiwetel Ejiofor",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   {id:"5",id_especialidade:"5",foto:"img/5.png",nome:"DR: Matt Damon",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  //   {id:"6",id_especialidade:"6",foto:"img/1.png",nome:"DR: Donald Glover",bio:"Lorem ipsum dolor sit amet."}
  // ];

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

  $scope.adicionarReticenciasBioDoCore = function (bioDoMedico) {
    if (bioDoMedico.length >= 60) {
      return bioDoMedico.substr(0,60)+"...";
    } else {
      return bioDoMedico;
    }
  }

})

.controller('ListagemCtrl', function ($scope,$state,vizoniAPI,vizoniLoading,$ionicHistory) {

  vizoniLoading.showDefaultLoading();

  // $scope.itemsListaArray = [
  //   {id:"1",img:"img/icon01.png",img2:"img/icon011.png",nome:"Especialidade01",link:"menuPrincipal"},
  //   {id:"2",img:"img/icon02.png",img2:"img/icon022.png",nome:"Especialidade02",link:"/app/services"},
  //   {id:"3",img:"img/icon03.png",img2:"img/icon033.png",nome:"Especialidade03",link:"/app/about-us"},
  //   {id:"4",img:"img/icon04.png",img2:"img/icon044.png",nome:"Especialidade04",link:"/app/contact-us"},
  //   {id:"5",img:"img/icon01.png",img2:"img/icon011.png",nome:"Especialidade05",link:"/app/services"},
  //   {id:"6",img:"img/icon02.png",img2:"img/icon022.png",nome:"Especialidade06",link:"/app/services"},
  //   {id:"7",img:"img/icon03.png",img2:"img/icon033.png",nome:"Especialidade07",link:"/app/about-us"},
  //   {id:"8",img:"img/icon04.png",img2:"img/icon044.png",nome:"Especialidade08",link:"/app/contact-us"}
  // ];

  $scope.coreTipo = $state.params.coreTipo;

  vizoniAPI.getEspecialidadesPorTipo($state.params).then(function (response) {
    vizoniLoading.hide();
    $scope.itemsListaArray = response.data;
  })

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

})

.controller('ListagemExameCtrl', function ($scope,$state,vizoniAPI,$ionicHistory) {

  $scope.coreTipo = $state.params.coreTipo;

  vizoniAPI.getListagemExames().then(function (apiResponse) {
    $scope.itemsListaArray = apiResponse.data;
  });

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

})

.controller('perfilCtrl', function ($scope,$state,$ionicHistory,vizoniMapMaker,vizoniAPI) {

  // $scope.core =  {id:"1",nome:"Raphael Vizoni do Prado",tipo:"1",nome_especialidade:"Cardiologista",foto:"img/1.png",
  //   bio:"Lorem ipsum dolor sit amet, consectetur adicing elit, sed do eiusmod tempor incididunt ut labore. et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   tel_comercial:"(44) 1234-5678",tel_particular:" (44) 9876-5432",endereco:"Avenida Brasil, 4000",
  //   planos_aceitos: ["Plano A", "Plano B", "Plano C"]};

  console.log("parametros do perfil: ",$state.params);
  if ($state.params.id_tipo <= 2) {
    vizoniAPI.getPerfilCoreComEspecialidade($state.params).then( function (apiResponse) {
      $scope.core = apiResponse.data;
    });
  } else {
    vizoniAPI.getPerfilCoreSemEspecialidade($state.params).then( function (apiResponse) {
      $scope.core = apiResponse.data;
    });
  }

  var mapOptions = {
    latCenter: -23.4208945,
    lngCenter: -51.9354924,
    zoom: 13,
    streetViewControl: false,
    mapTypeControl: false,
    scale: false,
    zoomControl: true,
    draggable: true,
    mapType: google.maps.MapTypeId.ROADMAP
  }

  var markerOptions = {
    latMarcador: -23.413461,
    lngMarcador: -51.9532500,
    animacao: google.maps.Animation.BOUNCE
  }

  vizoniMapMaker.createComplexMap(mapOptions);
  vizoniMapMaker.getMap();
  // vizoniMapMaker.criarMapaComplexo(mapOptions);
  vizoniMapMaker.createMarker(markerOptions);

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }


})
