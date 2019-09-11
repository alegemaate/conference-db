import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "../constants/routes";

import Header from "./header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            {routes.map(({ path, component, exact }) => (
              <Route
                key={path}
                exact={exact}
                path={path}
                component={component}
              />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}
