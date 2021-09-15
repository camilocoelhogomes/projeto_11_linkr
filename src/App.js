import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up";


function App() {
  return (
    <Router>
      <Switch>
        <GlobalStyle />
        <Route exat path="/sign-up" >
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
