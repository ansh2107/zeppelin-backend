var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,format = require('util').format;



             /**
              * Router to get user request for the requested api.
              **/
      router.post('/process_info', function(req, res, next) {

			 /**
              * Requesting body parametrs from form data.
              **/
			  var line_no = req.body.line_no;
			  var temperature = req.body.temperature;
			  var pressure = req.body.pressure;
			  var humidity = req.body.humidity;
			  var time = req.body.time;
			  var material = []
			  material =  req.body.material;
			  var grade_output = req.body.grade_output;
			  var weight = req.body.weight;

			 /**
              * Defining the server url for mongodb connection.
              **/
			  var url = "mongodb://localhost:27017/";


			
            console.log("material" + " " + material);

            /**
             *  Connection to server using mongodb client service. 
            **/
			MongoClient.connect(url, function(err, db) {
			 
			 /**
               *  Checking connection.
              **/
			  if (err) throw err;
			  else
			  	console.log("connected");

			 /**
              * Specyfing database name.
              **/
			  var dbo = db.db("zeppelin");
			 
			 /**
              * Creating the query object.
              **/
			  var query = 
			  {
			  	$and : 
			      	[
			      		{"line_no" : line_no},
			      		{"temperature" : temperature},
			      		{"pressure" : pressure},
			      		{"humidity" : humidity},
			      		{"time" : time},
			 			{"material" : {$size : material.length}},
			 			{"material" : {$all : material}}
			      	]

				};

			 /**
              * Selecting the collection name and running the query and 
              * getting callback as an object of array
              **/
			  dbo.collection('process').find(query).toArray(function(err, result) {
			    if (err) {
			            
			            // If it failed, return error
			            res.send("There was a problem adding the information to the database.");
			        }
			        else {
			            
			            // And forward to success page
			            res.json({success: result});
			        }
			    db.close();
			  });
			});

			 
			});
					
module.exports = router;
