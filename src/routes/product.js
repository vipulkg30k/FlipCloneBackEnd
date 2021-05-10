const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { getProductsBySlug, createProduct } = require('../controllers/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname), 'uploads') )
    },
    filename: (req, file, cb) => {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});


const upload = multer({ storage });

router.post('/product/create',requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/products/:slug', getProductsBySlug);


// router.get('/product/getcategory', getCategories);

module.exports = router;