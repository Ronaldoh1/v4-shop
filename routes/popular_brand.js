const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/brand');
const route_name = 'popular_brand';
let ret = {};

router.route(`/popular_brand`)
  .get((req, res) => {
    queries.get_popular_brand(function(obj) {
      res.json({ popular_brand : obj });  
    });
  });

module.exports = router;
