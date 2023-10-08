const ItemModel = require("../Models/ItemModel");
const UserModel = require("../Models/UserModel");

const addItems = (req, res) => {
  const { itemName, type, details, price, image } = req.body;

  try {
    const itemDetails = new ItemModel({
      itemName,
      type,
      details,
      price,
      image,
    });

    itemDetails
      .save()
      .then((result) => {
        res.status(200).json("item added");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("item added failed");
      });
  } catch (error) {
    console.log(error);

    res.status(400).json("item added failed");
  }
};

const getItemDetails = (req, res) => {
  ItemModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("item fetching failed");
    });
};

const getItemById = (req, res) => {
  const { id } = req.body;

  ItemModel.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("item fetching failed");
    });
};

const addToCart = (req, res) => {
  const { cart } = req.body;
  const { id } = req.params;

  console.log(cart);

  UserModel.updateOne({ _id: id }, { $push: { cart: cart } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(`item updating failed : ${err}`);
    });
};

const deleteFromCart = (req, res) => {};

const getCartItems = (req, res) => {
  const { id } = req.params;

  UserModel.findById(id)
    .populate("cart", "itemName type price")
    .then((result) => {
      res.status(200).json(result.cart);
    })
    .catch((err) => {
      res.status(400).json("item fetching failed");
    });
};
module.exports = {
  addItems,
  addToCart,
  deleteFromCart,
  getCartItems,
  getItemDetails,
  getItemById,
};
