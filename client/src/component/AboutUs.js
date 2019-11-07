import React from "react";
import { Container, Row, Col } from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <Container>
        <Row
          style={{
            marginBottom: "20px"
          }}
        >
          <Col sm="9" xs="12">
            <h1>About Us</h1>
            <h3>ShoeStack Inc.,</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatum illo temporibus doloremque commodi natus quas nulla non
              obcaecati maxime! Assumenda? Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Neque ipsum dignissimos atque non!
              Quis accusantium repudiandae ratione distinctio voluptate iure.
            </p>
          </Col>
          <Col sm="3" xs="12">
            <img
              src="https://source.unsplash.com/255x180/?company"
              alt=""
              srcset=""
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
