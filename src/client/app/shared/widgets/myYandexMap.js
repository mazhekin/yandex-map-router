(function() {
    'use strict';

    angular
        .module('app.shared')
        .directive('myYandexMap', myYandexMap);

    function myYandexMap() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        ///////////////////////////////////////

        function link(scope, element, attrs) {
            /* global YMaps:false */
            var map = new YMaps.Map(YMaps.jQuery(element)[0]);
            map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
        }
    }
})();
