import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      
      <BrowserRouter>
      <Switch>
            <Route exact path='/'>
              <Header />
              <h1>Camilo</h1>
      <h2>Camilo</h2>
      <h3>Camilo</h3>
      <p>Camilo</p>
            </Route>
            <Route exact path='/my-posts'>
              <Header />
              oii
            </Route>
      </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
