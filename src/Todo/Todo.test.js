import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Todo from "./Todo";

describe(Todo, () => {
  const description = "New Todo";
  const mockRemoveTodo = jest.fn();
  const component = shallow(
    <Todo
      description={description}
      removeTodo={mockRemoveTodo}
      critical={false}
      done={false}
      id={1}
    />
  );

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Todo />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders and matches our snapshot", () => {
    const component = renderer.create(<Todo description="Yo" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a Todo component", () => {
    expect(component.contains(<div className="Todo" />));
  });

  it("contains the description", () => {
    expect(component.text()).toContain(description);
  });

  it("marks the Todo as done", () => {
    component.find("Button.MarkDone").simulate("click");
    expect(component.state("done")).toEqual(true);
  });

  it("calls the mock remove function", () => {
    component.find("Button.RemoveTodo").simulate("click");
    expect(mockRemoveTodo).toHaveBeenCalled();
  });

  it("marks the Todo as critical", () => {
    expect(component.state("critical")).toEqual(false);
    component.find("Button.MarkCritical").simulate("click");
    expect(component.state("critical")).toEqual(true);
  });
});
