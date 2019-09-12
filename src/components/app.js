import React from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "../constants/routes";

import Header from "./header";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          {routes.map(({ path, component, exact }) => (
            <Route key={path} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </main>
    </div>
  );
}
