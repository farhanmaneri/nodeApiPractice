const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title: {
  required: [true, 'title is missing'],
  type: String
    },
    price: Number,
    description: String,
    rating: Object,
  })

  const Products = mongoose.model('product', productSchema)

  module.exports= Products