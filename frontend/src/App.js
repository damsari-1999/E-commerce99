import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationBar";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Register from "./Screens/RegisterComponent/Register";
import LoginComponent from "./Screens/LoginComonent/LoginComponent";
import FlowerScreen from "./Screens/FlowerScreenComponent/FlowerScreen";
import GiftItemsScreen from "./Screens/GiftItemsScreenComponent/GiftItemsScreen";
import CakeScreen from "./Screens/CakeScreenComponent/CakeScreen";
import EventDecoScreen from "./Screens/EventDecorationScreenComponent/EventDecoScreen";
import FlowerCusScreen from "./Screens/FlowerCustomizeComponent/FlowerCusScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import CakeCusScreen from "./Screens/CakeCustomizeComponent/CakeCusScreen";
import GiftCusScreen from "./Screens/GiftCustomizeComponent/GiftCusScreen";
import EventCusScreen from "./Screens/EventCustomizeComponent/EventCusScreen";
import CartScreen from "./Screens/CartComponent/CartScreen";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/flower" element={<FlowerScreen />} />
        <Route path="/gifts" element={<GiftItemsScreen />} />
        <Route path="/cakes" element={<CakeScreen />} />
        <Route path="/eventdeco" element={<EventDecoScreen />} />
        <Route path="/flowercus" element={<FlowerCusScreen />} />
        <Route path="/cakecus" element={<CakeCusScreen />} />
        <Route path="/giftcus" element={<GiftCusScreen />} />
        <Route path="/eventcus" element={<EventCusScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
