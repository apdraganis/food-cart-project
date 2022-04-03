const { shopSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Shop = require('./models/shop');
const Review = require('./models/review');


module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'you must be signed in');
    return res.redirect('/login');
  }
  next();
};

module.exports.validateShop = (req, res, next) => {
  const { error } = shopSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
      next();
  }
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const shop = await Shop.findById(id);
  if (!shop.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!')
    return res.redirect(`/shops/${id}`)
  }
  next();
}

module.exports.isReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!')
    return res.redirect(`/books/${id}`)
  }
  next();
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
      next();
  }
}