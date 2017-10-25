//const models  = require('../models');
const express = require('express');
const router  = express.Router();
//const errors = require('../lib/errors');
//const response = require('../lib/response');
const queries = require('../datalayer/banner');
const route_name = 'banner';
let ret = {};

//var sequelize = models.sequelize;

router.route(`/banner_l1`).get((req, res) => {
    queries.get_hero_banners(function(obj) {
      res.json({ banner : obj });  
  });
});

router.route(`/banner/:id`).get((req, res) => {
    var banner_id = req.params.id;
    
    queries.get_banner(banner_id, function(obj) {
      res.json({ banner : obj });  
    });
});

router.route(`/banners`).get((req, res) => {
  var banner_id = req.params.id;
  
  let columns = {};
  let sorting = {};
  let filters = {};
  let paging = {};

  queries.get_banners(columns, sorting, filters, paging, function(obj) {
    res.json({ banners : obj });  
  });
});


module.exports = router;
