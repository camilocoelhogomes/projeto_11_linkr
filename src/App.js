import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import React, { useState } from "react";
import LogIn from "./pages/home/sign-in/index";
import TimeLine from './pages/timeLine/TimeLine';
import MyPosts from './pages/myPosts/MyPosts';
import UserPosts from "./pages/userPosts/UserPosts";
import HashtagPosts from "./pages/hashtagPosts/HashtagPosts";
import LikedPosts from "./pages/likedPosts/LikedPosts";
import LinkPreview from "./components/LinkPreview";
import LinkContext from "./store/LinkContext";
function App() {
  const [previewHref, setPreviewHref] = useState('');
  const [showIframe, setShowIframe] = useState(false);

  return (
    <LinkContext.Provider value={{ previewHref, setPreviewHref, showIframe, setShowIframe }}>
      <Router>
        <GlobalStyle />
        {
          showIframe ?
            <LinkPreview /> :
            <></>
        }
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
    </LinkContext.Provider>
  );
}

export default App;

