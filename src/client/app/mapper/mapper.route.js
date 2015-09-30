(function() {
    'use strict';

    angular
        .module('app.mapper')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/mapper/mapper.html',
                    controller: 'Mapper',
                    controllerAs: 'vm',
                    title: 'Маршруты'
                }
            }
        ];
    }
})();
