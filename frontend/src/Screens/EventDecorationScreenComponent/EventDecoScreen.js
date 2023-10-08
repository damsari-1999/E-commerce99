import React, { useEffect, useState } from "react";
import "./EventDeco.css";
import Card from "react-bootstrap/Card";
import CakeImg from "../../Assets/Images/butter.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Poruwa from "../../Assets/Images/poruwa.jpg";
import Car from "../../Assets/Images/car.jpeg";
import SetiBak from "../../Assets/Images/seti.jpg";
import Table from "../../Assets/Images/table.jpg";
import CakeStage from "../../Assets/Images/cakeTable.jpg";
import Stage from "../../Assets/Images/stage.jpeg";
import Modal from "react-bootstrap/Modal";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     name: "Poruwa Decorations",
//     price: 50000.0,
//     details: "Poruwa floor decorations, 5 types of fresh flowers",
//     image: Poruwa,
//   },
//   {
//     id: 2,
//     name: "Table Decorations",
//     price: 3000.0,
//     details: "Table cloths, Fresh Flower Vase",
//     image: Table,
//   },
//   {
//     id: 3,
//     name: "Stage Decorations",
//     price: 75000.0,
//     details: "Relevent carpets, Flower Decorations",
//     image: Stage,
//   },
//   {
//     id: 4,
//     name: "Cake Stages",
//     price: 15000.0,
//     details: "Decorate to match the cake",
//     image: CakeStage,
//   },
//   {
//     id: 5,
//     name: "seti back",
//     price: 32000.0,
//     details: "5 types of Fresh flowers, Floor carpet",
//     image: SetiBak,
//   },
//   {
//     id: 6,
//     name: "Car Decorations",
//     price: 20000.0,
//     details: "Front Fresh Flower boquet, Ribbon decorations",
//     image: Car,
//   },
// ];
const EventDecoScreen = () => {
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
      setData(res.data.filter((item) => item.type === "event"));
    });
  }, []);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buyNow = (id) => {
    setItem(data.filter((itemSel) => itemSel.id === parseInt(id))[0]);
    handleShow();
  };

  const confirmPay = () => {
    alert("Payment Success!!");
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
        <h1>Event Decorations</h1> <hr />
        <div className="cusDiv">
          <div className="custxt">
            <h4>Design your event with us!!!</h4>
          </div>
          <div className="cusbtn">
            <Link to={"/eventcus"}>
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

export default EventDecoScreen;
