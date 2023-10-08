const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemDetails = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const items = mongoose.model("items", itemDetails);
module.exports = items;
