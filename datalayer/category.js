'use strict';
var knex = require('../db/knex');
const me = {};

function add_images(category) {
    const assets_url = "http://api-dev.selfiestyler.com/assets/images/";
    let hi_res_filename = 'not found';
    let lo_res_filename = 'not found';

    const filename = category['category_image'];    
    if (filename) {
        const image_filename = filename.substring(0, filename.length-4);
        const extension = filename.substring(filename.length-4);
        hi_res_filename = assets_url + image_filename + '_hi' + extension;
        lo_res_filename = assets_url + image_filename + '_lo' + extension;
    } 
    
    category['image'] = [ {'hi_res':hi_res_filename},  {'low_res':lo_res_filename} ];
}


const db_get_category = async (category_id, callback) => {  

    const category = await knex.select()
        .column([
            'id as category_id', 
            'name as category_name', 
            'image as category_image', 
            'image_description as category_image_description',
            'display_order'
        ])
        .from('categories')
        .where({id:category_id});        
    return category[0];
  }

  const db_get_sub_categories = async (category_id) => {  
    
        const results = await knex.select()
            .column([
                'id as category_id', 
                'name as category_name', 
                'image as category_image', 
                'image_description as category_image_description',
                'display_order'
            ])
            .from('categories')
            .where({parent_id:category_id});        

        const resObj = results.map(function (instance) {
            return Object.assign({
                category_id: instance.category_id,
                category_name: instance.category_name,
                category_image: instance.category_image,
                category_image_description: instance.category_image_description,
                display_order: instance.display_order
            })
        })        

        return resObj;
      }


function get_top_level_categories(callback) {
    
    knex.select()
        .column([
            'id as category_id', 
            'name as category_name', 
            'image as category_image', 
            'image_description as category_image_description',
            'display_order'
        ])
        .from('categories')
        .where({parent_id:null,gender:'f',disabled:0})
        .orderBy('display_order', 'asc')
        .then(function(instances) {
            const resObj = instances.map(function (instance) {

                 add_images(instance);
                 delete instance.category_image;
                 delete instance.category_image_description;

                 return instance;
                 
                 /*return Object.assign({
                    category_id: instance.category_id,
                    category_name: instance.category_name,
                    category_image: instance.category_image,
                    category_image_description: instance.category_image_description,
                    display_order: instance.display_order
                })
                */

            })        


            
        callback({'category_l1':resObj});        
    });     
}
me.get_top_level_categories = get_top_level_categories;


function get_sub_categories(category_id, callback) {
    
    knex.select()
        .column([
            'id as category_id', 
            'name as category_name', 
            'image as category_image', 
            'image_description as category_image_description',
            'display_order'
        ])
        .from('categories')
        .where({parent_id:category_id,gender:'f',disabled:0})
        .orderBy('display_order', 'asc')
        .then(function(instances) {
            const resObj = instances.map(function (instance) {
                return Object.assign({
                    category_id: instance.category_id,
                    category_name: instance.category_name,
                    category_image: instance.category_image,
                    category_image_description: instance.category_image_description,
                    display_order: instance.display_order
                })
            })        
        callback({'category_top':resObj});        
    });     
}
me.get_sub_categories = get_sub_categories;

const foo = async(category_id,callback) => {

    const category = await db_get_category(category_id);    
    add_images(category);
    delete category.category_image;
    delete category.category_image_description;

    const sub_categories = await db_get_sub_categories(category_id);
    
    for (let sub_category of sub_categories) {
        add_images(sub_category);
        delete sub_category.category_image;
        delete sub_category.category_image_description;
    }

    category['categories']=sub_categories;

    callback(category);
}


function get_category(category_id, callback) {
    
    foo(category_id, (results) => {        
        callback(results);
    });
  }


me.get_category = get_category;

module.exports = me;