const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let productSchema = new Schema({
  name: {
    type: String
  },
  imgURL: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
}, {
    collection: 'products'
})
module.exports = mongoose.model('Product', productSchema)