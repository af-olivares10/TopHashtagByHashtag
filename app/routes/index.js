var express = require("express");
const assert = require("assert");
var router = express.Router();
const Hashtag  = require("../models/Hashtag");





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
