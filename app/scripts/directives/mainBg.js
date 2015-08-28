"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<img ng-src="{{stylebook[0].image.url}}"/>',
    replace: true,
    link: function( scope, element, attrs ) {
    }
  };
};
