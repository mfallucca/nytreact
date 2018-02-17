import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Input, FormBtn } from "../../components/Form";
import { SavedList, SavedListItem  } from "../../components/Saved";
import { SearchList, SearchListItem  } from "../../components/Search";

class Home extends Component {
    state = {
      results: []
    };

render() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col size="col-sm-6 offset-sm-3">
            <Jumbotron>
              <Input id="query" />
              <Input id="startDate"/>
              <Input id="endDate"/>
              <FormBtn>
                Submit
              </FormBtn>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col size="col-sm-6 offset-sm-3">
            <Jumbotron>
              <SearchList />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col size="col-sm-6 offset-sm-3">
            <Jumbotron>
              <SavedList />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
}

export default Home;
