'use strict';
var knex = require('../db/knex');
const banner = require('./banner');
const brand = require('./brand');
const trending_now = require('./trending_now');
const product = require('./product');
const category = require('./category');
const me = {};

function get_brand_l2(brand_id, callback) {
  banner.get_brand_banners(brand_id, 'primary', function(primary_banners) {      
    category.get_brand_categories(brand_id, function(brand_categories) {
      banner.get_brand_banners(brand_id, 'secondary', function(secondary_banners) {
        product.get_brand_styles(brand_id, function(styles) {
            trending_now.get_trending_now(function(top_trending_now) {
                callback(Object.assign({
                        primary_banner:primary_banners,
                        brand_categories:brand_categories,
                        secondary_banner:secondary_banners,
                        styles:styles,
                        trending_now:top_trending_now
                        }));
            })
        })
      })          
    })
  })
}
me.get_brand_l2 = get_brand_l2;

module.exports = me;
