const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/category');
let ret = {};

router.route(`/category_l1`)
  .get((req, res) => {
    queries.get_top_level_categories(function(obj) {
      res.json(obj);  
    });
  });

module.exports = router;
