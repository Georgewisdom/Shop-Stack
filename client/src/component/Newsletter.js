import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Form, FormGroup, Input, Button } from "reactstrap";

class Newsletter extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",

          padding: "20px"
        }}
        className="bg-primary"
      >
        <Row>
          <Col>
            <Container>
              <h1
                className="text-center "
                style={{
                  fontSize: "1.4rem",
                  marginBottom: "20px"
                }}
              >
                GET NOTIFIED OF NEW STYLES INTO YOUR INBOX
              </h1>
              <Form
                inline
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                <FormGroup>
                  <Input
                    type="text"
                    style={{
                      width: "48em",
                      borderRadius: "10px 0 0 10px",
                      height: "49px"
                    }}
                  />
                  <Button
                    type="email"
                    style={{
                      borderRadius: "0 10px 10px 0",
                      height: "49px"
                    }}
                  >
                    Go
                  </Button>
                </FormGroup>
              </Form>
              <h5
                className="text-center"
                style={{
                  fontStyle: "italic",
                  marginTop: "12px",
                  color: "white"
                }}
              >
                YOUR EMAIL ADDRESS WILL NEVER BE SHARED
              </h5>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Newsletter;
