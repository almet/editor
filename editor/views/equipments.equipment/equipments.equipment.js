angular.module('editor.views.equipments.equipment', ['ui.router',
  'editor.data.equipments', 'editor.views.equipments'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('equipments.equipment', {
      url: '/:id',
      templateUrl: 'editor/views/equipments.equipment/equipment.html',
      controller: 'EquipmentsEquipmentController'
    });
  }])
  .controller('EquipmentsEquipmentController', function($scope, $state,
    $stateParams, equipments) {

    var equipmentId = $stateParams.id;
    $scope.equipmentId = $stateParams.id;

    equipments.get(equipmentId).then(function(equipment) {
      $scope.equipment = equipment;
      
      // Go to last equipment if current equipment disappear
      $scope.equipments = equipments;
      $scope.$watch('(equipments.items | filter:{id:equipment.id}).length',
        function(len) {
          if( len > 0 ) { return; }
          $state.go('equipments.last');
        }
      );

    });

  });
