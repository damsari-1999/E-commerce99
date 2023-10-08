import React, { useEffect, useState } from "react";
import "./CakeScreen.css";
import Card from "react-bootstrap/Card";
import CakeImg from "../../Assets/Images/butter.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ButterCake from "../../Assets/Images/butter.jpg";
import ChocolateCake from "../../Assets/Images/choco.jpg";
import Marble from "../../Assets/Images/marble.jpg";
import RedVelvet from "../../Assets/Images/RED-VELVET-CAKE-23-S-01.jpg";
import Coffee from "../../Assets/Images/coffe.jpg";
import Fruit from "../../Assets/Images/fruit-cake.jpg";
import BananaCakeWithCreamCheese from "../../Assets/Images/bcakewithcreamcheese.jpeg";
import ButterCakeWithCream from "../../Assets/Images/buttercakewithcreamcheese.jpg";
import Modal from "react-bootstrap/Modal";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import ImgPlaceHolder from "../../Assets/Images/img.jpg";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     name: "Butter Cake",
//     price: 1250.0,
//     size: "1Kg",
//     image: ButterCake,
//   },
//   {
//     id: 2,
//     name: "Chocolate Cake",
//     price: 1350.0,
//     size: "1.5Kg",
//     image: ChocolateCake,
//   },
//   {
//     id: 3,
//     name: "Coffee Cake",
//     price: 1150.0,
//     size: "750g",
//     image: Coffee,
//   },
//   {
//     id: 4,
//     name: "Fruit Cake",
//     price: 2075.0,
//     size: "1Kg",
//     image: Fruit,
//   },
//   {
//     id: 5,
//     name: "Red Velvet Cake",
//     price: 3200.0,
//     size: "1kg",
//     image: RedVelvet,
//   },
//   {
//     id: 6,
//     name: "Marble Cake",
//     price: 2000.0,
//     size: "750g",
//     image: Marble,
//   },
//   {
//     id: 7,
//     name: "Banana cake with cream cheese",
//     price: 2000.0,
//     size: "1Kg",
//     image: BananaCakeWithCreamCheese,
//   },
//   {
//     id: 8,
//     name: "Butter cake with cream cheese",
//     price: 1750.0,
//     size: "1kg",
//     image: ButterCakeWithCream,
//   },
// ];

const CakeScreen = () => {
  const [show, setShow] = useState(false);
  const [showp, setShowp] = useState(false);
  const [SelectedItem, setItem] = useState();
  const [cardNo, setCardNo] = useState(0);
  const [cardHolder, setCardHolder] = useState();
  const [cardCvc, setCardCvc] = useState(0);
  const [cardMon, setCardMon] = useState(0);
  const [cardYer, setCardYer] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/item/").then((res) => {
      setData(res.data.filter((item) => item.type === "cake"));
    });
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log(selectedImage);
    setImage(selectedImage);
  };

  const uploadToFirebase = async () => {
    if (image) {
      const imageRef = ref(storage, `9jacoder/images/${image.name}`);
      console.log("uploading image");
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setImageUrl(url);
        });
      });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosep = () => setShow(false);
  const handleShowp = () => setShow(true);

  const buyNow = (id) => {
    setItem(data.filter((itemSel) => itemSel._id === parseInt(id))[0]);
    handleShow();
  };

  const confirmPay = () => {
    alert("Payment Success!!");
  };

  const addToCart = (id) => {
    const cartItem = {
      cart: id,
    };

    const userId = JSON.parse(localStorage.getItem("userDetails"))._id;
    axios
      .put(`http://localhost:5000/item/cart/${userId}`, cartItem)
      .then((res) => {
        alert("Item Added to the cart");
      })
      .catch((err) => {
        console.log("err : ", err);
        alert("Item adding failed");
      });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an image of a sample cake you want</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img
              src={image === null ? ImgPlaceHolder : { uri: image }}
              style={{ width: "200px", height: "200px" }}
            />
            <br />
            <input type="file" onChange={(e) => handleImageChange(e)} /> <br />
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => uploadToFirebase()}
            >
              Upload
            </button>
          </center>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal show={showp} onHide={handleClosep}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="paymentDialog">
            <div className="ItemDetail">
              <center>
                <p>
                  <b>{SelectedItem?.name}</b>
                </p>
                <img src={SelectedItem?.image} width={100} height={100} />
                <br /> <br />
                <p>RS. {SelectedItem?.price}</p>
              </center>
            </div>
            <div className="payDetail">
              <div className="cardContent">
                <span className="regFormTxt">Card Number</span>
                <NumberBox
                  className="cardno"
                  onValueChange={(e) => setCardNo(e)}
                />

                <br />
                <span className="regFormTxt">Card Holder Name</span>
                <TextBox
                  placeholder="John Smith"
                  className="cardno"
                  onValueChange={(e) => setCardHolder(e)}
                />
                <br />
                <div className="row">
                  <div className="col">
                    <span>Expire Month & Year</span>
                    <div className="row">
                      <div className="col">
                        <NumberBox onValueChange={(e) => setCardMon(e)} />
                      </div>
                      <div className="col">
                        <NumberBox onValueChange={(e) => setCardYer} />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <span>CVC Number</span>
                    <NumberBox onValueChange={(e) => setCardCvc(e)} />
                  </div>
                </div>
                <br />
                <center>
                  <br />

                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => confirmPay()}
                  >
                    Confirm Pyament
                  </button>
                </center>
                <br />
                <br />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div className="container">
        <h1>Cakes</h1> <hr />
        <div className="cusDiv">
          <div className="custxt">
            <h4>Design your own cake with us!!!</h4>
          </div>
          <div className="cusbtn">
            <button
              onClick={() => handleShow()}
              type="button"
              class="btn btn-outline-danger"
            >
              Customize
            </button>
          </div>
        </div>
        <hr />
        <center>
          <div className="flowerContainer">
            {data.map((flower, index) => (
              <div className="flowersdiv" key={index}>
                <Card
                  style={{
                    width: "18rem",
                    border: "1px solid red",
                    borderRadius: 9,
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={flower.image}
                    style={{ width: "100%", borderRadius: 9 }}
                  />
                  <Card.Body style={{ paddingLeft: "1%", paddingRight: "1%" }}>
                    <center>
                      <Card.Title>
                        <b>{flower.name}</b>
                      </Card.Title>
                      <Card.Text>
                        <p>Price : Rs. {flower.price}</p>
                        <p>Details : {flower.details}</p>
                      </Card.Text>
                      <div className="btnContainer">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => buyNow(flower._id)}
                        >
                          Buy Now
                        </Button>
                        <button
                          type="button"
                          class="btn btn-outline-dark btn-sm"
                          onClick={() => addToCart(flower._id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </center>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </center>
      </div>
    </div>
  );
};

export default CakeScreen;
