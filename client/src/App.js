import React, { Component } from "react";
import AppNavbar from "./component/AppNavbar";
import ShowCase from "./component/ShowCase";
import Newsletter from "./component/Newsletter";
import Shop from "./component/Shop";
import About from "./component/AboutUs";
import Footer from "./component/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <ShowCase />
        <Newsletter />
        <Shop />
        <About />
        <Footer />
      </div>
    );
  }
}

export default App;
