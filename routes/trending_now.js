
const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/trending_now');
const route_name = 'trending_now';

router.route(`/trending_now`)
  .get((req, res) => {    
    queries.get_trending_now(function(obj) {
      res.json({ trending_now : obj });  
    });
  });

module.exports = router;
