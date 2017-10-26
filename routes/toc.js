const express = require('express');
const router  = express.Router();
let ret = {};

router.route(`/toc`).get((req, res) => {
    res.render('toc', {layout: false});
});

module.exports = router;
