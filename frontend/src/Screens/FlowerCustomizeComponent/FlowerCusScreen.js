import React, { useEffect, useState } from "react";
import "./FlowerCus.css";
import Card from "react-bootstrap/Card";
import IntroFlower from "../../Assets/Images/flowers-1-e1662997062785.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FlowerBoquet from "../../Assets/Images/boquet.jpg";
import RedRose from "../../Assets/Images/redrose.jpg";
import WhiteRose from "../../Assets/Images/whiterose.jpg";
import Carnation from "../../Assets/Images/carn.jpeg";
import Tulip from "../../Assets/Images/tulip.jpg";
import Chrysanthemum from "../../Assets/Images/CHRy.jpg";
import Orchids from "../../Assets/Images/orch.jpeg";
import Peonies from "../../Assets/Images/peon.jpeg";
import Dahlia from "../../Assets/Images/dhali.jpg";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     name: "Red Rose",
//     price: 250.0,
//     size: "Medium",
//     image: RedRose,
//   },
//   {
//     id: 2,
//     name: "White Rose",
//     price: 350.0,
//     size: "Medium",
//     image: WhiteRose,
//   },
//   {
//     id: 3,
//     name: "Carnation",
//     price: 150.0,
//     size: "Medium",
//     image: Carnation,
//   },
//   {
//     id: 4,
//     name: "Chrysanthemum",
//     price: 275.0,
//     size: "Large",
//     image: Chrysanthemum,
//   },
//   {
//     id: 5,
//     name: "Tulips",
//     price: 320.0,
//     size: "Medium",
//     image: Tulip,
//   },
//   {
//     id: 6,
//     name: "Peonies",
//     price: 200.0,
//     size: "Medium",
//     image: Peonies,
//   },
//   {
//     id: 7,
//     name: "Orchids",
//     price: 200.0,
//     size: "Medium",
//     image: Orchids,
//   },
//   {
//     id: 8,
//     name: "Dahlia",
//     price: 175.0,
//     size: "Medium",
//     image: Dahlia,
//   },
// ];
const FlowerCusScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsQty, setItemsQty] = useState([]);
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showQ, setShowQ] = useState(false);
  const [cardNo, setCardNo] = useState(0);
  const [cardHolder, setCardHolder] = useState();
  const [cardCvc, setCardCvc] = useState(0);
  const [cardMon, setCardMon] = useState(0);
  const [cardYer, setCardYer] = useState(0);
  const [qty, setQty] = useState(0);
  const [id, setId] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/item/").then((res) => {
      setData(res.data.filter((item) => item.type === "flower"));
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

  console.log("selectedItems : ", selectedItems);

  const calculateTotal = () => {
    selectedItems.forEach((element) => {
      let itmQty = itemsQty.filter(
        (flw) => parseInt(flw.id) === parseInt(element)
      );
      console.log("itmQty : ", itemsQty);
      total =
        total +
        parseFloat(
          data.filter((flowerItem) => flowerItem._id === parseInt(element))[0]
            .price
        );
    });
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

  const deleItmQty = (id) => {
    console.log("del id : ", id);
    console.log("qtys : ", itemsQty);
    setItemsQty((prevData) => {
      return [...prevData.filter((data) => parseInt(data.id) !== id)];
    });
    console.log("qtys d: ", itemsQty);
  };
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
                <img src={FlowerBoquet} width={100} height={100} />
                <br /> <br />
                <p>RS. {totalP}</p>
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
          <Modal.Title>Sample Boquet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img src={FlowerBoquet} width={300} height={300} />
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => buyNow()}>
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>

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
      <div className="container">
        <div className="topicTxt" style={{ marginTop: "2%" }}>
          <h2>Get your customized flower boquet here!!</h2>
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

export default FlowerCusScreen;
