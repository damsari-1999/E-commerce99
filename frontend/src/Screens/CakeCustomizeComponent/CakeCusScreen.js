import React, { useState } from "react";
import "./CakeCus.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BDCake from "../../Assets/Images/bdcake.jpg";
import ButterCake from "../../Assets/Images/butterC.jpeg";
import ButterIcing from "../../Assets/Images/butterIci.jpg";
import MiddleIcingLayer from "../../Assets/Images/buttercakewithcreamcheese.jpg";
import ChocoFlavour from "../../Assets/Images/chocolateflavour.jpg";
import StrawberryFlavour from "../../Assets/Images/strawberryFlavour.jpg";
import DecoWithOreo from "../../Assets/Images/decoWithoreo.jpg";
import RainbowCandle from "../../Assets/Images/rainbowbirthdayCandle.jpg";
import Sprinkles from "../../Assets/Images/sprinkles.jpg";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";

const data = [
  {
    id: 1,
    name: "Butter Cake",
    price: 1850.0,
    size: "1Kg",
    image: ButterCake,
  },
  {
    id: 2,
    name: "Butter Icing",
    price: 1650.0,
    size: "null",
    image: ButterIcing,
  },
  {
    id: 3,
    name: "Middle Icing Layer",
    price: 850.0,
    size: "Medium",
    image: MiddleIcingLayer,
  },
  {
    id: 4,
    name: "Chocolate Flavours",
    price: 500.0,
    size: "null",
    image: ChocoFlavour,
  },
  {
    id: 5,
    name: "strawberry Flavours",
    price: 420.0,
    size: "null",
    image: StrawberryFlavour,
  },
  {
    id: 6,
    name: "Decorate with Oreo",
    price: 1600.0,
    size: "Medium",
    image: DecoWithOreo,
  },
  {
    id: 7,
    name: "Rainbow Birthday Candle",
    price: 450.0,
    size: "null",
    image: RainbowCandle,
  },
  {
    id: 8,
    name: "Sprinkles",
    price: 275.0,
    size: "Medium",
    image: Sprinkles,
  },
];

const CakeCusScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);
  const [cardNo, setCardNo] = useState(0);
  const [cardHolder, setCardHolder] = useState();
  const [cardCvc, setCardCvc] = useState(0);
  const [cardMon, setCardMon] = useState(0);
  const [cardYer, setCardYer] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseP = () => setShowP(false);
  const handleShowP = () => setShowP(true);

  const buyNow = () => {
    handleClose();
    handleShowP();
  };

  const confirmPay = () => {
    alert("Payment Success!!");
  };

  let total = 0;

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems((items) => [...items, value]);
    } else {
      setSelectedItems((prevData) => {
        return [...prevData.filter((data) => data !== value)];
      });
    }
  };

  const calculateTotal = () => {
    selectedItems.forEach((element) => {
      total =
        total +
        parseFloat(
          data.filter((flowerItem) => flowerItem.id === parseInt(element))[0]
            .price
        );
    });
  };
  calculateTotal();
  return (
    <div>
      <Modal show={showP} onHide={handleCloseP}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="paymentDialog">
            <div className="ItemDetail">
              <center>
                <p>
                  <b>Customized Flower Boquet</b>
                </p>
                <img src={BDCake} width={100} height={100} />
                <br /> <br />
                <p>RS. {total}</p>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sample Cake Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img src={BDCake} width={350} height={300} />
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => buyNow()}>
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="topicTxt" style={{ marginTop: "2%" }}>
          <h2>Get your customized Cake here for your special occasions!!</h2>
        </div>
      </div>
      <center>
        <div
          className="mainItemCon"
          style={{
            paddingTop: "1%",
            paddingBottom: "3%",
            paddingLeft: "2%",
            paddingRight: "2%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <label style={{ float: "left", fontSize: 25, color: "white" }}>
            <b>Total selections :</b> {selectedItems.length}
          </label>
          <label style={{ textAlign: "center", fontSize: 25, color: "white" }}>
            <b>Total Price :</b> Rs.{total}
          </label>
          <Button
            onClick={handleShow}
            style={{
              float: "right",
            }}
            variant="outline-light"
          >
            View Sample
          </Button>
        </div>
        <div className="container">
          <div className="itemSelectCon">
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
                        <p>Extra Details : {flower.size}</p>
                        <input
                          type="checkbox"
                          value={flower.id}
                          onChange={checkboxHandler}
                        />
                      </Card.Text>
                    </center>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </center>
    </div>
  );
};

export default CakeCusScreen;
