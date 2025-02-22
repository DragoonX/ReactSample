import React, { Component } from "react"
import { ListGroup, ListGroupItem } from "reactstrap"

export default class CategoryList extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    this.getCategories()
  }
  //terminalde app klasörüne gelerek "json-server --watch db.json" yazıyoruz
  getCategories = () => {
    fetch("http://localhost:3000/categories") //bu linki çalıştırıyor verileri alıyor
      .then(response => response.json()) //sonra verileri döndürüp json a dönüştürüyor
      .then(data => this.setState({ categories: data })) //sonra aynı verileri state e atıyor.
  }

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map(category => (
            <ListGroupItem active={category.categoryName === this.props.currentCategory ? true : false} onClick={() => this.props.changeCategory(category)} key={category.id}>
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h3>{this.props.currentCategory}</h3> */}
      </div>
    )
  }
}
