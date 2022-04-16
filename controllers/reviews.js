const Shop = require('../models/shop');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {

  const shop = await Shop.findById(req.params.id)
    .populate(
      {  // Have access to reviews
        path: 'reviews',
        populate: {
          path: 'owner'
        }
      }
    ).populate('owner');

  if (shop.reviews.length >= 6) {
    req.flash('error', 'Maximum number of reviews!');
    res.redirect(`/shops/${shop._id}`);
    return
  }

  const review = new Review(req.body.review);
  review.owner = req.user._id;
  shop.reviews.push(review);
  await review.save();
  await shop.save();
  req.flash('success', 'Created New Review!')
  res.redirect(`/shops/${shop._id}`);
}

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Shop.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Succesfully Deleted Review!')
  res.redirect(`/shops/${id}`)
};