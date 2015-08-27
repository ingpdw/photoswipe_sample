"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<img class="photo" data-product-key="{{item.key}}" fbphotobox-src="{{item.url}}" ng-src="{{item.url}}" width="200" height="200"/>',
    link: function( scope, element, attrs ) {
    }
  };
};
