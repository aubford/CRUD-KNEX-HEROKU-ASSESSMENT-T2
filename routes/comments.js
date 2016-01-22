var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var pg = require('pg')

function Posts(){
  return knex('posts')
}

function Comments(){
  return knex('comments')
}


router.get('/:post_id/comments', function(req, res, next) {
  var post_id = req.params.post_id
  Comments().where("post_id", post_id).then(function (posts) {
    res.json({'SUCCESS': posts});
  })
});

router.get('/:post_id/comments/new',function(req,res){
  res.json()
})

router.post('/:post_id/comments',function(req,res){
  var post_id = req.params.post_id
  req.body.post_id = post_id
  Comments().insert(req.body).then(function (post) {
    res.redirect('/posts/'+post_id+'/comments')
  })
})

router.get('/:post_id/comments/:id',function(req,res){
  var id = req.params.id
  Comments().where("id",id).first().then(function(post){
    res.json({'SUCCESS': post})
  })
})

router.get('/:post_id/comments/:id/edit',function(req,res){
  var id = req.params.id
  Comments().where("id",id).first().then(function(post){
    res.json({'SUCCESS': post})
  })
})

router.put('/:post_id/comments/:id',function(req,res){
  var id = req.params.id
  var post_id = req.params.post_id

  Comments().where("id",id).update(req.body)
  res.redirect('/posts/'+post_id+'/comments')
})

router.delete('/:post_id/comments/:id',function(req,res){
  var id = req.params.id
  var post_id = req.params.post_id

  Comments().where("id",id).del().then(function(){
    res.redirect('/posts/'+post_id+'/comments')
  })
})

module.exports = router;
