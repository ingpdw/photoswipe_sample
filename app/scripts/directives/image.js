"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<img class="photo" fbphotobox-src="{{item.src}}" ng-src="{{item.src}}" width="200" height="200"/>',
    link: function( scope, element, attrs ) {
    }
  };
};
