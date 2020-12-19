import React from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Nav } from "reactstrap"
import { Link } from "react-router-dom"
import CardSummary from "./CardSummary"

export default class Navi extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/form1">Form Demo 1</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <CardSummary card={this.props.card} removeFromCard={this.props.removeFromCard} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
