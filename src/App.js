import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CardList from "./CardList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    card: []
  };

  changeCategory = cat => {
    this.setState({ currentCategory: cat.categoryName });
    this.getProducts(cat.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url) //bu linki çalıştırıyor verileri alıyor
      .then(response => response.json()) //sonra verileri döndürüp json a dönüştürüyor
      .then(data => this.setState({ products: data })); //sonra aynı verileri state e atıyor.
  };

  addToCard = product => {
    let newCard = this.state.card;
    var addedItem = newCard.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else newCard.push({ product: product, quantity: 1 });
    this.setState({ card: newCard });
    alertify.success(product.productName + " added to card", 2); //ürün eklenirse bildirim oluşumu buradan yapılır.
  };

  removeFromCard = product => {
    let newCard = this.state.card.filter(c => c.product.id !== product.id);
    this.setState({ card: newCard });
    alertify.error(product.productName + " removed from card", 2);
  };

  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi card={this.state.card} removeFromCard={this.removeFromCard} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ProductList
                      {...props} //propsların bir kopyasını alıp gönder.
                      products={this.state.products}
                      addToCard={this.addToCard}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/card"
                  render={props => (
                    <CardList
                      {...props} //propsların bir kopyasını alıp gönder.
                      card={this.state.card}
                      removeFromCard={this.removeFromCard}
                    />
                  )}
                />
                <Route path="/form1" component={FormDemo1}></Route>
                <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
