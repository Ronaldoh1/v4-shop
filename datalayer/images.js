'use strict';
const me = {};

function add_images(obj, image_property_name) {

    const assets_url = "https://s3.us-east-2.amazonaws.com/assets-selfiestyler-com/images/";
    let hi_res_filename = 'not found';
    let lo_res_filename = 'not found';
  
    const filename = obj[image_property_name];    
    if (filename) {
        let image_filename = filename.substring(0, filename.length-4);
        let extension = filename.substring(filename.length-4);

        image_filename = 'Banner_L1_First01';
        extension = ".jpg";
        hi_res_filename = assets_url + image_filename + '_3x' + extension;
        lo_res_filename = assets_url + image_filename + '_2x' + extension;
    } 


    obj['image'] = {'hi_res':hi_res_filename,  'low_res':lo_res_filename};
}

me.add_images = add_images;
  
module.exports = me;  