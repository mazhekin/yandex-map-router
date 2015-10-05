/* jshint -W117, -W030 */
describe('mapper', function () {
    describe('route', function () {

        beforeEach(function() {
            module('app', specHelper.fakeLogger);
            specHelper.injector(function($httpBackend, $location, $rootScope, $route) {});
            $httpBackend.expectGET('app/mapper/mapper.html').respond(200);
        });

        it('should map / route to campaigns View template', function () {
            expect($route.routes['/'].templateUrl).
                toEqual('app/mapper/mapper.html');
        });

    });
});

