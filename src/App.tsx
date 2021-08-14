import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tasks from "./views/tasks";
import Login from "./views/login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Tasks />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
