(function() {
    'use strict';

    angular
        .module('app.shared')
        .directive('myYandexMap', myYandexMap);

    function myYandexMap(YMAPS) {
        var directive = {
            link: link,
            restrict: 'A',
            scope:{
                getMap: '&'
            }
        };
        return directive;

        ///////////////////////////////////////

        function link(scope, element, attrs) {
            var map = new YMAPS.Map(YMAPS.jQuery(element)[0]);
            map.addControl(new YMAPS.Zoom());
            map.enableScrollZoom({smooth: true});
            map.setCenter(new YMAPS.GeoPoint(37.64, 55.76), 10);
            scope.getMap({map: map});
        }
    }
})();
