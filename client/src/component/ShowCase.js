import React, { Component } from "react";
import "./style.css";
import { Button } from "reactstrap";
class Showcase extends Component {
  render() {
    return (
      <div
        className="img"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-reapeat",
          height: "93vh",
          backgroundPosition: "center",
          boxSizing: "border-box"
        }}
      >
        <div className="show ">
          <h3>ShoeStack Promo Here Again</h3>
          <h1 className="" color="primary">
            Buy Affordable Shows Easily & Cheaper
          </h1>
          <h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            ad distinctio dolorum.
          </h3>
          <div className="">
            <Button color="primary" className="btn-lg btn-outline-primary">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Showcase;
