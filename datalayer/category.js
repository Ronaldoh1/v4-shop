'use strict';
var knex = require('../db/knex');
const me = {};

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
                return Object.assign({
                    category_id: instance.category_id,
                    category_name: instance.category_name,
                    category_image: instance.category_image,
                    category_image_description: instance.category_image_description,
                    display_order: instance.display_order
                })
            })        
        callback({'category_l1':resObj});        
    });     
}
me.get_top_level_categories = get_top_level_categories;
module.exports = me;