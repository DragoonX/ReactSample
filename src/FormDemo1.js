import React, { Component } from "react";

export default class FormDemo1 extends Component {
  state = {
    username: ""
  };

  onChangeHandler = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <h3>Username</h3>
          <input type="text" onChange={this.onChangeHandler}></input>
          <h3>Username is : {this.state.username}</h3>
        </form>
      </div>
    );
  }
}
