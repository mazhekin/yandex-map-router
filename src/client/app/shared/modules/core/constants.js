/* global toastr:false */
/* global YMaps:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('YMaps', YMaps);
})();