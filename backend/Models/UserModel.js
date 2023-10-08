const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetails = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "items",
    },
  ],
  cakeRequests: [
    {
      type: Boolean,
      image: String,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userDetails.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "aaaabbbbccccddddeeeeffffggggtttt");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const user = mongoose.model("userDetails", userDetails);
module.exports = user;
