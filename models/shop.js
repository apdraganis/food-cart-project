const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_280,h_280,c_fill')
});

const opts = { toJSON: { virtuals: true } };

const ShopSchema = new Schema({
  title: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  location: Array,
  product: String,
  price: Number,
  description: String,
  images: [ImageSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts);


ShopSchema.virtual('properties.popUpMarkup').get(function () {
  return `<strong><a href="/shops/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0, 20)}...</p>
  `
})

ShopSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model('Shop', ShopSchema);