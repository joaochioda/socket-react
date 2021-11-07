import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Room from "./Room";
import { SocketContextProvider } from "./context/SocketContext";

import { Route, BrowserRouter, Switch } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <SocketContextProvider>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </SocketContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
