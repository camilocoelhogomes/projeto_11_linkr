import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import React from "react";
import LogIn from "./pages/home/sign-in/index";
import TimeLine from './pages/timeLine/TimeLine';
import MyPosts from './pages/myPosts/MyPosts';
import UserPosts from "./pages/userPosts/UserPosts";
import HashtagPosts from "./pages/hashtagPosts/HashtagPosts";
import LikedPosts from "./pages/likedPosts/LikedPosts";
import LinkPreview from "./components/LinkPreview";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <LinkPreview href={'https://onepieceex.net/'} />
      <Switch>
        <Route exact path="/" >
          <LogIn />
        </Route>
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

