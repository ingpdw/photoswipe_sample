"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<img class="photo" data-product-key="{{item.key}}" data-section-key="{{section.sectionsKey}}" fbphotobox-src="{{item.url}}" ng-src="{{item.url}}" alt="{{section.keyword}}" />',
    link: function( scope, element, attrs ) {
    }
  };
};
