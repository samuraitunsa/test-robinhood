let fs = require("fs");
let path = require('path');
let Q = require('q');
let stat = Q.denodeify( fs.stat.bind(fs) );
let readdir = Q.denodeify( fs.readdir.bind(fs) );

let sortType = require('./options/sortType');

let createDirectoryObject = function( rootDir, fileName, options ){
	let deferred = Q.defer();

	// Set option defaults
	options = typeof options === "object" ? options : {};
	options.sortType = typeof options.sortType !== "undefined" ? options.sortType : true;

	let currentDir = path.normalize( rootDir + '/' + fileName );

	let fileInfo = {
		parent: path.relative( rootDir, path.dirname( currentDir ) ),
		path: path.relative( "./" + rootDir, "./" + currentDir ),
		name: path.basename( currentDir )
	};

	stat( currentDir )
	.then( function( stats ){

		// Check if file or directory
		fileInfo.type = stats.isFile() ? "file" : "directory";

		if( fileInfo.type === "file" ){
			deferred.resolve( fileInfo );
			throw new Error("Not a directory");
		}else{
			fileInfo.children = [];
		}

		return currentDir;

	})
	.then( readdir )
	.then(function( files ){

		// Recursively examine directory's children
		let promises = [];
		files.forEach(function( newFileName ){
			promises.push( createDirectoryObject( rootDir, fileName+'/'+newFileName, options ) );
		});

		// Wait for all children to complete before resolving main promise
		Q.all( promises ).then(function(data){

			if( options.sortType ){
				data = sortType( data );
			}

			fileInfo.children = data;
			deferred.resolve( fileInfo );
		});

	})
	.catch(function( err ){
		// Main promise should always resolve
		deferred.resolve( fileInfo );
	});

	return deferred.promise;

};

module.exports = createDirectoryObject;