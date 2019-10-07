import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

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
  };

  removeFromCard = product => {
    let newCard = this.state.card.filter(c => c.product.id !== product.id);
    this.setState({ card: newCard });
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
              <ProductList
                products={this.state.products}
                addToCard={this.addToCard}
                info={productInfo}
                currentCategory={this.state.currentCategory}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
