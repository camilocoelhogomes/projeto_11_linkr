import GlobalStyle from "./components/GlobalStyle";
import Trending from "./components/Trending";
import Likes from "./components/Likes";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import React from "react";
import TimeLine from './pages/timeLine';

function App() {

  //apagar essas funções e variáveis e trocar pela já criada pelo Leo
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
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/sign-up" >
          <SignUp />
        </Route>
        <Route exact path="/timeline" >
          <TimeLine />
        </Route>
        <Route path="/">
            <Trending userInfo={userInfo}></Trending>
            <Likes userInfo={userInfo}></Likes>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;