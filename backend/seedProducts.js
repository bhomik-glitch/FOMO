const mongoose = require('mongoose');
const Product = require('./models/Product');

const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/fomo_local';

const products = [
  {
    title: 'Eyes on Fire – Midnight Drop',
    description: 'Glow-in-the-dark streetwear for the night warriors',
    images: [
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504189/1-clearbg_ihcrv8.webp',
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504189/2-clearbg_tgydbl.webp'
    ],
    price: 599,
    category: 'Streetwear',
    stock: 100
  },
  {
    title: 'Fatebound',
    description: 'Dark aesthetics for the bold and fearless',
    images: [
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504392/1-bgremove_aufmkt.webp',
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504392/1-bgremove_aufmkt.webp'
    ],
    price: 599,
    category: 'Streetwear',
    stock: 100
  },
  {
    title: "Heaven's Last Puff",
    description: 'Premium basics with a modern twist',
    images: [
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504477/2-bgremove_qxr10x.webp',
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504476/1-bgremove_w1vsby.webp'
    ],
    price: 599,
    category: 'Basics',
    stock: 100
  },
  {
    title: 'Overwhelmed Tee – Constricted Edition.',
    description: 'Futuristic designs meet street culture',
    images: [
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504546/1-bgremove_qi1bb5.webp',
      'https://res.cloudinary.com/dueddncka/image/upload/v1751504547/2-bgremove_ojqvlo.webp'
    ],
    price: 599,
    category: 'Streetwear',
    stock: 100
  }
];

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.disconnect();
  }); 