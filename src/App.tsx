import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TasksView from "./views/tasks.view";
import LoginView from "./views/login.view";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TasksView />
        </Route>
        <Route path="/login">
          <LoginView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
