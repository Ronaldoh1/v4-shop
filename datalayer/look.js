'use strict';
var knex = require('../db/knex');
const me = {};

function get_look_l1(callback) {

    knex.select()
        .column([
            'id as look_id',  
            'name as look_name', 
            'shop_model_image as look_image', 
            'image_desc  as look_image_description' 
        ])
        .from('shop_look')
        .where({l1_page:1})
        .then(function(instances) {
            const resObj = instances.map(function (instance) {
                return Object.assign({
                    look_id: instance.look_id,
                    look_name: instance.look_name,
                    look_image: instance.look_image,
                    look_image_description: instance.look_image_description
                })
            })        
        callback({shoplook_l1 : resObj[0]});        
    });     
}
me.get_look_l1 = get_look_l1;
module.exports = me;