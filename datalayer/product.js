'use strict';
var knex = require('../db/knex');
var Promise = require('bluebird');
var path = require('path');
var jsonfile = require('jsonfile')
var prettyjson = require('prettyjson');
var beautify = require("json-beautify");
var striptags = require('striptags');
var _ = require('lodash');
const me = {};

function mapper(instance) {
    let obj;
  
    obj = Object.assign({
        product_id:instance.id,
        clothing_type_id:instance.clothing_type_id,
        brand_id:instance.brand_id,
        product_name:instance.name,
        gender:instance.gender,
        description:instance.description,
        display_product_color_id,
        styling_type:instance.styling_type,
        hem_length:instance.hem_length,
        neckline:instance.neckline,
        sleeve_styling:instance.sleeve_styling,
        rise:instance.rise,
        stretch_type:instance.stretch_type,
        horizontal_stretch:instance.horizontal_stretch,
        vertical_stretch:instance.vertical_stretch,
        fabric_weight:instance.fabric_weight,
        layering:instance.layering,
        structural_detail:instance.structural_detail,
        fit_type:instance.fit_type,
        fit_priority:instance.fit_priority,
        fabric_content:instance.fabric_content,
        garment_detail:instance.garment_detail,
        size_title_type:instance.size_title_type,
        retailer_id:instance.retailer_id,
        retailer_reference_id:instance.retailer_reference_id,
        product_model_height:instance.product_model_height,
        item_name:instance.item_name,
        country_origin:instance.country_origin,
        item_details:instance.item_details,
        care_label:instance.care_label,
        default_clothing:instance.default_clothing,
        control_number:instance.control_number,
        disabled:instance.disabled,
        deleted:instance.deleted,
        status:instance.status,
        created_at:instance.created_at,
        updated_at:instance.updated_at,
        brand_id:instance.id, 
        name:instance.name, 
        products_summary:instance.products_summary, 
        image:instance.image, 
        image_desc:instance.image_desc, 
        created_at:instance.created_at, 
        updated_at:instance.updated_at, 
        disabled:instance.disabled, 
        top_banner_image:instance.top_banner_image, 
        screen_position:instance.screen_position,
        deleted:instance.deleted
    })
  
    return obj;
}


const db_get_product = async (product_id) => {  
  
  return products = await knex('product')
    .innerJoin('product_item', 'product.id', 'product_item.product_id')
    .innerJoin('product_size', 'product_item.product_size_id', 'product_size.id')
    .innerJoin('product_color', 'product_item.product_color_id', 'product_color.id')
    .column([
            'product_item.product_size_id as size_id', 
            'product_size.title as size', 
            'product_item.product_color_id as color_id', 
            'product_color.title as color', 
            'product_item.price as product_price', 
          ])
    .where({'product.id':product_id})
    .select();
}


const db_get_product_items = async (product_id) => {  
  
  const items = await knex('product')    
    .innerJoin('product_item', 'product.id', 'product_item.product_id')
    .innerJoin('product_size', 'product_item.product_size_id', 'product_size.id')
    .innerJoin('product_color', 'product_item.product_color_id', 'product_color.id')
    .column([          
          'product_item.id as product_item_id', 
          'product_size.title as size', 
          'product_color.title as color', 
          'product_item.price as price', 
          'product_item.weight as weight',
          'product_item.image as image',
          'product_item.sku as sku'          
        ])
    .where({'product_item.product_id':product_id})    
    .select();

  return items;
}
  
const db_get_product_sizes = async (product_id) => {  
  
    const sizes = await knex('product')    
      .innerJoin('product_item', 'product.id', 'product_item.product_id')
      .innerJoin('product_size', 'product_item.product_size_id', 'product_size.id')
      .column([
              //'product_item.product_size_id as size_id', 
              'product_size.title as size', 
            ])
      .where({'product.id':product_id})
      .distinct(knex.raw('product_item.product_size_id'))
      .select();

    return sizes;
  }

  
  
const db_get_product_colors = async (product_id) => {  

  const sizes = await knex('product')    
    .innerJoin('product_item', 'product.id', 'product_item.product_id')
    .innerJoin('product_color', 'product_item.product_color_id', 'product_color.id')
    .column([
            'product_color.title as color', 
            'product_color.pattern', 
            'product_color.image as color_swatch', 
          ])
    .where({'product.id':product_id})
    .distinct(knex.raw('product_item.product_color_id'))
    .select();

  return sizes;
}
  
const db_get_product_prices = async (product_id) => {  

  const sizes = await knex('product')    
    .innerJoin('product_item', 'product.id', 'product_item.product_id')
    .where({'product.id':product_id})
    .distinct(knex.raw('product_item.price'))
    .select();

  return sizes;
}
  
const db_get_product_weights = async (product_id) => {  

  const weights = await knex('product')    
    .innerJoin('product_item', 'product.id', 'product_item.product_id')
    .where({'product.id':product_id})
    .distinct(knex.raw('product_item.weight'))
    .select();

  return weights;
}
  
const db_insert_style = async (product_id, data) => {
  return result = await knex('styles')
    .insert({product_id:product_id, style:data})
    .returning('id');  
}
  
const db_get_style = async (product_id) => {    
  const style = await knex('styles')
      .where({'product_id':product_id})
      .select();
  
  return style;
}

const db_get_products = async (product_id, callback) => {  


  const result = await db_get_style(product_id);
  
  console.log('here');

  if (result.length===1) {
    console.log('style found in database');
    //console.log(style[0].style);
    const obj = JSON.parse(result[0].style);
    //var pretty_obj = JSON.stringify(obj, null, 2); // spacing level = 2
    //console.log(pretty_obj);
    callback(obj);    
  }
  
  
  // do prices vary?
  // do weights vary?

  var where;
  
  if (product_id === -1) {
    where = {'product.disabled':0};
  } else {
    where = {'product.id':product_id, 'product.disabled':0};
  }

  const products = await knex('product')
    .innerJoin('brand', 'product.brand_id', 'brand.id')
    .innerJoin('product_fit', 'product.id', 'product_fit.product_id')    
    .innerJoin('clothing_type', 'product.clothing_type_id', 'clothing_type.id')
    .column([
        'product.id as product_id', 
        'product.clothing_type_id as product_clothing_type_id', 
        'product.brand_id as product_brand_id', 
        'product.name as product_name',
        'product.image as product_image',
        'product.image_description as product_image_description',
        'product_fit.styling_type as product_styling_type',
        'product_fit.sleeve_styling as product_sleeve_styling',
        'product_fit.fit_type as product_fit_type',
        'product.gender as product_gender',
        'product.description as product_description', 
        'product.display_product_color_id  as product_display_product_color_id', 
        'product.disabled as product_disabled', 
        'product.retailer_id as product_retailer_id',         
        'product.deleted as product_deleted', 
        'product.status as product_status', 
        'product.item_name as product_item_name', 
        'product.country_origin as product_country_origin', 
        'product.item_details as product_item_details', 
        'product.care_label as product_care_label', 
        'product.default_clothing as product_default_clothing',
        'product.description as product_description',
        'product.clothing_type_id as product_clothing_type_id',
        'clothing_type.name as product_clothing_type_name',
        'clothing_type.average_weight as product_average_weight',
        'clothing_type.heaviest_weight as product_heaviest_weight',        
        'brand.name as product_brand_name'
    ])
    .where(where)
    .select();
  
  //console.log(products);
  
  if (products.length === 0) {
    console.log(`product ${product_id} has no items.`);
    callback(0);
  }
  
  for (let product of products) {
    
    product['product_care_label'] = striptags(product['product_care_label']);
    product['product_description'] = striptags(product['product_description']);
    product['product_item_details'] = striptags(product['product_item_details']);
    //product['product_item_details'] = _.replace(product['product_item_details'], "/\r\n/g", ";");

    product['product_item_details'] = product['product_item_details'].replace(/\r\n/gi, ";");
    product['product_item_details'] = product['product_item_details'].replace(/^;/, "");
    product['product_item_details'] = product['product_item_details'].replace(/;\s+/g, ";");
    product['product_item_details'] = product['product_item_details'].replace(/;$/, "");

    var details_array = product['product_item_details'].split(';');

    product['product_item_details_items'] = details_array;

    console.log(product['product_item_details']);
    console.log('products loop', product.product_id);

    const weights = await db_get_product_weights(product.product_id);
    //console.log(sizes);
    product['weights'] = weights;

    const sizes = await db_get_product_sizes(product.product_id);
    //console.log(sizes);

    product['sizes'] = sizes;

    product['product_sizes'] = _.map(sizes, 'size');

    const colors = await db_get_product_colors(product.product_id);
    //console.log(colors);

    product['colors'] = colors;
    product['product_colors'] = _.map(colors, 'color');

    const prices = await db_get_product_prices(product.product_id);
    //console.log(prices);
    if (prices.length > 0) {
      product['prices'] = prices;
      product['product_price'] = prices[0].price;
    } else {
      product['product_price'] = 0;
    }

    const product_items = await db_get_product_items(product.product_id);    
    product['product_items'] = product_items;
    
    console.log('here', product.product_id);
    
    console.log(product);

    const result = await db_get_style(product.product_id);
    
    console.log('here');

    if (result.length===1) {
      console.log('style found in database');
      //console.log(style[0].style);
      //const obj = JSON.parse(style[0].style);
      //var pretty_obj = JSON.stringify(obj, null, 2); // spacing level = 2
      //console.log(pretty_obj);
      callback(result[0]);  
    }
    else {
      console.log('style not found');
      const results = await insert_style(product.product_id, JSON.stringify(product));
      console.log('insert results:',results);
  
      const style = await db_get_style(product.product_id);
      //console.log('style:', style[0].style);
      //console.log(prettyjson.render(style[0].style, prettyjson_options));
      
      //console.log(beautify(style[0].style, null, 2, 100));
        
      var file = `./styles/${product.product_id}.json`;
      
      console.log(typeof(style[0].style));
      const obj = JSON.parse(style[0].style);
      console.log(typeof(obj));

      //,
      jsonfile.writeFile(file, obj, {spaces: 2, EOL: '\r\n'}, function (err) {
        if (err) {
          console.error('err',err)
        }
      });  
    }
  }
}

function get_product(product_id, callback) {
  db_get_products(product_id, (results) => {
    callback(results)
  });
}
me.get_product = get_product;

function get_style(product_id, callback) {
  db_get_style(product_id, (results) => {
    callback(results)
  });
}
me.get_style = get_style;
  
function get_products(columns, sorting, filters, paging, callback) {  
    //[LIMIT {[offset,] row_count | row_count OFFSET offset}]
}
me.get_products = get_products;

module.exports = me;