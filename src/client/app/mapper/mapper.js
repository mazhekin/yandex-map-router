(function() {
    'use strict';

    angular
        .module('app.mapper')
        .controller('Mapper', Mapper);

    function Mapper($scope, yandexService) {

        /*jshint validthis: true */
        var vm = this;
        vm.initialPoint = {};
        vm.getMap = getMap;
        vm.addNewPoint = addNewPoint;

        function activate() {
        }

        activate();
        ///////////////////////////////////////////////////////////////

        function getMap(map) {
            vm.map = yandexService.getMapControl(map);

            vm.map.onClick(function(lng, lat) {
                vm.initialPoint.lng = lng;
                vm.initialPoint.lat = lat;
                $scope.$apply();
            });
        }

        function addNewPoint() {
            vm.map.placeMark(vm.initialPoint.lng, vm.initialPoint.lat);
        }
    }
})();
