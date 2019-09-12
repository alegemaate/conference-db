import React, { Component } from "react";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";

import "../stylesheets/nav.css";

export default class App extends Component {
  render() {
    return (
      <header>
        <h1 className="title-1">Conference</h1>
        <h1 className="title-2">Database</h1>
        <div className="triangle" />
        <nav>
          <ul>
            {routes
              .filter(({ inNav }) => inNav)
              .map(({ path, name, inNav }) => (
                <li key={path}>
                  <Link to={path}>{name}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </header>
    );
  }
}
