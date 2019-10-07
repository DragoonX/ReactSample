import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class CardList extends Component {
  renderCard() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units in Stock</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.card.map(cardItem => (
            <tr key={cardItem.product.id}>
              <td>{cardItem.product.id}</td>
              <td>{cardItem.product.categoryId}</td>
              <td>{cardItem.product.productName}</td>
              <td>{cardItem.product.unitPrice}</td>
              <td>{cardItem.product.unitsInStock}</td>
              <td>{cardItem.quantity}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeFromCard(cardItem.product)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return <div>{this.renderCard()}</div>;
  }
}
