'use strict'

const mongoose = require('mongoose');
mongoose.set('debug', true);


		
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
	  // we're connected!
		console.log('open', mongoose.connection.readyState);
		mongoose.connection.close(function () {
		  console.log('Mongoose connection disconnected');
		});
	});



