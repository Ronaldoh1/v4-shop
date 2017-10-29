'use strict';
var knex = require('../db/knex');
const banner = require('./banner');
const brand = require('./brand');
const trending_now = require('./trending_now');
const look = require('./look');
const category = require('./category');
const me = {};

function get_shop_l1(callback) {
  banner.get_hero_banners(function(hero_banners1) {      
    category.get_top_level_categories(function(top_level_categories) {
      banner.get_hero_banners(function(hero_banners2) {
      //look.get_look_l1(function(top_look_banner) { 
        trending_now.get_trending_now(function(top_trending_now) {
          brand.get_popular_brand(function(top_popular_brand){
            callback(Object.assign({
              hero_banners_section_1:hero_banners1,
              categories:top_level_categories,
              //look_banner:top_look_banner,
              hero_banners_section_2:hero_banners2,              
              trending_now:top_trending_now,
              popular_brand:top_popular_brand
            }));
          })
        })
      })          
    })
  })
}
me.get_shop_l1 = get_shop_l1;

module.exports = me;
