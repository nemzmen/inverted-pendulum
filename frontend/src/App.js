import React, { Component } from "react";
import HomePage from "./pages/HomePage";


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="absolute-center">
        <HomePage />
      </div>

    );
  }
}

