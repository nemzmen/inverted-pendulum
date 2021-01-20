import React, { Component } from "react";
import MainView from "./MainView";


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <MainView />
      </div>
    );
  }
}

