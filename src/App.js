import GlobalStyle from "./components/GlobalStyle";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Trending from "./components/Trending";
import Likes from "./components/Likes";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Trending></Trending>
            <Likes></Likes>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;