'use strict';
var knex = require('../db/knex');
const me = {};

function get_trending_now(callback) {
        
    var query = `select
        product.id as product_id,
        trending_now.display_order,
        product.clothing_type_id,
        product.brand_id,
        product.name as product_name,
        product.description  as product_name,
        product.item_name,        
        product.price,
        brand.name as brand_name,
        brand.products_summary,
        (select GROUP_CONCAT(title) from product_size where product_id = trending_now.product_id order by title) as available_sizes,
        (select GROUP_CONCAT(title) from product_color where product_id = trending_now.product_id order by title) as available_colors
        from trending_now, product, brand
        where
          trending_now.product_id = product.id AND
          product.brand_id = brand.id
        order by trending_now.display_order`;
    
      //console.log(query);
    
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then(instances => {
    
            const resObj = instances.map(function (instance) {
    
            var available_sizes_arr = instance.available_sizes.split(',');
            var available_colors_arr = instance.available_colors.split(',');
    
            return Object.assign({
                display_order: instance.display_order,
                product_id: instance.product_id,
                product_name: instance.product_name,
                product_price: instance.price,
                item_name: instance.item_name,
                products_summary: instance.products_summary,
                brand_id: instance.brand_id,
                brand_name: instance.brand_name,
                available_sizes: available_sizes_arr,
                available_colors: available_colors_arr
            })
        })
        callback(resObj);
    })
}

me.get_trending_now = get_trending_now;
module.exports = me;