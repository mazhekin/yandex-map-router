/* global YMaps:false */
(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('yandexService', yandexService);

    function yandexService() {

        function MapControl(map) {
            this.map = map;
        }

        MapControl.prototype.placeMark = function(lat, lng) {
            var placemark = new YMaps.Placemark(new YMaps.GeoPoint(lat, lng), {draggable: true});
            this.map.addOverlay(placemark);
        };

        MapControl.prototype.onClick = function(callback) {
            YMaps.Events.observe(this.map, this.map.Events.Click, function (map, mEvent) {
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

