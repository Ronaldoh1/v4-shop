const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/shopl1');
const route_name = 'shopl1';
let ret = {};

router.route(`/shop_l1`)
  .get((req, res) => {
    queries.get_shop_l1(function(obj) {
      res.json(obj);  
    });
  });

module.exports = router;
