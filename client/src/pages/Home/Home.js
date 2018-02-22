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
      API.runQuery(this.state.search, this.state.startDate, this.state.endDate)
        .then(res => {
          console.log(res)
          // if (res.data.status === "error") {
          //   throw new Error(res.data.message);
          // }
          let limitResults = [];
          for(var i=0; i<5 ; i++){
            if(res.docs[i].headline.main && res.docs[i].pub_date && res.docs[i].web_url) {
              limitResults.push({
                "_id" : res.docs[i]._id,
                "title" : res.docs[i].headline.main,
                "date" : res.docs[i].pub_date,
                "url": res.docs[i].web_url
              });
              console.log(limitResults)
            }
          }
          this.setState({ results: limitResults, error: "" });
          console.log(this.state.results)
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
              {this.state.results.length ? (
                <SearchList>
                  {this.state.results.map(article => (
                    <SearchListItem key={article._id}>
                      <a href={article.url}>
                        <strong>
                          {article.title}
                        </strong>
                      </a>
                    </SearchListItem>
                  ))}
                </SearchList>
            ) : (
              <h3>No Results to Display</h3>
            )}
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
