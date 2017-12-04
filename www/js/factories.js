angular.module('app.factories', [])
.factory('vizoniMapMaker', function () {

    var map = '';
    var markersArray = [];

    var _createComplexMap = function (mapOptions) {
      latCenter = parseFloat(mapOptions.latCenter);
      lngCenter = parseFloat(mapOptions.lngCenter);
      zoom      = parseFloat(mapOptions.zoom);
      var googleMapsOptionsObject = {
        center: {lat: latCenter, lng: lngCenter},
        zoom: zoom,
        streetViewControl: mapOptions.streetView,
        mapTypeControl: mapOptions.mapTypeControl,
        scaleControl: mapOptions.scale,
        zoomControl: mapOptions.zoomControl,
        draggable: mapOptions.draggable,
        mapTypeId: mapOptions.mapType
      };
      map = new google.maps.Map(document.getElementById("vizoniMap"), googleMapsOptionsObject);
    };

    var _createDefaultMap = function (mapOptions) {
      latCenter = parseFloat(mapOptions.latCenter);
      lngCenter = parseFloat(mapOptions.lngCenter);
      zoom      = parseFloat(mapOptions.zoom);
      var mapOptions = {
        center: {lat: latCenter, lng: lngCenter},
        zoom: zoom
      };
      map = new google.maps.Map(document.getElementById("vizoniMap"), mapOptions);
    }

    var _createMarker = function (markerOptions) {
      latMarcador = parseFloat(markerOptions.latMarcador);
      lngMarcador = parseFloat(markerOptions.lngMarcador);
      var marcador = new google.maps.Marker({
        position: {lat: latMarcador, lng: lngMarcador},
        map: map,
        animation: markerOptions.animacao,
      });
      markersArray.push(marcador);
    }

    var _getMap = function () {
      return map;
    }

    var _getMarkersArray = function () {
      return markersArray;
    }

    var _removeAllMarkers = function () {
      for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
      }
      markersArray = [];
    }

    var _removeMarker = function (index) {
      for (var i = 0; i < markersArray.length; i++) {
        /* if current array index == index param passed, set map null*/
        if (i == index) {
          markersArray[i].setMap(null);
          /* HAS TO REMOVE FROM markersArray, NOT DOING IT YET*/
        }
      }
    }

    return {
      createComplexMap: _createComplexMap,
      createDefaultMap: _createDefaultMap,
      createMarker: _createMarker,
      getMarkersArray: _getMarkersArray,
      getMap: _getMap,
      removeAllMarkers: _removeAllMarkers,
      removeMarker: _removeMarker,
    }

})

.factory('vizoniAPI', function ($http,config) {

  var _getEspecialidadesPorTipo = function (coreIdTipo) {
    /* NA HORA DE PUXAR A LISTAGEM DAS ESPECIALIDADES VAI PASSAR O TIPO DO CORE (0 MÉDICO, 1 DENTISTA, 2 FARMÁCIA ETC)
      Exemplo de SQL pra trazer as especialidades referente aquele tipo:

      SELECT  esp.id, esp.nome as nome_especialidade
      FROM    core, especialidade esp, core_has_especialidade che
      WHERE   che.id_core = core.id
      AND     che.id_especialidade = esp.id
      AND     esp.tipo = core.id_tipo
      AND     core.id_tipo = 1 <-- 1 É O PARAMETROOOO PRA TRAZER AS ESPECIALIDADES DOS DENTISTAS
    */
    // coreIdTipo = {id:1};
    // return $http.get('https://jsonplaceholder.typicode.com/users/'+coreIdTipo.id);
    return $http.get('http://www.json-generator.com/api/json/get/ckiTEgqiUO?indent=2');
  };

  var _getMedicosDaquelaEspecialidade = function (params) {
    /* Exemplo SQL trazer todos os médicos (id,nome,foto e bio) daquela especialidade
    SELECT core.id, core.nome, core.foto, core.bio, core.id_tipo
    FROM 	 core, core_has_especialidade che, especialidade esp
    WHERE  core.id = che.id_core
    AND 	 esp.tipo = core.id_tipo
    AND 	 esp.id = che.id_especialidade
    AND 	 core.id_tipo = ???;
    */

    // params = {coreTipo:'1',especialidadeTipo: '1'};
    // return $http.get('https://jsonplaceholder.typicode.com/users/'+params.coreTipo+"/"+params.especialidadeTipo);
    // return $http.get('http://www.json-generator.com/api/json/get/cpWIXPOpmG?indent=2');
    return $http.get('http://www.json-generator.com/api/json/get/cehXGLDanC?indent=2');
  };

  var _getPerfilCoreComEspecialidade = function (param) {
    /* Exemplo de SQL pra trazer o perfil do médico/dentista:

    SELECT core.*, esp.nome as nome_especialidade, pc.nome as planos_aceitos
    FROM core,
         especialidade esp,
         core_has_especialidade che,
         plano_convenio pc,
         core_has_plano chp
    WHERE che.id_core = core.id
    AND 	che.id_especialidade = esp.id
    AND 	chp.id_core = core.id
    AND 	chp.id_plano = pc.id
    AND 	core.id = ?????;

    */
    // param = {id: '1'};
    // return $http.get('https://jsonplaceholder.typicode.com/users/'+param.id);
    return $http.get('http://www.json-generator.com/api/json/get/bTKDiLOFhK?indent=2');
  }

  var _getPerfilCoreSemEspecialidade = function (param) {
    /* Exemplo de SQL pra trazer o perfil do core (sem ser médico/dentista):

    SELECT 	core.*, pc.nome as planos_aceitos
    FROM 		core,
			      plano_convenio pc,
			      core_has_plano chp
    WHERE		chp.id_core = core.id
    AND 		chp.id_plano = pc.id
    AND 		core.id = ?????;

    */
    // param = {id: '1'};
    // return $http.get('https://jsonplaceholder.typicode.com/users/'+param.id);
    // return $http.get('http://www.json-generator.com/api/json/get/bTKDiLOFhK?indent=2');
    return $http.get('http://www.json-generator.com/api/json/get/clkZKoNvKG?indent=2');
  }

  var _getListagemExames = function () {
    /*SQL exemplo pegar só exames ativos:
      SELECT id,nome
      FROM exame
      WHERE status = 1
      ORDER BY nome ASC*/
    return $http.get('http://www.json-generator.com/api/json/get/bTMuPbGkUi?indent=2');
  }

  var _getClinicasRealizamAqueleExame = function (exameId) {
    /* SQL q traz as clínicas q fazem o exame do ID tal:
    SELECT core.id,core.nome,core.bio,core.foto, core.id_tipo
    FROM   core, exame ex, core_has_exame che
    WHERE  core.id = che.id_core
    AND 	 che.id_exame = ex.id
    AND    ex.status = 1
    AND	   ex.id = ????; //param
    */
    // return $http.get('http://www.json-generator.com/api/json/get/cpWIXPOpmG?indent=2');
    // return $http.get('http://www.json-generator.com/api/json/get/bXBvQESaoO?indent=2');
    return $http.get('http://www.json-generator.com/api/json/get/ckWHsBcPhe?indent=2');
  }

  var _getCoreListagemComFoto = function (idCore) {
    /* SQL pra trazer a id,nome,bio e foto do CORE via ID
    SELECT core.id, core.nome, core.bio, core.foto, core.id_tipo
    FROM 	 core, core_tipo ct
    WHERE  ct.id = core.id_tipo
    AND 	 ct.id = ????;*/
    // return $http.get('http://www.json-generator.com/api/json/get/cpWIXPOpmG?indent=2');
    return $http.get('http://www.json-generator.com/api/json/get/coRRmLtvUy?indent=2');
  }

  return {
    getEspecialidadesPorTipo: _getEspecialidadesPorTipo,
    getMedicosDaquelaEspecialidade: _getMedicosDaquelaEspecialidade,
    getPerfilCoreComEspecialidade: _getPerfilCoreComEspecialidade,
    getPerfilCoreSemEspecialidade: _getPerfilCoreSemEspecialidade,
    getListagemExames: _getListagemExames,
    getClinicasRealizamAqueleExame: _getClinicasRealizamAqueleExame,
    getCoreListagemComFoto: _getCoreListagemComFoto,
  }

})

.factory('vizoniLoading', function ($ionicLoading) {

  var _show = function (myHTML) {
    $ionicLoading.show({
       template: myHTML,
     });
  }

  var _hide = function () {
    $ionicLoading.hide();
  }

  var _showUpdatingPositionLoading = function () {
    var myHTML = '<ion-spinner class="spinner-assertive" icon="ripple"></ion-spinner>'+'\n'
                +'<h4>Atualizando posições</h4>';
    _show(myHTML);
  }

  var _showNoTextLoading = function () {
    var myHTML = '<ion-spinner class="spinner-positive" icon="dots"></ion-spinner>';
    _show(myHTML);
  }

  var _showDefaultLoading = function () {
    var myHTML = '<ion-spinner class="spinner-assertive" icon="spiral"></ion-spinner>'+'\n'
                +'<h4>Carregando...</h4>';
    _show(myHTML);
  }

  var _showDefaultLoadingWithTimer = function () {
    var myHTML = '<ion-spinner class="spinner-assertive" icon="spiral"></ion-spinner>'+'\n'
                +'<h4>Carregando...</h4>';
    //_show(myHTML);
    $ionicLoading.show({
       template: myHTML,
       duration: 5000,
     });
  }


  return {
    hide: _hide,
    showUpdatingPositionLoading: _showUpdatingPositionLoading,
    showDefaultLoading: _showDefaultLoading,
    showNoTextLoading: _showNoTextLoading,
    showDefaultLoadingWithTimer: _showDefaultLoadingWithTimer
  }

})

.factory('alertFactory', function ($ionicPopup) {

  var _showNoInternet = function () {
    var alert = $ionicPopup.alert({
          title: "Falha na conexão!",
          template: "Você precisa estar conectado à internet!",
          okText: " Entendi!",
          okType: 'ion-wifi button-balanced'
    });
    alert.then( function (res) {
      ionic.Platform.exitApp();
    })
  }

  var _teste = function () {
    console.log("alertaaaaaaaaaa");
    $ionicPopup.alert({
          title: "Falha na conexão!",
          template: "KKKKKKKKKKKKKKKKKKKKKKK!",
          okText: " Entendi!",
          okType: 'ion-wifi button-balanced'
    });
  }

  var _showServerUnavailable = function () {
    var alert = $ionicPopup.alert({
          title: "Falha na conexão!",
          template: "Servidor indisponível! Tente mais tarde!",
          okText: " Entendi!",
          okType: 'ion-wifi button-balanced'
    });
    alert.then( function (res) {
      ionic.Platform.exitApp();
    })
  }

  return {
    showNoInternet: _showNoInternet,
    teste: _teste,
    showServerUnavailable: _showServerUnavailable,
  }

})
