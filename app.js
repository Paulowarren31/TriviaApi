var express  = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var app = express()
var database = mongoose.connection


//connects to the mongoDB database set up with Modulus
mongoose.connect('mongodb://Paulowarren31:Pinzon123@proximus.modulusmongo.net:27017/owezuM3u')

var globalScore=0;

app.use(cors())

//GET request to return the global score
app.get('/api/globalscore',function(req,res){
  res.send({score:globalScore});
})
//PUT request to add to the global score. This is always 1 or -1.
app.put('/api/globalscore/:num',function(req,res){

  globalScore=globalScore+parseInt(req.params.num)

  res.send({sent:parseInt(req.params.num)})
})
//GET request that returns leaders.
app.get('/api/leaders',function(req,res){
	/*
	.find(),.sort(),.limit(), and .exec() are mongoose
	functions that allow us to search. Specifying a 
	blank object tells it to get us all of the Leaders
	that exist. It then sorts those to only return the top ten leaders.
	*/
	Leader.find({}).sort({score: -1}).limit(10).exec(function(err,leaders){
		res.send(leaders)
	})
})

//PUT request to create a new leader.
app.put('/api/leaders/:name/:score',function(req,res){
	/*
	This is also mongoose. It creates a new object and adds it to
	the database. The second parameter is a callback function that 
	executes a .find() function that sends all leaders back.
	This callback was mostly used for debugging.
	*/
	Leader.create({
		name: req.params.name,
		score: req.params.score
	},function(err, acc){
		Leader.find(function(err, leaders){
			res.send(leaders)
		})
	})

})
/*
This is a mongoose model. It sets up what
variables are required when creating a new
object. 
*/
var Leader = mongoose.model('Leader',{
	name: String,
	score: Number
})

//starts the app on port
app.listen(8081)
console.log("App listening on port 8081")
