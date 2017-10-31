const express = require('express');
const router  = express.Router();
const queries = require('../datalayer/product');
const route_name = 'product';

router.route(`/product`).get((req, res) => {
  queries.get_product(564, function(obj) {
    res.json(obj);  
  });
});

router.route(`/style-brand/:id`).get((req, res) => {
  var brand_id = req.params.id;

  queries.get_brand_styles(brand_id, function(obj) {
    res.json(obj);  
  });
});


router.route(`/style`).get((req, res) => {
  queries.get_style(564, function(obj) {
    res.json(obj);  
  });
});

/*
var filterInt = function(value, default_value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return default_value;
}


router.route(`/${route_name}`)
  .get(function(req, res) {

    let query_offset = filterInt(req.query.offset,0);
    let query_limit = filterInt(req.query.limit,5);
    
    Product.findAndCountAll({ limit:  query_limit, offset: query_offset,
                              include: [ {model: models.brands}, {model: models.clothing_types} ],
                              raw: false 
                            })
      .then(function(instances) {

        const resObj = instances.rows.map(function(instance) {
            return Object.assign(
              {
                product: {
                  product_id: instance.id,
                  product_name: instance.name,                        
                  brand: {
                    brand_id: instance.brand_id,
                    brand_name: instance.brand.name
                  },
                clothing_type: {
                  clothing_type_id: instance.clothing_type_id,
                  clothing_type_name: instance.clothing_type.name
                }
              }
            }
          )
        });
        
        res.json(instances);   
      });
  });


router.route(`/${route_name}`)  
  .post(function(req, res) {
    ProductDeserializer.deserialize(req.body)
      .then((data) => {
        return Product.create(data);
      })
      .then(function(instance){
        ret = response.structure(req, ProductSerializer.serialize(instance.get()));
        res.status(201).json(ret);
      });
  }); 
router.route(`/${route_name}/:id`)
  .get((req, res) => {
    Product.find({ 
                  where: {id: req.params.id}, 
                  include: [ {model: models.brands}, {model: models.clothing_types} ]
                 })
      .then((instance) => {
        if(instance){
          const resObj = {            
                  product: {
                        product_id: instance.id,
                        product_name: instance.name,                        
                        brand: {
                          brand_id: instance.brand_id,
                          brand_name: instance.brand.name
                        },
                        garment_type: {
                          clothing_type_id: instance.clothing_type_id,
                          clothing_type_name: instance.clothing_type.name
                        }
                  }                  
                }
          res.json(resObj);          
        } else {
          ret = errors.doesNotExist(route_name, req.params.id);
          res.status(ret.status).json(ret.json);
        }
      });
  });

router.route(`/${route_name}/:id`)  
  .put((req, res) => {
    ProductDeserializer.deserialize(req.body)
      .then((data) => {
        const findWhere = {where: {id: req.params.id}};
        Product.find(findWhere)
          .then((instance) => {
            if(instance){
              instance.updateAttributes(data)
                .then((instance) => {
                  instance
                    .reload(findWhere)
                    .then((instance) => {
                      ret = response.structure(req, ProductSerializer.serialize(instance));
                      res.json(ret);
                    })
                });
            } else {
              ret = errors.doesNotExist(route_name, req.params.id);
              res.status(ret.status).json(ret.json);
            }
          });
      });
  })
  .delete((req, res) => {
    Product.find({where: {id: req.params.id}})
      .then((instance) => {
        if(instance){
          ret = response.structure(req, ProductSerializer.serialize(instance));
          return instance.destroy()
            .then(() => {
              res.json(ret);
            });
        } else {
          ret = errors.doesNotExist(route_name, req.params.id);
          res.status(ret.status).json(ret.json);
        }
      });
  });
*/

module.exports = router;
