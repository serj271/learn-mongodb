const mongoose = require('mongoose');
mongoose.Promise = Promise;

const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);
mongoose.set('debug', true);

mongoose.plugin(schema => {
  if (!schema.options.toObject) {
    schema.options.toObject = {};
  }

  if (schema.options.toObject.transform == undefined) {
    schema.options.toObject.transform = (doc, ret) => {
      delete ret.__v;
      return ret;
    };
  }
});

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
		
	/* 	mongoose.connection.close(function () {
		  console.log('Mongoose connection disconnected');
		}); */
	});

module.exports = mongoose;
