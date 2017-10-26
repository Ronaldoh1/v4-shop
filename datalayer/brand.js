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


function mapper(instance) {
    let obj;
  
    obj = Object.assign({
        brand_id:instance.id, 
        name:instance.name, 
        code:instance.code, 
        products_summary:instance.products_summary, 
        brand_image:instance.image, 
        image_desc:instance.image_desc, 
        created_at:instance.created_at, 
        updated_at:instance.updated_at, 
        disabled:instance.disabled, 
        top_banner_image:instance.top_banner_image, 
        screen_position:instance.screen_position,
        deleted:instance.deleted
    })
  
    add_images(obj, 'brand_image');
    delete obj.brand_image;

    return obj;
}

function get_popular_brand(callback) {    
    knex.select()
        .column([
            'popular_brand.display_order',
            'brand.id as brand_id',
            'brand.name as brand_name',
            'brand.products_summary',
            'brand.image as brand_image',
            'brand.image_desc'
        ])
        .from('brand')
        .innerJoin('popular_brand', 'brand.id', 'popular_brand.brand_id')        
        .orderBy('display_order', 'asc')
        .then(function(instances) {
            const resObj = instances.map(function (instance) {
                let obj = Object.assign({
                    display_order: instance.display_order,
                    brand_id: instance.brand_id,
                    brand_name: instance.brand_name,
                    brand_products_summary: instance.products_summary,
                    brand_image: instance.brand_image,
                    brand_image_description: instance.image_desc
                });
                add_images(obj, "brand_image");
                delete obj.brand_image;
                return obj;
            })        
        

        callback(resObj);        
    });     
}
me.get_popular_brand = get_popular_brand;


function get_brand(brand_id, callback) {

    knex.select()
        .column([
            'b.id', 
            'b.name', 
            'b.code', 
            'b.products_summary', 
            'b.image', 
            'b.image_desc', 
            'b.created_at', 
            'b.updated_at', 
            'b.disabled', 
            'b.top_banner_image', 
            'b.screen_position',
            'b.deleted'
        ])
        .from('brand as b')
        .where({'id':brand_id})                
        .then(function(instances) {
            const resObj = instances.map(function (instance) {
                return mapper(instance)            
            })        
        callback(resObj);        
    });     
}
me.get_brand = get_brand;
  
function get_brands(callback) {
    //columns, sorting, filters, paging, 
    //[LIMIT {[offset,] row_count | row_count OFFSET offset}]
  
    knex.select()
        .column([
            'b.id', 
            'b.name', 
            'b.code', 
            'b.products_summary', 
            'b.image', 
            'b.image_desc', 
            'b.created_at', 
            'b.updated_at', 
            'b.disabled', 
            'b.top_banner_image', 
            'b.screen_position',
            'b.deleted'
        ])
        .from('brand as b')           
        .then(function(instances) {
            const resObj = instances.map(function (instance) {
                return mapper(instance)            
            })        
            callback(resObj);        
        });     
}
me.get_brands = get_brands;

module.exports = me;