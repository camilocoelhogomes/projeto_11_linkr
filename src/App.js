import GlobalStyle from "./components/GlobalStyle";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Trending from "./components/Trending";
import Likes from "./components/Likes";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {


  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);

  const login = () => axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in`, {
    "email": "mafra@pedro.com",
    "password": "12",
  })
 
  useEffect(() => {
    login().then(ans => {
        setUserInfo(ans.data);
  })
  },[]) 

  if (userInfo === null) {
    return(
        <>
        </>
    )
}

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Trending></Trending>
            <Likes userInfo={userInfo}></Likes>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;