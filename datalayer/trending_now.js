'use strict';
var knex = require('../db/knex');
var img = require('./images.js');
const me = {};


const db_get_trending_now_async = async () => {   
    
    console.log('db_get_trending_now_async');

    const results = await knex.select()
        .columns(['trending_now.product_id as product_id',
                'trending_now.display_order',
                'styles.style'])
        .innerJoin('styles', 'trending_now.product_id', 'styles.product_id')
        .from('trending_now')
        .orderBy('display_order', 'asc');
    
    //console.log(results);

    let trending_products = Object();
    trending_products['styles'] = [];

    for (let item of results) {       
        //console.log(item);
        const obj = JSON.parse(item.style);
        delete obj.sizes;        
        delete obj.prices; 
        delete obj.colors;  
        delete obj.weights;

        delete obj.product_disabled;
        delete obj.product_fit_type;
        delete obj.product_item_name;
        delete obj.product_brand_name;
        delete obj.product_care_label;
        delete obj.product_description;
        delete obj.product_retailer_id;
        delete obj.product_item_details;
        delete obj.product_styling_type;
        delete obj.product_average_weight;
        delete obj.product_country_origin;
        delete obj.product_sleeve_styling;
        delete obj.product_heaviest_weight;
        delete obj.product_clothing_type_id;
        delete obj.product_default_clothing;
        delete obj.product_image_description;
        delete obj.product_clothing_type_name;
        delete obj.product_item_details_items;
            

        img.add_images(obj, 'product_image');
        delete obj.product_image;            
        delete obj.product_items;



        trending_products['styles'].push(obj);
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