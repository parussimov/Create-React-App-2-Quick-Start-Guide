import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

import "./App.css";
import TodoList from "../TodoList";

const headerTitle = "Todoifier";

const headerDisplay = title => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="/">{title}</NavbarBrand>
  </Navbar>
);

const App = () => (
  <div className="App">
    {headerDisplay(headerTitle)}
    <br />
    <TodoList />
  </div>
);

export default App;
