import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router, useHistory} from "react-router-dom";
import React, { useState, useEffect } from "react";
import LinkContext from "./store/LinkContext";
import LocationPreview from "./components/LocationPreview";
import LinkPreview from "./components/LinkPreview";
import AppRoutes from "./AppRoutes";
import styled from 'styled-components';
import TransitionStyle from "./components/TransitionStyle";

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
          <TransitionStyle />
          {
            showIframe ?
              <LinkPreview /> :
              location ?
                <LocationPreview /> :
                <></>
          }
          <AppRoutes />
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