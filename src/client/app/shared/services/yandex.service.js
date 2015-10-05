(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('yandexService', yandexService);

    function yandexService(YMAPS) {

        function MapControl(map) {
            this.map = map;
            this.placemarks = [];
            this.polyline = new YMAPS.Polyline([]);
            this.map.addOverlay(this.polyline);
        }

        MapControl.prototype.placeMark = function(lat, lng, name) {

            var placemark = new YMAPS.Placemark(new YMAPS.GeoPoint(lat, lng), {draggable: true});
            placemark.name = name;
            this.map.addOverlay(placemark);
            this.placemarks.push(placemark);

            var mapControl = this;
            YMAPS.Events.observe(placemark, placemark.Events.Drag, function (placemark) {
                var points = [];
                angular.forEach(mapControl.placemarks, function (item) {
                    points.push(item.getGeoPoint());
                });
                mapControl.polyline.setPoints(points);
            });

            this.polyline.addPoint(new YMAPS.GeoPoint(lat, lng));
        };

        MapControl.prototype.onClick = function(callback) {
            YMAPS.Events.observe(this.map, this.map.Events.Click, function (map, mEvent) {
                var geoPoint = mEvent.getGeoPoint();
                callback(geoPoint.__lng, geoPoint.__lat);
            });
        };
        //////////////////////////////////////////////////////////

        var service = {
            getMapControl: getMapControl
        };

        return service;

        ////////////////////////////////////////////////////////////////////////

        function getMapControl(map) {
            return new MapControl(map);
        }
    }

})();

