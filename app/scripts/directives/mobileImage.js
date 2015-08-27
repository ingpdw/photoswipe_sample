"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<img ng-src="{{item.image.url}}" alt="{{item.keyword}}"/>',
    link: function( scope, element, attrs ) {
    }
  };
};
