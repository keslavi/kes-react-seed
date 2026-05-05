import ReactDOM from "react-dom/client";
// JSX Runtime fallback for compatibility
import "./jsx-runtime-fallback.js";
//import App from "./app"; //loaded in router
import Router from "./router";
//import { useStore } from "./store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@/components/spinner";
import "./scss/index.scss";
import { ThemeProvider } from "./theme-material";

import "./helpers/extensions/console-extension";
import "./helpers/extensions/global-extensions";
import "./helpers/extensions/env-extension.js";

//main should copy to ./trg/../src-unedited
//console.logGroup.test(); //works in any *.js, *.jsx file/*

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <>
      {/* <React.StrictMode> */}
      <Spinner />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Provider store={useStore}> */}
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      {/* </Provider> */}
      {/* </React.StrictMode> */}
    </>
  );
};

const bootstrap = async () => {
  try {
    // Load MSW browser setup (it handles conditional logic internally)
    await import('./test/msw/mswBrowser.js');
    //console.log(["all"], "[MSW] Successfully imported mswBrowser.js");
  } catch (error) {
    console.error("[MSW] Failed to load browser MSW:", error);
  } finally {
    renderApp();
  }
};

bootstrap();
