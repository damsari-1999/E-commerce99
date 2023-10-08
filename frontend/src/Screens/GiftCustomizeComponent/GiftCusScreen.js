import React, { useEffect, useState } from "react";
import "./GiftCus.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GiftBox from "../../Assets/Images/Gift-Box_800x800.jpg";
import Earrings from "../../Assets/Images/earring.jpg";
import Teddy from "../../Assets/Images/teddy.jpg";
import Chocolate from "../../Assets/Images/canbery.jpg";
import Mug from "../../Assets/Images/mug.jpg";
import KeyChain from "../../Assets/Images/keychain.jpg";
import Tshirt from "../../Assets/Images/tshirts.jpg";
import Perfume from "../../Assets/Images/perfume.png";
import PhotoFrame from "../../Assets/Images/frames.jpg";
// import GiftBox from "../../Assets/Images/giftbox.jpg";
import { NumberBox } from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     name: "Earrings",
//     price: 550.0,
//     image: Earrings,
//   },
//   {
//     id: 2,
//     name: "Teddy Bear",
//     price: 2350.0,
//     image: Teddy,
//   },
//   {
//     id: 3,
//     name: "Chocolate (Cadbury Milk)",
//     price: 1250.0,
//     image: Chocolate,
//   },
//   {
//     id: 4,
//     name: "Mug",
//     price: 1275.0,
//     image: Mug,
//   },
//   {
//     id: 5,
//     name: "Key Chains",
//     price: 750.0,
//     image: KeyChain,
//   },
//   {
//     id: 6,
//     name: "T-Shirts",
//     price: 2000.0,
//     image: Tshirt,
//   },
//   {
//     id: 7,
//     name: "Perfumes",
//     price: 1700.0,
//     image: Perfume,
//   },
//   {
//     id: 8,
//     name: "Photo Frames",
//     price: 1000.0,
//     image: PhotoFrame,
//   },
// ];

const GiftCusScreen = () => {
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
      setData(res.data.filter((item) => item.type === "giftcus"));
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
      return [...prevData.filter((data) => parseInt(data.id) !== id)];
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
          data.filter((flowerItem) => flowerItem._id === parseInt(element))[0]
            .price
        );
    });
  };
  // calculateTotal();

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
                <img src={GiftBox} width={100} height={100} />
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
          <Modal.Title>Sample Gift Box Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img src={GiftBox} width={350} height={300} />
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
            Create your customized gift boxes for your special occasions!!
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

export default GiftCusScreen;
