const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/look');
let ret = {};

router.route(`/shoplook_l1`)
  .get((req, res) => {
    queries.get_look_l1(function(obj) {
      res.json(obj);  
    });
  });

module.exports = router;
