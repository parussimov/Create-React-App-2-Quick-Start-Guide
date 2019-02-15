import React, { Component } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import "./NewTodo.css";

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { item: "" };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }
  addTodo() {
    this.props.addTodo(this.state.item);
    this.setState({ item: "" });
  }
  handleUpdate(event) {
    this.setState({ item: event.target.value });
  }
  render() {
    return (
      <div className="NewTodo">
        <InputGroup>
          <Input
            type="text"
            onChange={this.handleUpdate}
            value={this.state.item}
            placeholder="Input item name here..."
          />
          <Button onClick={this.addTodo} color="primary">
            Add
          </Button>
        </InputGroup>
      </div>
    );
  }
}

export default NewTodo;
