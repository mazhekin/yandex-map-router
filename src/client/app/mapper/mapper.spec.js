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
        /*
        sinon.stub(campaignsService, 'getCampaigns', function () {
            return $q.when(campaigns);
        });

        sinon.stub(providersService, 'getProvider', function () {
            return $q.when({id: 'foo'});
        });*/

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

        /*it('should load campaigns after event when store/provider changed', function () {
         // act
         scope.$broadcast('from.header.provider.changed', {providerId: 'foo'});
         scope.$apply();
         expect(controller.campaigns.length).toEqual(campaigns.length);
         });*/

        /*it('should catch event when editing campaign closed', function () {

         // act
         scope.$broadcast('campaigns.close.editCampaign');
         scope.$apply();

         // assert
         expect(controller.editCampaignOpened).toBeFalsy();
         });*/

        /* it('should call changeCampaignStatus when status change', function () {
            // arrange
            var campaign = {id: 'foo'};
            sinon.stub(campaignsService, 'changeCampaignStatus', function () {
                return $q.when(campaign);
            });
            spyOn(scope, '$broadcast');

            // act
            controller.onStatusChange(campaign);
            scope.$apply();

            // assert
            //expect(scope.$broadcast).toHaveBeenCalledWith('campaign.refresh', campaign);
        });*/

        /*it('should delete campaign correctly', function () {
         // arrange
         var lCampaigns = angular.copy(campaigns);
         var campaign = lCampaigns[0];
         sinon.stub(campaignsService, 'deleteCampaign', function () {
         var deferred = $q.defer();
         controller.campaigns.filter(function(item) { return item.id === campaign.id; });
         deferred.resolve();
         return deferred.promise;
         });

         // act
         controller.onCampaignDelete(campaign);
         scope.$apply();

         // assert
         var foundCampaigns = controller.campaigns.filter(function(item) { return item.id === campaign.id; });
         expect(foundCampaigns.length).toBe(0);
         });*/

        /*it('should set new campaign for editing', function () {

         // arrange
         var newCampaign = {}; // campaignsMocks.getNewCampaign();

         sinon.stub(campaignsService, 'getNewCampaign', function () {
         var deferred = $q.defer();
         deferred.resolve(newCampaign);
         return deferred.promise;
         });

         // act
         controller.onCampaignEdit();
         scope.$apply();

         // assert
         expect(controller.campaigns[0]).toBe(newCampaign);
         });*/
        /*
        it('should call changeCampaignsOrder when campaign list order changed', function () {
            // arrange
            spyOn(campaignsService, 'changeCampaignsOrder');

            var beforeIndex = 1;
            var afterIndex = 2;
            var ids = [1, 2, 3];

            // act
            controller.onCampaignListChanged(ids, beforeIndex, afterIndex);

            // assert
            expect(campaignsService.changeCampaignsOrder)
                .toHaveBeenCalledWith('contentProgress', ids, beforeIndex, afterIndex);

        });*/
    });

});

