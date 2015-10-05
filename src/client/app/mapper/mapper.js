(function() {
    'use strict';

    angular
        .module('app.mapper')
        .controller('Mapper', Mapper);

    function Mapper(YMAPS) {

        /*jshint validthis: true */
        var vm = this;
        vm.getMap = getMap;
        vm.addNewPoint = addNewPoint;
        vm.placemarks = [];
        vm.placemarksOrderChanged = placemarksOrderChanged;

        ///////////////////////////////////////////////////////////////

        function getMap(map) {
            vm.map = map;
            vm.polyline = new YMAPS.Polyline([]);
            vm.map.addOverlay(vm.polyline);
        }

        function addNewPoint() {

            if (vm.newPointName.length < 1) {
                return;
            }

            var initPoint = vm.map.getCenter();
            var placemark = new YMAPS.Placemark(initPoint, {draggable: true});
            placemark.name = vm.newPointName;
            vm.map.addOverlay(placemark);
            vm.newPointName = '';

            vm.placemarks.push(placemark);

            vm.polyline.addPoint(initPoint);

            YMAPS.Events.observe(placemark, placemark.Events.Drag, function () {
                var points = vm.placemarks.map(function(item) { return item.getGeoPoint(); });
                vm.polyline.setPoints(points);
            });
        }

        function placemarksOrderChanged(startIndex, stopIndex) {
            var indexes = [];
            for (var i = 0; i < vm.placemarks.length; i++) {
                indexes.push(i);
            }
            indexes.move(startIndex, stopIndex);

            var points = vm.placemarks.map(function(item) { return item.getGeoPoint(); });

            var newPlacemarks = [];
            var counter = 0;
            angular.forEach(indexes, function(item) {
                var placemark = vm.placemarks[item];
                placemark.setGeoPoint(points[counter]);
                newPlacemarks.push(placemark);
                counter++;
            });

            vm.placemarks = newPlacemarks;
        }
    }
})();
