'use strict';
var knex = require('../db/knex');
const me = {};


function add_images(obj, image_property_name) {
    const assets_url = "http://api-dev.selfiestyler.com/assets/images/";
    let hi_res_filename = 'not found';
    let lo_res_filename = 'not found';
  
    const filename = obj[image_property_name];    
    if (filename) {
        const image_filename = filename.substring(0, filename.length-4);
        const extension = filename.substring(filename.length-4);
        hi_res_filename = assets_url + image_filename + '_hi' + extension;
        lo_res_filename = assets_url + image_filename + '_lo' + extension;
    } 
    
    obj['image'] = [ {'hi_res':hi_res_filename},  {'low_res':lo_res_filename} ];
  }


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
        add_images(obj, 'product_image');
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