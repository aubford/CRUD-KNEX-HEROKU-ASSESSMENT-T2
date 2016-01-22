var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var pg = require('pg')

function Posts(){
  return knex('posts')
}


router.get('/', function(req, res, next) {
  var post_id = req.params.post_id
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.get('/new',function(req,res){
  res.json()
})

router.post('/',function(req,res){
  Posts().insert(req.body).then(function (post) {
    res.redirect('/posts')
  })
})

router.get('/:id',function(req,res){
  var id = req.params.id
  Posts().where("id",id).first().then(function(post){
    res.json({'SUCCESS': post})
  })
})

router.get('/:id/edit',function(req,res){
  var id = req.params.id
  Posts().where("id",id).first().then(function(post){
    res.json({'SUCCESS': post})
  })
})

router.put('/:id',function(req,res){
  var id = req.params.id
  var author = req.body.author
  var body = req.body.body
  Posts().where("id",id).update({author:author, body:body})
  res.redirect('/posts')
})

router.delete('/:id',function(req,res){
  var id = req.params.id
  Posts().where("id",id).del().then(function(){
    res.redirect('/posts')
  })
})

module.exports = router;
