const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/brandl2');
const route_name = 'brandl2';
let ret = {};

router.route(`/brandl2/:id`)
  .get((req, res) => {
    var brand_id = req.params.id;
    queries.get_brand_l2(brand_id, function(obj) {
      res.json(obj);  
    });
  });

module.exports = router;
