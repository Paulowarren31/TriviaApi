var express  = require('express');
var cors = require('cors');
var mongoose = require('mongoose')
var app = express();
var database = mongoose.connection;

mongoose.connect('mongodb://paulo:Pinzon123@proximus.modulusmongo.net:27017/juHa7gog');
//setting up the database


var globalScore=1;

app.use(cors());


app.get('file:///home/paulo/Github/LeagueQuiz/index.html#login')

app.get('/api/globalscore',function(req,res){
  res.send({score:globalScore});
})
app.put('/api/globalscore/:num',function(req,res){

  globalScore=globalScore+parseInt(req.params.num);

  res.send({sent:parseInt(req.params.num)})
})
app.put('/api/globalscore/:username/:password',function(req,res){
	Account.create({
		username: req.params.username,
		password: req.params.password,
		rank: 0	
	},function(err, acc){
		Account.find(function(err, accounts){
			res.send(accounts);
		})
	})

});

var Account = mongoose.model('Account',{
	username: String,
	password: String,
	rank: Number
});


app.listen(8080);
console.log("App listening on port 8080");
