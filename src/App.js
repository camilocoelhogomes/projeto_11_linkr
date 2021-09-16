import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import React from "react";
import TimeLine from './pages/timeLine';
import MyPosts from './pages/my-posts';
import UserPosts from './pages/user-posts';
import HashtagPosts from './pages/hashtag-posts';
import LikedPosts from './pages/liked-posts';

function App() {
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
        <Route exact path="/my-posts" >
          <MyPosts />
        </Route>
        <Route exact path="/user/:id" >
          <UserPosts />
        </Route>
        <Route exact path="/hashtag/:hashtag" >
          <HashtagPosts />
        </Route>
        <Route exact path="/my-likes" >
          <LikedPosts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

