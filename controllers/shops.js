const { cloudinary } = require('../cloudinary');
const Shop = require('../models/shop');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const countries = require('../seeds/countries');

module.exports.index = async (req, res) => {
  const shops = await Shop.find({})
    .populate({  // Have access to reviews
      path: 'reviews',
      populate: {
        path: 'owner'
      }
    }).populate('owner');
  res.render('shops/index', { shops, countries });
};

module.exports.filter = async (req, res) => {
  const state = req.query.state;
  const { priceMin, priceMax } = req.query;
  const { product } = req.query;
  const query = {
    location: { $regex: `${state}` },
    price: { $gte: priceMin, $lte: priceMax }
  };
  if (req.query.product) {
    query.product = { $in: product };
  }

  const shops = await Shop.find(query);
  res.render('shops/index', { shops, countries });

}

module.exports.renderNewForm = (req, res) => {
  res.render('shops/new', { countries });
};

module.exports.createShop = async (req, res, next) => {
  const geoData = await geocoder.forwardGeocode({
    query: `${req.body.shop.location[1]}, ${req.body.shop.location[0]}`,
    limit: 1
  }).send()

  const shop = new Shop(req.body.shop);
  shop.geometry = geoData.body.features[0].geometry;
  shop.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  shop.owner = req.user._id;
  await shop.save();
  req.flash('success', 'Successfully added a new shop!');
  res.redirect(`/shops/${shop._id}`);
};

module.exports.showShop = async (req, res) => {

  const shop = await Shop.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'owner'
      }
    }).populate('owner');

  if (!shop) {
    req.flash('error', 'Shop does not exist!');
    return res.redirect('/shops')
  }
  res.render('shops/show', { shop });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const shop = await Shop.findById(id);
  if (!shop) {
    req.flash('error', 'Shop does not exist!');
    return res.redirect('/shops')
  }
  res.render('shops/edit', { shop, countries })
};

module.exports.updateShop = async (req, res) => {
  const { id } = req.params;
  const shop = await Shop.findByIdAndUpdate(id, { ...req.body.shop });
  const geoData = await geocoder.forwardGeocode({
    query: `${req.body.shop.location[1]}, ${req.body.shop.location[0]}`,
    limit: 1
  }).send()
  shop.geometry = geoData.body.features[0].geometry;
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  shop.images.push(...imgs);
  await shop.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await shop.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
  }

  req.flash('success', 'Succesfully Updated Shop!')
  res.redirect(`/shops/${shop._id}`);
};

module.exports.deleteShop = async (req, res) => {
  const { id } = req.params;
  await Shop.findByIdAndDelete(id);
  req.flash('success', 'Succesfully Deleted Shop!')
  res.redirect('/shops');
};