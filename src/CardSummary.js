import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from "reactstrap";

export default class CardSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Card - {this.props.card.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.card.map(cardItem => (
            <DropdownItem key={cardItem.product.id}>
              <Badge
                color="danger"
                onClick={() => this.props.removeFromCard(cardItem.product)}
              >
                X
              </Badge>
              {cardItem.product.productName + " "}
              <Badge color="success">{cardItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <Link to="card">Go To Card !!!</Link> {/* card route una git */}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmptyCard() {
    return (
      <NavItem>
        <NavLink>Empty Card</NavLink>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        {this.props.card.length > 0
          ? this.renderSummary()
          : this.renderEmptyCard()}
      </div>
    );
  }
}
