import React from "react";
import "./Divider.scss";

function Divider() {
  return React.createElement(
    "div",
    { className: "Divider" },
    React.createElement("hr")
  );
}

export default Divider;
