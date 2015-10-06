/* jshint -W117, -W030 */
describe('advert.campaigns', function() {
    var controller;

    beforeEach(function() {
        module('app');
        specHelper.injector(
            function($controller, YMAPS, $rootScope) {}
        );
    });

    var scope;

    beforeEach(function() {

        scope = $rootScope.$new();

        controller = $controller('Mapper as vm', {$scope: scope});
        $rootScope.$apply();
    });

    describe('Mapper controller', function() {

        it('should be created successfully', function () {
            expect(controller).toBeDefined();
        });

        it('should create and add polyline when map constructed', function () {

            // arrange
            var map = {addOverlay: function () { }};
            sinon.stub(YMAPS, 'Polyline', function () {});
            spyOn(map, 'addOverlay');
            sinon.stub(YMAPS, 'Placemark', function () {});

            // act
            controller.getMap(map);

            // assert
            expect(controller.map).toEqual(map);
            expect(controller.polyline).toBeDefined();
            expect(map.addOverlay).toHaveBeenCalledWith(controller.polyline);
        });

        it('should exit from method when point name is not defined', function () {

            // arrange
            controller.newPointName = '';
            controller.map = {getCenter: function () { }};
            spyOn(controller.map, 'getCenter');

            // act
            controller.addNewPoint();

            // assert
            expect(controller.map.getCenter).not.toHaveBeenCalledWith();
        });

        it('should add new point when name is defined', function () {

            // arrange
            YMAPS.Placemark = function() {
                this.Events = {Drag: 1};
            };

            var initPoint = {};
            controller.newPointName = 'new name';
            controller.map = {getCenter: function () { return initPoint; }, addOverlay: function () { }};
            controller.polyline = {addPoint: function() {}};
            spyOn(controller.polyline, 'addPoint');
            spyOn(YMAPS.Events, 'observe');
            spyOn(controller.map, 'addOverlay');

            // act
            controller.addNewPoint();

            // assert
            expect(controller.map.addOverlay).toHaveBeenCalled();
            expect(controller.polyline.addPoint).toHaveBeenCalledWith(initPoint);
            expect(YMAPS.Events.observe).toHaveBeenCalled();
        });

        it('should change order according start and stop index', function () {

            function Placemark(point, name) {
                this.point = point;
                this.name = name;
            }

            Placemark.prototype.getGeoPoint = function() {
                return this.point;
            };

            Placemark.prototype.setGeoPoint = function(point) {
                this.point = point;
            };

            // arrange
            controller.placemarks = [
                new Placemark({lat: 1, lng: 1}, 'name1'),
                new Placemark({lat: 2, lng: 2}, 'name2')
            ];

            // act (move 1 -> 0)
            controller.pointsOrderChanged(1, 0);

            // assert
            expect(controller.placemarks[0].name).toEqual('name2');
            expect(controller.placemarks[0].point).toEqual({lat: 1, lng: 1});

            expect(controller.placemarks[1].name).toEqual('name1');
            expect(controller.placemarks[1].point).toEqual({lat: 2, lng: 2});
        });

        it('should delete point according specified placemark', function () {

            // arrange
            function Placemark(point, name) {
                this.point = point;
                this.name = name;
            }

            Placemark.prototype.getGeoPoint = function() {
                return this.point;
            };

            controller.map = {removeOverlay: function () { }};
            spyOn(controller.map, 'removeOverlay');

            controller.placemarks = [
                new Placemark({lat: 1, lng: 1}, 'name1'),
                new Placemark({lat: 2, lng: 2}, 'name2')
            ];

            controller.polyline = {setPoints: function() {}};
            spyOn(controller.polyline, 'setPoints');

            // act
            controller.deletePoint(controller.placemarks[0]);

            // assert
            expect(controller.map.removeOverlay).toHaveBeenCalled();
            expect(controller.placemarks.length).toEqual(1);
            expect(controller.placemarks[0]).toEqual(new Placemark({lat: 2, lng: 2}, 'name2'));
            expect(controller.polyline.setPoints).toHaveBeenCalledWith([{lat: 2, lng: 2}]);
        });
    });
});

