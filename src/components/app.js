import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../constants/routes";

import Header from "./header";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {routes.map(({ path, View, exact }) => (
            <Route key={path} exact={exact} path={path} element={<View />} />
          ))}
        </Routes>
      </main>
    </>
  );
}
