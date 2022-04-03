const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shops = require('../controllers/shops');
const { isLoggedIn, isOwner, validateShop } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
  .get(catchAsync(shops.index))
  .post(isLoggedIn, upload.array('image'), validateShop, catchAsync(shops.createShop))

router.route('/filter')
  .get(catchAsync(shops.filter))

router.get('/new', isLoggedIn, shops.renderNewForm);

router.route('/:id')
  .get(catchAsync(shops.showShop))
  .put(isLoggedIn, isOwner, upload.array('image'), validateShop, catchAsync(shops.updateShop))
  .delete(isLoggedIn, isOwner, catchAsync(shops.deleteShop))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(shops.renderEditForm));

module.exports = router;