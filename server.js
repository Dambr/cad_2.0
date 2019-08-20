const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended : false});
const server = {host : '127.0.0.1', port : 4000};

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function(req, res){
	res.status(200);
	res.render('main.ejs', {options : fs.readdirSync(__dirname + '/public/models/')});
});
app.get('*', function(req, res){
	if (req.url != '/favicon.ico'){
		try{
			let text = fs.readFileSync(__dirname + '/public/models' + req.url + '.json', 'utf-8');
			let myMaterials = fs.readFileSync(__dirname + '/public/materials/materials.json', 'utf-8');
			res.status(200);
			res.render('index.ejs', {text : text, myMaterials : myMaterials, server : server});
		}
		catch (err){
			res.status(404);
			res.render('404.ejs');
		}
	}
});
app.post('/', urlencodedParser, function(req, res){
	let myMaterials = fs.readFileSync(__dirname + '/public/materials/materials.json', 'utf-8');
	res.status(200);
	res.render('index.ejs', {text : req.body.model, myMaterials : myMaterials, server : server});
});
app.listen(server.port, server.host);
console.log(server);