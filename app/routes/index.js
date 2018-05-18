var express = require("express");
const assert = require("assert");
var router = express.Router();
const Hashtag  = require("../models/Hashtag");

const Twitter = require('twitter');
//Lo siento pero firebase hosting nos exige pagar para hacer consultas a redes externas desde el servidor, no nos quedan opciones :(
const client = new Twitter({
  consumer_key: 'kPEp58hnV1qdfyoMFD0rTI5yS',
  consumer_secret: 'mviGc6NaxC7mQvg1JSuqAt2wSQD6Hn4hdqiJliwCYVPZbEXkRO',
  access_token_key: '955810668011311104-bYdw3YNdbNuPAvU5YLDFkfJNNrQSfxd',
  access_token_secret: 'm9Ezs0sS9PLgVcXbAKll9en6CcxHxU5GrHgYtcePRAr6j'
});
router.post("/tweets/", function(req, res) {
  //let params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', req.body, function(error, tweets, response) {
    if (!error) {
      res.send(error);
    }
    else res.send({tweets,response});;
  });
});
router.get("/tags/", function(req, res) {
  Hashtag.find(function(err, tags) {
    if (err) return res.send(err);
    let data = {};
    res.json({tags:tags,success:true});
  })
});
router.post("/tag/", function(req, res) {
  Hashtag.findOne({tag:req.body.tag}, function(err, ht){
    if(!ht){
      let tag = new Hashtag();
      tag.tag = req.body.tag;
      tag.save(function(err) {
        if (err) {
          return res.send(err);
        }
        console.log(tag);
        res.json({ success: true, message: "Tag agregado" });
      })
    }
  })
});
module.exports = router;
