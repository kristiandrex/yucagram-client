import React from "react";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import Router from "components/Router/Router";
import store from "store";

const GlobalStyled = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  #root {
    position: relative;
  }

  .material-icons {
    vertical-align: middle !important;
  }

  .dropdown-menu {
    text-align: center !important;
  }

  .cursor {
    cursor: pointer;
  }

  .avatar img {
    border-radius: 50%;
  }
`;

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <GlobalStyled />
        <Router />
      </Provider>
    </HelmetProvider>
  );
}
