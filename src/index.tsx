import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { css, Global } from "@emotion/react";

import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Global styles={globalStyles} />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
