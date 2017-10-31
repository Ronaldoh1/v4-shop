'use strict';
var knex = require('../db/knex');
var img = require('./images.js');
const me = {};


const db_get_trending_now_async = async () => {   
    
    console.log('db_get_trending_now_async');

    const results = await knex.select()
        .columns(['trending_now.product_id as product_id',
                'trending_now.display_order',
                'styles.style',
                'product.image as product_image'])
        .innerJoin('styles', 'trending_now.product_id', 'styles.product_id')
        .innerJoin('product', 'trending_now.product_id', 'product.id')
        .from('trending_now')
        .orderBy('display_order', 'asc');
    
    //console.log(results);

    let trending_products = [];

    for (let item of results) {       
        //console.log(item);
        const obj = JSON.parse(item.style);
        
        let response_obj = {}
        response_obj['item_id'] = obj.product_id;
        response_obj['name'] = obj.product_name;
        response_obj['price'] = obj.product_price;
        response_obj['colors_available'] = obj.colors.length;
        response_obj['gender'] = obj.product_gender;
        response_obj['isFavorited'] = false;
        response_obj['brand'] =  obj.product_brand_name;
        
        response_obj['product_image'] =  item.product_image + "_Thumbnail.jpg";
        img.add_images(response_obj, 'product_image');

        trending_products.push(response_obj);
    }

    //console.log(trending_products);

    return trending_products;
}


const db_get_trending_now = async ( callback) => {      
    let results;

    results = await db_get_trending_now_async();
    callback(results);          
}

function get_trending_now(callback) {

    db_get_trending_now((results) => {
        callback(results)
    });
}

me.get_trending_now = get_trending_now;
module.exports = me;