import React, { useEffect, useState } from "react";
import "./EventCus.css";
import Card from "react-bootstrap/Card";
import IntroFlower from "../../Assets/Images/flowers-1-e1662997062785.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BDCake from "../../Assets/Images/bdcake.jpg";
import ButterCake from "../../Assets/Images/butter.jpg";
import Poruwa from "../../Assets/Images/poruwa.jpg";
import DecoLights from "../../Assets/Images/decolight.jpg";
import PoruwaFloor from "../../Assets/Images/poruwaFlor.jpg";
import Backdrop from "../../Assets/Images/backdrop.jpg";
import ballon from "../../Assets/Images/ballon.jpg";
import setiback from "../../Assets/Images/setiback.jpg";
import SamplePoruwa from "../../Assets/Images/sampleImg.jpg";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     name: "Poruwa without decorations",
//     price: 50000.0,
//     details: "Basic poruwa",
//     image: Poruwa,
//   },
//   {
//     id: 2,
//     name: "Fresh Flower decorations",
//     price: 32500.0,
//     size: "Can select any types of flowers upto 10 types",
//     image: IntroFlower,
//   },
//   {
//     id: 3,
//     name: "Decoration Lights",
//     price: 150.0,
//     size: "Medium",
//     image: DecoLights,
//   },
//   {
//     id: 4,
//     name: "Poruwa Floor decoration with seeds",
//     price: 10000.0,
//     size: "use rice, Dhal, Kadala, etc",
//     image: PoruwaFloor,
//   },
//   {
//     id: 5,
//     name: "Candle Decorations",
//     price: 250.0,
//     size: "Can select several types of candles",
//     image: Poruwa,
//   },
//   {
//     id: 6,
//     name: "Balloons 10 pieces",
//     price: 300.0,
//     size: "Rubber balloons 10 packet",
//     image: ballon,
//   },
//   {
//     id: 7,
//     name: "Backdrop Curtain",
//     price: 15000.0,
//     size: "Can select according to the event theme color",
//     image: Backdrop,
//   },
//   {
//     id: 8,
//     name: "Basic Seti Back",
//     price: 17500.0,
//     size: "Setiback without any decoration",
//     image: setiback,
//   },
// ];

const EventCusScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);
  const [cardNo, setCardNo] = useState(0);
  const [cardHolder, setCardHolder] = useState();
  const [cardCvc, setCardCvc] = useState(0);
  const [cardMon, setCardMon] = useState(0);
  const [cardYer, setCardYer] = useState(0);
  const [qty, setQty] = useState(0);
  const [id, setId] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [showQ, setShowQ] = useState(false);
  const [data, setData] = useState([]);
  const [itemsQty, setItemsQty] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/item/").then((res) => {
      setData(res.data.filter((item) => item.type === "eventcus"));
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseP = () => setShowP(false);
  const handleShowP = () => setShowP(true);

  const handleCloseQ = () => setShowQ(false);
  const handleShowQ = () => setShowQ(true);

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
    console.log("value: " + value);

    if (isSelected) {
      setSelectedItems((items) => [...items, value]);
      setId(value);
      handleShowQ();
    } else {
      setSelectedItems((prevData) => {
        deleItmQty(value);

        return [...prevData.filter((data) => data !== value)];
      });
    }
  };

  const deleItmQty = (id) => {
    console.log("del id : ", id);
    console.log("qtys : ", itemsQty);
    setItemsQty((prevData) => {
      return [...prevData.filter((data) => parseInt(data._id) !== id)];
    });

    console.log("qtys d: ", itemsQty);
  };

  const addItmQty = () => {
    const itemQ = {
      id: id,
      qunty: qty,
    };
    console.log("addItmQty : ", itemQ);
    setItemsQty((itm) => [...itm, itemQ]);
    setQty(0);
    // calculateTotal();

    console.log(
      " total : ",
      totalP,
      " price : ",
      parseFloat(totalP) +
        parseFloat(
          data.filter((flowerItem) => flowerItem._id === id)[0].price *
            parseInt(qty)
        )
    );
    setTotalP(
      parseFloat(totalP) +
        parseFloat(
          data.filter((flowerItem) => flowerItem._id === id)[0].price *
            parseInt(qty)
        )
    );

    handleCloseQ();
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
  // calculateTotal();

  return (
    <div>
      <Modal show={showQ} onHide={handleCloseQ}>
        <Modal.Header closeButton>
          <Modal.Title>Add quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <input type="number" onChange={(e) => setQty(e.target.value)} />
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => addItmQty()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
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
                <img src={SamplePoruwa} width={100} height={100} />
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
          <Modal.Title>Sample Event Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img src={SamplePoruwa} width={350} height={300} />
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
          <h2>
            Get your customized decorations here for your special occasions!!
          </h2>
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
            <b>Total Price :</b> Rs.{totalP}
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
                        <p>Details : {flower.details}</p>
                        <input
                          type="checkbox"
                          value={flower._id}
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

export default EventCusScreen;
