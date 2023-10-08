const UserProfile = require("../Models/UserModel");
const bycrypt = require("bcrypt");

const registerUser = (req, res) => {
  console.log("Register method invoked");
  const { name, email, address, phone, password, nic } = req.body;

  try {
    bycrypt
      .hash(password, 10)
      .then((hash) => {
        const user = new UserProfile({
          name,
          email,
          address,
          nic,
          phone,
          password: hash,
          cart: [],
          cakeRequests: [],
        });

        user
          .save()
          .then((result) => {
            console.log("User Registerd");
            res.status(200).json("Successfully registered");
          })
          .catch((err) => {
            console.log("User not Registerd : ", err);
            res.status(400).json("Registerion Failed");
          });
      })
      .catch((err) => {
        console.log("User not Registerd : ", err);
        res.status(400).json("Registerion Failed");
      });
  } catch (error) {}
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`email ${email} password ${password}`);

  const user = await UserProfile.findOne({ email: email });

  if (user) {
    const isMatch = await bycrypt.compare(password, user.password);

    const token = await user.generateAuthToken();

    res.cookie("JWTToken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (!isMatch) {
      console.log("Password is Incorrect");
      res.json({ error: "Login Failed" });
    } else if (!user) {
      console.log("email is Incorrect");
      res.json({ error: "Login Failed" });
    } else {
      console.log("Login Successful");
      res.json({ message: "Login Successful", user: user });
    }
  } else {
    console.log("email is Incorrect");
    res.status(500).json({ error: "Email not found" });
  }
};

module.exports = { registerUser, loginUser };
