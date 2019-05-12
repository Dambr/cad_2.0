var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.get('/', function(req, res){
	res.send('Веведите имя модели через символ /');
	/*var getFiles = function(dir, files_){
		files_ = files_ || [];
		var files = fs.readdirSync(dir);
		for (var i in files){
			var name = dir + '/' + files[i];
			if (fs.statSunc(name).isDirectory()){
				getFiles(name, files_);
			}
			else{
				files_push(name);
			}
		}
		return files_;
	};
	console.log(getFiles());*/
});
app.get('*', function(req, res){
	//res.render('index.ejs');
	//console.log(req.url);
	if (req.url != '/favicon.ico'){
		try{
			myObj = fs.readFileSync(__dirname + "/public/models" + req.url + ".json", "utf-8");
			res.render('index.ejs', {text:myObj});
		}
		catch (err){
			res.status(404);
    		res.render('404.ejs');
		}
	}
	//res.writeHead(200, {'Content-Type': 'application/json'});
	//res.end((myObj));
});
app.listen(4000, '127.0.0.1');
console.log('Work!');