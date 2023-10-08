import React, { useEffect, useState } from "react";
import "./FlowerScreen.css";
import Card from "react-bootstrap/Card";
import IntroFlower from "../../Assets/Images/flowers-1-e1662997062785.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import RedRose from "../../Assets/Images/redrose.jpg";
import WhiteRose from "../../Assets/Images/whiterose.jpg";
import Carnation from "../../Assets/Images/carn.jpeg";
import Tulip from "../../Assets/Images/tulip.jpg";
import Chrysanthemum from "../../Assets/Images/CHRy.jpg";
import Orchids from "../../Assets/Images/orch.jpeg";
import Peonies from "../../Assets/Images/peon.jpeg";
import Dahlia from "../../Assets/Images/dhali.jpg";
import Modal from "react-bootstrap/Modal";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import axios from "axios";

const FlowerScreen = () => {
  const [show, setShow] = useState(false);
  const [SelectedItem, setItem] = useState();
  const [cardNo, setCardNo] = useState(0);
  const [cardHolder, setCardHolder] = useState();
  const [cardCvc, setCardCvc] = useState(0);
  const [cardMon, setCardMon] = useState(0);
  const [cardYer, setCardYer] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/item/").then((res) => {
      setData(res.data.filter((item) => item.type === "boquet"));
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buyNow = (id) => {
    setItem(data.filter((itemSel) => itemSel.id === parseInt(id))[0]);
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
        <h1>Flowers</h1> <hr />
        <div className="cusDiv">
          <div className="custxt">
            <h4>Get your customized flower boquite here!!!</h4>
          </div>
          <div className="cusbtn">
            <Link to={"/flowercus"}>
              <Button variant="outline-danger">Customize</Button>
            </Link>
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
                  <div
                    style={{
                      height: "10%",
                      width: "100%",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={flower.image}
                      style={{ borderRadius: 9 }}
                    />
                  </div>

                  <Card.Body style={{ paddingLeft: "1%", paddingRight: "1%" }}>
                    <center>
                      <Card.Title>
                        <b>{flower.itemName}</b>
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

export default FlowerScreen;
