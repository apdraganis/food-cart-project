const mongoose = require('mongoose');
const Shop = require('../models/shop');
const capitals = require('./capitals');

mongoose.connect('mongodb://localhost:27017/coffeeshop-project');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const products = ['hotdog', 'pizza', 'coffee', 'cocktail'];


const seedDB = async () => {
  await Shop.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const random200 = Math.floor(Math.random() * 200);
    const price = Math.floor(Math.random() * 10) + 1;
    const product = products[Math.floor(Math.random() * products.length)];
    const shop = new Shop({
      owner: '622d945c64ecdd4d7fb189da',
      title: `Food Cart`,
      location: [capitals[random200].CountryName, capitals[random200].CapitalName],
      geometry: {
        type: "Point",
        coordinates: [
          capitals[random200].CapitalLongitude,
          capitals[random200].CapitalLatitude
        ]
      },
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, itaque! Sed, ratione non vero id quidem autem, aperiam debitis fugit vitae natus in. Architecto facilis unde blanditiis, esse numquam necessitatibus.`,
      price,
      product,
      images: [
        {
          url: 'https://res.cloudinary.com/tolisman/image/upload/v1648369142/CoffeeShopProject/wxvjyveoxv15dlakqw98.jpg',
          filename: 'CoffeeShopProject/wxvjyveoxv15dlakqw98'
        },
        {
          url: 'https://res.cloudinary.com/tolisman/image/upload/v1648369057/CoffeeShopProject/zlnzlk0igxp7pojqehtm.jpg',
          filename: 'CoffeeShopProject/zlnzlk0igxp7pojqehtm'
        }

      ]
    })
    await shop.save();
  }

}

seedDB();