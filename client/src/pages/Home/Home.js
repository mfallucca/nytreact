import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import SearchForm from "../../components/Form";
import { SavedList, SavedListItem  } from "../../components/Saved";
import { SearchList, SearchListItem  } from "../../components/Search";

class Home extends Component {
    state = {
      search: "",
      startDate: "",
      endDate: "",
      results: []
    };

    handleInputChangeQuery = event => {
      this.setState({ search: event.target.value });
    };
  
    handleInputChangeStart = event => {
      this.setState({ startDate: event.target.value });
    };
  
    handleInputChangeEnd = event => {
      this.setState({ endDate: event.target.value });
    };
  

    handleFormSubmit = event => {
      event.preventDefault();
      API.nytQuery(this.state.search, this.state.startDate, this.state.endDate)
        .then(res => {
          console.log(res);
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
          this.setState({ results: res.data.message, error: "" });
        })
        .catch(err => this.setState({ error: err.message }));
    };

render() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col size="col-sm-6 offset-sm-3">
            <Jumbotron>
              <SearchForm 
                handleFormSubmit={this.handleFormSubmit}
                handleInputChangeQuery={this.handleInputChangeQuery}
                handleInputChangeStart={this.handleInputChangeStart}
                handleInputChangeEnd={this.handleInputChangeEnd}
              />
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
