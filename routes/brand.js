const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/brand');
let ret = {};

router.route(`/brand/:id`)
    .get((req, res) => {
        var brand_id = req.params.id;
    
        queries.get_brand(brand_id, function(obj) {
            res.json(obj);  
        });
    });

router.route(`/brand`)
    .get((req, res) => {
        queries.get_brands(function(obj) {
            res.json({ brands : obj });  
        });
    });





module.exports = router;
