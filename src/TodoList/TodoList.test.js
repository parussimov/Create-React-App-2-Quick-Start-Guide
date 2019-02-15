import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import TodoList from "./TodoList";
import NewTodo from "../NewTodo";
import Todo from "../Todo";

jest.mock("../TodoService", () => ({
  fetchTodos: jest.fn().mockReturnValue({ status: 200, todos: [] }),
  createTodo: jest.fn().mockReturnValue({ status: 200, todos: [] }),
  deleteTodo: jest.fn().mockReturnValue({ status: 200, todos: [] })
}));

describe(TodoList, () => {
  const component = shallow(<TodoList />);

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TodoList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders and matches our snapshot", () => {
    const component = renderer.create(<TodoList />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a TodoList component", () => {
    expect(component.contains(<div className="TodoList" />));
  });

  it("includes a NewTodo component", () => {
    expect(component.find(NewTodo)).toHaveLength(1);
  });

  it("renders the correct number of Todo components", () => {
    const todoCount = component.state("items").length;
    expect(component.find(Todo)).toHaveLength(todoCount);
  });

  it("adds another Todo when the addTodo function is called", async () => {
    const before = component.find(Todo).length;
    await component.instance().addTodo("New Item");
    component.update();
    const after = component.find(Todo).length;
    expect(after).toBeGreaterThan(before);
  });

  it("removes a Todo from the list when the remove Todo function is called", async () => {
    const before = component.find(Todo).length;
    const removeMe = component.state("items")[0];
    await component.instance().removeTodo(removeMe.id);
    component.update();
    const after = component.find(Todo).length;
    expect(after).toBeLessThan(before);
  });
});
