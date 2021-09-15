import GlobalStyle from "./components/GlobalStyle";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Trending from "./components/Trending";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Trending></Trending>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;