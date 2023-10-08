import React, { useEffect, useState } from "react";
import TextBox from "devextreme-react/text-box";
import "./Register.css";
import { Toast } from "devextreme-react/toast";
import LogoImage from "../../Assets/Images/oie_8ndMsF0hLOiZ.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastmessage, settoastmessage] = useState("");
  const [toastType, settoastType] = useState("");

  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      address === "" ||
      nic === "" ||
      phone === "" ||
      email === "" ||
      password === ""
    ) {
      setToastVisible(true);
      settoastmessage("Please fill all the fields");
      settoastType("error");
    } else {
      if (password.length < 8) {
        setToastVisible(true);
        settoastmessage("Please add a password with minimum 7 charaters");
        settoastType("error");
      } else {
        const details = {
          name: fullName,
          address: address,
          nic: nic,
          phone: phone,
          country: country,
          email: email,
          password: password,
        };
        await axios
          .post(`http://localhost:5000/user/`, details)
          .then((result) => {
            setToastVisible(true);
            settoastmessage("Registration Successfull");
            settoastType("success");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setToastVisible(true);
            settoastmessage("Registration Failed");
            settoastType("error");
          });
      }
    }
  };

  return (
    <div class="container">
      <div id="regFormCol">
        <label className="regFormTxt">Full Name</label>
        <TextBox
          showClearButton={true}
          placeholder="John Smith"
          onValueChange={(e) => setFullName(e)}
        />
        <br />
        <span className="regFormTxt">Address</span>
        <TextBox
          showClearButton={true}
          placeholder="N0 3, ABC Street, DYK"
          onValueChange={(e) => setAddress(e)}
        />

        <br />

        <br />
        <span className="regFormTxt">NIC / Passport</span>
        <TextBox
          showClearButton={true}
          placeholder="123456789V"
          onValueChange={(e) => setNic(e)}
        />

        <br />
        <span className="regFormTxt">Phone Number</span>
        <TextBox
          showClearButton={true}
          placeholder="070* *** ***"
          onValueChange={(e) => setPhoneNumber(e)}
        />

        <br />
        <span className="regFormTxt">Email</span>
        <TextBox
          showClearButton={true}
          placeholder="abc@gmail.com"
          onValueChange={(e) => setEmail(e)}
        />

        <br />
        <span className="regFormTxt">Password</span>
        <TextBox
          showClearButton={true}
          placeholder="1A@a..(min 8 characters)"
          onValueChange={(e) => setpassword(e)}
        />
        <br />

        <center>
          <Toast
            visible={toastVisible}
            message={toastmessage}
            type={toastType}
            onHiding={() => setToastVisible(false)}
            displayTime={1500}
          />
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={(e) => registerUser(e)}
          >
            Register User Details
          </button>
          <br />
          <span className="forgotPw">
            <Link to="/">Already Have an Account? </Link>
          </span>
        </center>
      </div>
    </div>
  );
};

export default Register;
