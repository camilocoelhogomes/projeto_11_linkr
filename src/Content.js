import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/home/sign-up/index";
import LogIn from "./pages/home/sign-in/index";
import TimeLine from './pages/timeLine/TimeLine';
import MyPosts from './pages/myPosts/MyPosts';
import UserPosts from "./pages/userPosts/UserPosts";
import HashtagPosts from "./pages/hashtagPosts/HashtagPosts";
import LikedPosts from "./pages/likedPosts/LikedPosts";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Content () {

    const location = useLocation();

    return (
        <div className="fill-content">
          <TransitionGroup>
          <CSSTransition
            timeout={1000}
            classNames="fade"
            key={location.key}
          >
            <Switch location={location}>
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
          </CSSTransition>
          </TransitionGroup>
        </div>
    )
}

export default Content;