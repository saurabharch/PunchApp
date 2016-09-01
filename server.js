var express = require('express');
var app = express();


app.use(express.static(__dirname));




var server = app.listen(process.env.PORT||1337, function() {
	console.log('training room is ready at 1337');
});
