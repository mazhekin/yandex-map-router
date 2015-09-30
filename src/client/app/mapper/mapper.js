(function() {
    'use strict';

    angular
        .module('app.mapper')
        .controller('Mapper', Mapper);

    function Mapper() {

        /*jshint validthis: true */
        var vm = this;
        vm.addNewPoint = addNewPoint;

        function activate() {
        }

        activate();
        ///////////////////////////////////////////////////////////////

        function addNewPoint() {
            window.alert('ghjhgh');
        }
    }
})();
