var express  = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var app = express()
var database = mongoose.connection

mongoose.connect('mongodb://paulo:Pinzon123@proximus.modulusmongo.net:27017/juHa7gog')


var globalScore=1;

app.use(cors())


app.get('/api/globalscore',function(req,res){
  res.send({score:globalScore});
})
app.put('/api/globalscore/:num',function(req,res){

  globalScore=globalScore+parseInt(req.params.num)

  res.send({sent:parseInt(req.params.num)})
})

app.get('/api/leaders',function(req,res){
	Leader.find({}).sort({score: -1}).limit(10).exec(function(err,leaders){
		res.send(leaders)
	})
})


app.put('/api/leaders/:name/:score',function(req,res){
	Leader.create({
		name: req.params.name,
		score: req.params.score
	},function(err, acc){
		Leader.find(function(err, leaders){
			res.send(leaders)
		})
	})

})

var Leader = mongoose.model('Leader',{
	name: String,
	score: Number
})


app.listen(8081)
console.log("App listening on port 8081")
