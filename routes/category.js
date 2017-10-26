const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/category');
let ret = {};

router.route(`/category_top`)
  .get((req, res) => {
    queries.get_top_level_categories(function(obj) {
      res.json(obj);  
    });
  });
  
router.route(`/category/:id`).get((req, res) => {
    var category_id = req.params.id;
    
    queries.get_category(category_id, function(obj) {
      res.json(obj);  
    });
  });

module.exports = router;
