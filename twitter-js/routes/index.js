'use strict';
var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');

var models = require("../models");
var User = models.User;
var Tweet = models.Tweet;
//Tweet.user

module.exports = function makeRouterWithSockets (io) {

//NEW FUNCTION
  function respondWithAllTweets(req, res){
    Tweet.findAll({
      include: [User]
    }).then(function(tweets){
      var mappedTweets = tweets.map(function(elem, index){
        return {
                content: elem.dataValues.content, 
                name: elem.dataValues.User.dataValues.name, 
                pictureURL: elem.dataValues.User.dataValues.pictureUrl, 
                tweetID: elem.dataValues.id 
              };
      })
      res.render('index',{
        title: 'Twitter.js',
        tweets: mappedTweets,
        showForm: true
      })
    })
  }

//OLD FUNCTION  // a reusable function
  // function respondWithAllTweets (req, res, next){
  //   var allTheTweets = tweetBank.list();
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: allTheTweets,
  //     showForm: true
  //   });
  // }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // OLD CODE single-user page
  // router.get('/users/:username', function(req, res, next){
  //   var tweetsForName = tweetBank.find({ name: req.params.username });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsForName,
  //     showForm: true,
  //     username: req.params.username
  //   });
  // });

  //NEW CODE TO WORK WITH
  router.get('/users/:username', respondWithAllTweets2);

 //NEW FUNCTION
  function respondWithAllTweets2(req, res){
    Tweet.findAll({
      include: [User]
    }).then(function(tweets){
      var mappedTweets = tweets.filter(function(elem, index){
          return (req.params.username === elem.dataValues.User.dataValues.name);
      }).map(function(elem, index){
          return {
                content: elem.dataValues.content, 
                name: elem.dataValues.User.dataValues.name, 
                pictureURL: elem.dataValues.User.dataValues.pictureUrl, 
                tweetID: elem.dataValues.id 
              };
        
      })
      res.render('index',{
        title: 'Twitter.js',
        tweets: mappedTweets,
        showForm: true
      })
    })
  }


  // OLD single-tweet page
  // router.get('/tweets/:id', function(req, res, next){
  //   var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsWithThatId // an array of only one element ;-)
  //   });
  // });
  //NEW single-tweet page
  router.get('/tweets/:id', respondWithOneTweet);

    function respondWithOneTweet(req, res){
    Tweet.findAll({
      include: [User]
    }).then(function(tweets){
      var mappedTweets = tweets.filter(function(elem, index){
          return (req.params.id == Number(elem.dataValues.id));
      }).map(function(elem, index){
          return {
                content: elem.dataValues.content, 
                name: elem.dataValues.User.dataValues.name, 
                pictureURL: elem.dataValues.User.dataValues.pictureUrl, 
                tweetID: elem.dataValues.id 
              };
        
      })
      res.render('index',{
        title: 'Twitter.js',
        tweets: mappedTweets,
        showForm: true
      })
    })
  }

  // create a new tweet
  // router.post('/tweets', function(req, res, next){
  //   var newTweet = tweetBank.add(req.body.name, req.body.text);
  //   io.sockets.emit('new_tweet', newTweet);
  //   res.redirect('/');
  // });

  //NEW create a new tweet

    router.post('/tweets', postNewTweet);

    function postNewTweet(req, res){
      User.findOrCreate({
        where: {
          name: req.body.name
        },
        defaults: {
          name: req.body.name
        }
      })
      .then(
      function(newUser){ //user
        console.log(newUser);
        return Tweet.create({ content: req.body.text, UserId: Number(newUser.dataValues.id) })
      })
      .then(function(tweet){
        //io.sockets.emit('new_tweet', newTweet);
        res.redirect('/');
      });
    };


  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
