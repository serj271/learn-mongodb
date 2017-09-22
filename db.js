'use strict'
/* 		
	const db = mongoose.connect('mongodb://localhost:27017/test',{		
			useMongoClient: true,
	});			
	db.on('error',function(err){
		if(err) {
			console.log(err.message);
			return;
		} 			
	});//console.error.bind(console, 'connection error:'

	db.once('open', function() {
//	  we're connected!
		console.log('open', mongoose.connection.readyState);
		mongoose.connection.close(function () {
		  console.log('Mongoose connection disconnected');
		});
	}); */

const mongoose = require('mongoose');
const co = require('co');

//var thunkify = require('thunkify');

function* serve(){
    var db = yield getDb();
    yield clearDatabase();
//	yield dropDatabase();
    yield disconnect();
}

function *getDb() {
  let db;
  if (mongoose.connection.readyState == 1) { // connected
    db = mongoose.connection.db;
  } else {
//    db = yield thunkify(mongoose.connection.on)('open');
//	console.log('open');
//	yield mongoose.disconnect();		
	db = mongoose.connect('mongodb://localhost:27017/test',{		
			useMongoClient: true,
	});			
	db.on('error',function(err){
		if(err) {
			console.log(err.message);
			return;
		}			
	});//console.error.bind(console, 'connection error:'

	db.once('open', function() {
//	  we're connected!
		console.log('open', mongoose.connection.readyState);
	/* 	mongoose.connection.close(function () {
		  console.log('Mongoose connection disconnected');
		}); */
	});
//	yield clearDatabase(db);
  }
  return db;
//    yield function(callback){
//	mongoose.disconnect();
//	callback();
//    };
//  yield* clearDatabase(db);
};

function *disconnect(){
    yield function(callback){
		mongoose.connection.close(function(){
			console.log('Mongoose connection disconnected');
			
		});
		callback();
	}
}

function *dropDatabase(callback) {
	const db =  mongoose.connection.db;
	db.dropDatabase(callback);
}


function *clearDatabase() {
	const db = mongoose.connection.db;
	console.log(db.listCollections());
  /* var collections = yield new Promise(function(resolve, reject) {
    db.listCollections().toArray(function(err, items) {
      if (err) return reject(err);
      resolve(items);
    });
  });

  var collectionNames = collections
    .map(function(collection) {
      if (collection.name.indexOf('system.') === 0) {
        return null;
      }
      return collection.name;
    })
    .filter(Boolean);
    console.log(collectionNames); */
 // todo: drop all collections from collectionNames
  //db.dropCollection(name, function(err) { ... })
}


co(serve)
.then(function(){
	
})
.catch(function(err){
    console.log(err);
})


 
 
/* 
	mongoose.connection.close(function () {
		console.log('Mongoose connection disconnected');
	});
 */




