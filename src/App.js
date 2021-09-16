import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import React from "react";

function App() {
  return (
    <Router>
        <GlobalStyle />
      <Switch>
        <Route exact path="/sign-up" >
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
