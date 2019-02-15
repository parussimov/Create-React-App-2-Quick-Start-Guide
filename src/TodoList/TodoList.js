import React, { Fragment, Component } from "react";
import Todo from "../Todo/Todo";
import "./TodoList.css";

import NewTodo from "../NewTodo";
import Divider from "../Divider";

import { fetchTodos, createTodo, deleteTodo } from "../TodoService";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loaded: false
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }
  async componentDidMount() {
    const { todos } = await fetchTodos();
    this.setState({ items: todos, loaded: true });
  }
  async addTodo(description) {
    const { status } = await createTodo(description);
    if (status === 200) {
      const newItem = {
        id: this.state.items.length + 1,
        description: description,
        done: false,
        critical: false
      };
      this.setState({
        items: [...this.state.items, newItem]
      });
    }
  }
  async removeTodo(todoId) {
    const { status } = await deleteTodo(todoId);
    if (status === 200) {
      const filteredItems = this.state.items.filter(todo => {
        return todo.id !== todoId;
      });
      this.setState({ items: filteredItems });
    }
  }
  renderItems() {
    if (this.state.loaded) {
      return this.state.items.map(todo => (
        <Fragment key={"item-" + todo.description}>
          <Todo
            id={todo.id}
            key={todo.id}
            description={todo.description}
            removeTodo={this.removeTodo}
            done={todo.done}
            critical={todo.critical}
          />
          <Divider key={"divide-" + todo.description} />
        </Fragment>
      ));
    } else {
      return <p>Still Loading...</p>;
    }
  }
  render() {
    return (
      <div className="TodoList">
        <NewTodo addTodo={this.addTodo} />
        {this.renderItems()}
      </div>
    );
  }
}

export default TodoList;
