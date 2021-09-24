import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import LinkContext from "./store/LinkContext";
import LinkPreview from "./components/LinkPreview";
import TransitionStyle from "./TransitionStyle";
import AppRoutes from "./AppRoutes";

function App() {
  const [previewHref, setPreviewHref] = useState('');
  const [showIframe, setShowIframe] = useState(false);

  return (
    <LinkContext.Provider value={{ previewHref, setPreviewHref, showIframe, setShowIframe }}>
      <Router>
        <GlobalStyle />
        <TransitionStyle />
        {
            showIframe ?
              <LinkPreview /> :
              <></>
          }
        <AppRoutes />
      </Router>
    </LinkContext.Provider>
  );
}

export default App;

