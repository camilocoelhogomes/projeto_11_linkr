import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import React, { useState, useEffect } from "react";
import LogIn from "./pages/home/sign-in/index";
import TimeLine from './pages/timeLine/TimeLine';
import MyPosts from './pages/myPosts/MyPosts';
import UserPosts from "./pages/userPosts/UserPosts";
import HashtagPosts from "./pages/hashtagPosts/HashtagPosts";
import LikedPosts from "./pages/likedPosts/LikedPosts";
import LinkContext from "./store/LinkContext";
import LocationPreview from "./components/LocationPreview";
import LinkPreview from "./components/LinkPreview";
import TransitionStyle from "./components/TransitionStyle";
import AppRoutes from "./AppRoutes";
import styled from 'styled-components';

function App() {
  const [previewHref, setPreviewHref] = useState('');
  const [showIframe, setShowIframe] = useState(false);
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => { window.scrollTo(0, scrollY); }, [location, showIframe]);

  return (
    <Main showIframe={showIframe} location={location} scrollY={scrollY}>
      <LinkContext.Provider value={{ previewHref, setPreviewHref, showIframe, setShowIframe, location, setLocation, userLocation, setUserLocation, scrollY, setScrollY }}>
        <Router>
          <GlobalStyle />
          {
            showIframe ?
              <LinkPreview /> :
              location ?
                <LocationPreview /> :
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
    </Main>
  );
}

export default App;

const Main = styled.div`
  overflow-y: ${({ showIframe, location }) => (showIframe || location) ? 'hidden' : 'initial'};
  height: ${({ showIframe, location }) => (showIframe || location) ? '100vh' : 'initial'};
  position: ${({ showIframe, location }) => (showIframe || location) ? 'fixed' : 'initial'};
  top: ${({ showIframe, location, scrollY }) => (showIframe || location) ? `-${scrollY}px` : 'initial'};
`
