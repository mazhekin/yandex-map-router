(function() {
    'use strict';

    angular
        .module('app.shared')
        .directive('mySortable', mySortable);

    function mySortable() {
        var directive = {
            link: link,
            restrict: 'A',
            scope:{
                mySortableUpdated: '&'
            }
        };
        return directive;

        ///////////////////////////////////////

        function link(scope, element) {
            var startIndex = -1;
            element.sortable({
                start: function(event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function(event, ui) {
                    var stopIndex = ui.item.index();
                    if (startIndex !== stopIndex) {
                        scope.mySortableUpdated({startIndex: startIndex, stopIndex: stopIndex});
                    }
                }
            });
            element.disableSelection();
        }
    }
})();

