let fs = require("fs");
let Q = require('q');

let createDirectoryObject = require("./createDirectoryObject");

module.exports = function( path, options, callbackParam ){
	let deferred = Q.defer();
	callbackParam = callbackParam || function(){};

	if( typeof options === "function" ){
		callbackParam = options;
	}

	// Make promises and callbacks both available
	let callback = function( err, data ){
		if( err ){
			deferred.reject( err );
		}else{
			deferred.resolve( data );
		}

		callbackParam( err, data );
	};

	if( typeof path !== "string" ){
		callback( new Error("Path parameter must be a string") );
		return deferred.promise;
	}


	createDirectoryObject( path, "", options )
	.then(function( obj ){
		callback( null, obj );
	})
	.catch(function( err ){
		callback( err );
	});

	return deferred.promise;
};