/*****
* A server listens on a port
* A server won't handle any requests unless you tell it to
*****/
var express = require('express');
var server = express(); // create new instance of request handler (aka server)
// server.listen(1234);

// /*****
// * Express exposes the request and response objects through a callback
// * If you don't send a response, the client hangs
// *****/
// server.get('/example', function requestHandler (request, response) {
// 	console.log('request keys:', Object.keys(request));
// 	console.log('response keys:', Object.keys(response));
// 	response.send('ALIVE!!!!');
// });

// /*****
// * The client decides what to do with the response
// *****/
// server.get('/example', function (request, response) {
// 	response.send('Something of great importance');
// });
// server.get('/example', function (request, response) {
// 	response.send('<div style="background-color:red;">I AM, THEREFORE I THINK</div>');
// });

// /*****
// * Request handlers are specific to a verb and a route
// * You can match all verbs with `server.all`
// *****/
// server.get('/example', function (request, response) {
// 	response.send('this was a get request');
// });
// server.post('/example', function (request, response) {
// 	response.send('this was a post request');
// });
// server.all('/example', function (request, response) {
// 	response.send('i handle any request');
// });

// // random tangent
// server.get('/example', function (request, response) {
// 	response.send('<form action="/example" method="POST"><h2>HEY</h2><input type="text" name="foo"/><input type="submit"/></form>');
// });
// var bodyParser = require('body-parser');
// server.use(bodyParser.urlencoded({extended: true})); // <= attaches request.body
// server.use(bodyParser.json()); // <= attaches request.body
// server.post('/example', function (request, response) {
// 	console.log('body', request.body);
// 	response.send('this was a post request');
// });

// /*****
// * Routes are not filepaths
// *****/
// // a simple CR app
// var dumbledores = [],
// 	id = 0;
// server.get('/data', function (request, response) {
// 	response.send(dumbledores);
// });
// server.post('/data', function (request, response) {
// 	dumbledores.push({
// 		name: 'Dumbledore',
// 		id: id++
// 	});
// 	response.send(dumbledores[dumbledores.length-1]);
// });

// /*****
// * You can chain handlers with `next()`
// * Every handler should always either `next()` or send a response
// *****/
// server.get('/athing', function (request, response, next) {
// 	console.log('firstly');
// 	next();
// });
// server.get('/athing', function (request, response) {
// 	response.send('finally');
// });
// server.get('/anotherthing', function (request, response) {
// 	// this happens independently
// 	response.send('look ma no hands!');
// });

// /*****
// * Order matters: handlers fire in the order in which they are registered
// *****/
// server.get('/something', function (request, response) {
// 	response.send('that one');
// });
// server.get('/something', function (request, response) {
// 	response.send('this one');
// });

// /*****
// * You can snowball data by attaching it to `request` or `response`
// *****/
// server.get('/santaclaus', function (request, response, next) {
// 	request.someProperty = 'magic';
// 	next();
// });
// server.get('/elf', function (nimit, response) {
// 	response.send('how is this possible ? answer: ' + nimit.someProperty);
// });

// /*****
// * Request data can be in the route and is accessible via `request.params`
// * Request data can be in the query string and is accessible via `request.query`
// * Request data can be in the payload and is accessible via `request.body`
// *****/
// server.get('/times2/:number', function (request, response) {
// 	var result = request.params.number * 2;
// 	response.json(result);
// });

// server.get('/times2', function (request, response) {
// 	var result = request.query.num * 2;
// 	response.json(result);
// });

// var bodyParser = require('body-parser');
// server.use(bodyParser.urlencoded({extended: true})); // <= attaches request.body
// server.use(bodyParser.json()); // <= attaches request.body
// server.post('/times2', function (request, response) {
// 	var result = request.body.theNumber * 2;
// 	response.json(result);
// });

// /*****
// * `server.use` matches the route up to the next '/'
// * `server.all` matches the the whole route exactly
// * `server.use` will assume '/' as its first argument, if not given
// *****/
// // GET /stuff
// // POST /stuff
// // DELETE /stuff
// // ...
// server.all('/stuff', function (request, response) {
// 	response.send('made it to the stuff ALL handler');
// });
// // GET /stuff
// // POST /stuff
// // DELETE /stuff
// // GET /stuff/foo
// // POST /stuff/foo/bar
// // ...
// server.use('/stuff', function (request, response) {
// 	response.send('made it to the stuff use handler');
// });

// /*****
// * `server.use` is useful for handler chaining
// *****/
// server.get('/sup', function (request, response) {
// 	response.send('nm, my hair is ' + request.myhair); // undefined
// });
// // remember: order matters
// server.use(function (request, response, next) {
// 	request.myhair = 'fantastic';
// 	next();
// });
// server.get('/howisyourhair', function (request, response) {
// 	response.send(request.myhair);
// });
// server.get('/howisntyourhair', function (request, response) {
// 	response.send('it isnt not' + request.myhair);
// });

// /*****
// * You can make your own middleware
// *****/
// function jsonBodyParser (request, response, next) {
// 	var allData;
// 	request.on('data', function (x) {
// 		allData = JSON.parse(x.toString());
// 	});
// 	request.on('end', function () {
// 		request.anything = allData;
// 		next();
// 	});
// };
// server.use(jsonBodyParser);
// server.use(function (request, response, next) {
// 	console.log(request.anything);
// 	next();
// });

// /*****
// * Routes are not filepaths
// *****/
// server.use(function (request, response) {
// 	var routeString = request.path;
// 	response.json(routeString.length);
// });

// /*****
// * You can map routes to filepaths
// *****/
// server.use(function (request, response, next) {
// 	fs.readFile('.' + request.path, function (err, data) {
// 		if (err) next();
// 		else response.send(data);
// 	});
// });
// server.use(function (request, response, next) {
// 	response.send('some default thing');
// });

// /*****
// * You can pass errors to `next`
// * Error handlers are parallel to normal handlers
// *****/
// server.get('/roullette', function (request, response, next) {
// 	var n = Math.random();
// 	if (n > 0.5) response.send('phew!');
// 	else {
// 		var error = new Error();
// 		next(error);
// 	}
// });
// server.use(function (request, response, next) {
// 	console.log('normally, i would match');
// 	next();
// });
// // this is error handling middleware simply because it declares four arguments!
// server.use(function (error, request, response, next) {
// 	console.log('sh*t happens');
// 	response.send(error);
// });

// /*****
// * Routers modularize your request handling
// * You must incorporate routers into your app with `server.use`
// *****/
// var birdRouter = express.Router();
// server.use('/birds', birdRouter);
// birdRouter.get('/hens', function (request, response, next) {
// 	response.send('cluck');
// });
// birdRouter.get('/crows', function (request, response, next) {
// 	response.send('caw');
// });
// // different example
// var router = new express.Router();
// router.get('/abc', function (request, response, next) {
// 	response.send('you hit the abc router');
// });
// server.use('/interesting', router);

server.listen(1234);