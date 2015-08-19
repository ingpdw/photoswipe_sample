"use strict";

module.exports = function( $http, $q, $util_ ) {
  var factory = {};

  factory.staticUrl = 'http://localhost:5000';
  factory.templateUrl = 'http://localhost:5000/views/';
  factory.dataUrl = 'http://localhost:5000/data';

  function loadData( vid ){
    var deferred = $q.defer();
    var serializedData = $util_.serializeData( {'vid': vid} );

    $http({
      method: 'get',
      url: factory.dataUrl,
      data: serializedData
    }).
    success(function(data, status, headers, config) {
      deferred.resolve( data )
    }).
    error(function(data, status, headers, config) {
      deferred.reject( data );
    });

    return deferred.promise;
  };

  factory.loadData = loadData;
  return factory;
};
