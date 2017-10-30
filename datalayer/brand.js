'use strict';
var knex = require('../db/knex');
var img = require('./images.js');
const me = {};


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
  
    img.add_images(obj, 'brand_image');
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
                
                //brand_image_description: instance.image_desc
                //brand_products_summary: instance.products_summary,
                //brand_name: instance.brand_name,                    

                let obj = Object.assign({
                    display_order: instance.display_order,
                    brand_id: instance.brand_id,                    
                    brand_image: instance.brand_image
                });
                img.add_images(obj, "brand_image");
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