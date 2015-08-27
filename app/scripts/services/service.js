"use strict";

module.exports = function( $http, $q, $util_ ) {
  var factory = {};

  factory.staticUrl = 'http://localhost:5000';

  //PC API
  factory.dataUrl = 'http://localhost:5000/data';

  //mobile list API
  factory.mobileUrl = 'http://localhost:5000/mlist';

  //mobile view API
  factory.mobileViewUrl = 'http://localhost:5000/mdetail';

  //mobile
  function loadList( page ){
    var deferred = $q.defer();

    var serializedData = $util_.serializeData( {'page': page, 'limit': 10} );

    $http({
      method: 'get',
      url: factory.mobileUrl,
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

  //mobile
  function loadView( idx ){
    var deferred = $q.defer();

    var serializedData = $util_.serializeData( {'idx': idx} );

    $http({
      method: 'get',
      url: factory.mobileViewUrl,
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

  //pc
  function loadData( page ){
    var deferred = $q.defer();

    var serializedData = $util_.serializeData( {'page': page, 'limit': 5} );

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

  factory.loadData = loadData; //pc
  factory.loadView = loadView; //mobile
  factory.loadList = loadList; //mobile

  return factory;
};
