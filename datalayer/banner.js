'use strict';
var knex = require('../db/knex');
var img = require('./images.js');
const me = {};

function mapper(instance) {
  let obj;

  obj = Object.assign({
    banner_id:instance.id,
    parent_id:instance.parent_id,
    name:instance.name, 
    banner_image:instance.image, 
    image_position:instance.image_position, 
    banner_type:instance.banner_type, 
    display_screen:instance.display_screen,           
    description:instance.description, 
    sorting:instance.sorting, 
    price_min:instance.price_min, 
    price_max:instance.price_max,           
    target_cat_id:instance.cat_id, 
    target_shoplook_id:instance.shoplook_id, 
    target_product_id:instance.product_id, 
    target_brand_id:instance.brand_id, 
    target_banner_filter:instance.banner_filter,
    created_at:instance.created_at, 
    updated_at:instance.updated_at, 
    disabled:instance.disabled
  })
  
  img.add_images(obj, 'banner_image');

  return obj;
}

function get_banner(banner_id, callback) {
  knex.select().from('banner').where({'id':banner_id})
    .then(function(banners) {
        const resObj = instances.map(function (instance) {
            return mapper(instance)
        })        
        callback(resObj);        
  }); 
}
me.get_banner = get_banner;

function get_banners(columns, sorting, filters, paging, callback) {
    //[LIMIT {[offset,] row_count | row_count OFFSET offset}]

    knex.select().from('banner')
        .then(function(instances) {
            const resObj = instances.map(function (instance) {
                return mapper(instance)
            })        
        callback(resObj);        
    });
}
me.get_banners = get_banners;

function get_brand_banners(banner_id, banner_group, callback) {
  
      //console.log('get_brand_banners', banner_id, banner_group);

      knex.select().column(['id as banner_id',
                          'name as banner_name',
                          'image as banner_image',
                          'image_position',
                          'display_screen',
                          'description as banner_descripion',
                          'sorting as rank',
                          'cat_id as catetgory_id',
                          'shoplook_id as look_id',
                          'product_id',
                          'brand_id',
                          'banner_filter']).
          from('banner').where({image_position:'brand',banner_type:banner_id,display_screen:banner_group,disabled:0})
          .then(function(instances) {
  
              const resObj = instances.map(function (instance) {
                  var target_id;
                  var target_type;
          
                  if (instance.category_id) {
                    target_id = instance.category_id;
                    target_type = 'category';
                  } else if (instance.look_id) {
                    target_id = instance.look_id;
                    target_type = 'look';
                  } else if (instance.product_id) {
                    target_id = instance.product_id;
                    target_type = 'product';
                  } else if (instance.brand_id) {
                    target_id = instance.brand_id;
                    target_type = 'brand';
                  }
          
                  let obj =  Object.assign({
                    banner_id: instance.banner_id,
                    banner_name: instance.banner_name,
                    banner_image: instance.banner_image,
                    banner_image_position: instance.image_position,
                    banner_descripion: instance.banner_descripion,
                    banner_rank: instance.rank,
                    banner_target_id: target_id,
                    banner_target_type: target_type
                  });
  
                  img.add_images(obj, 'banner_image');
  
                  delete obj.banner_image;
                  delete obj.banner_name;
                  delete obj.banner_descripion;
                  delete obj.banner_image_position;
                  
                  return obj;
              })              
              //console.log(resObj);              
              callback(resObj);        
      });
    }
    me.get_brand_banners = get_brand_banners;
  

function get_hero_banners(banner_group, callback) {

    knex.select().column(['id as banner_id',
                        'name as banner_name',
                        'image as banner_image',
                        'image_position',
                        'display_screen',
                        'description as banner_descripion',
                        'sorting as rank',
                        'cat_id as catetgory_id',
                        'shoplook_id as look_id',
                        'product_id',
                        'brand_id',
                        'banner_filter']).
        from('banner').where({image_position:'hero',display_screen:banner_group,disabled:0})
        .then(function(instances) {

            const resObj = instances.map(function (instance) {
                var target_id;
                var target_type;
        
                if (instance.category_id) {
                  target_id = instance.category_id;
                  target_type = 'category';
                } else if (instance.look_id) {
                  target_id = instance.look_id;
                  target_type = 'look';
                } else if (instance.product_id) {
                  target_id = instance.product_id;
                  target_type = 'product';
                } else if (instance.brand_id) {
                  target_id = instance.brand_id;
                  target_type = 'brand';
                }
        
                let obj =  Object.assign({
                  banner_id: instance.banner_id,
                  banner_name: instance.banner_name,
                  banner_image: instance.banner_image,
                  banner_image_position: instance.image_position,
                  banner_descripion: instance.banner_descripion,
                  banner_rank: instance.rank,
                  banner_target_id: target_id,
                  banner_target_type: target_type
                });

                img.add_images(obj, 'banner_image');

                delete obj.banner_image;
                delete obj.banner_name;
                delete obj.banner_descripion;
                delete obj.banner_image_position;
                
                return obj;
            })
              
            callback(resObj);        
    });
  }
  me.get_hero_banners = get_hero_banners;


module.exports = me;

