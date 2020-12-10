var express = require('express');
var router = express.Router();
var client = require("../db");

/* GET players listing. */
router.get('/', function(req, res, next) {
    const collection = client.db("players").collection("statistics");
    collection.find({}).toArray(function(err, result) {
      if (err) throw err;
        res.json(result);
        //client.close();
    });
  })


module.exports = router;




