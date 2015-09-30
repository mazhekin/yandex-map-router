(function() {
    'use strict';

    angular
        .module('app.shared')
        .directive('myEnter', myEnter);

    function myEnter() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        ///////////////////////////////////////

        function link(scope, element, attrs) {
            element.bind('keypress', function (event) {
                var enterKey = 13;
                if (event.which === enterKey) {
                    scope.$eval(attrs.myEnter);
                    event.preventDefault();
                    scope.$apply();
                }
            });
        }
    }
})();
