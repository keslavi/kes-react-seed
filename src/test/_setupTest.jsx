import {
  act,
  fireEvent,
  render as originalRender,
  screen,
  waitFor,
  within
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { isEmpty } from "lodash";
import { isTruthy, isFalsy } from "../helpers/is-truthy";
import { setupServer } from 'msw/node';
import { mswAll } from './msw/mswAll';
import { vi } from 'vitest';
import { createMswRequestSpy } from './msw/createMswRequestSpy';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Load global extensions as mentioned in prompt.md
import '../helpers/extensions/global-extensions.js';

global.act = act;
global.fireEvent = fireEvent;
global.screen = screen;
global.userEvent = userEvent;
global.waitFor = waitFor;
global.within = within;
global.isEmpty = isEmpty;
global.isTruthy = isTruthy;
global.isFalsy = isFalsy;
global.isFalsey = (value) => !isTruthy(value);
global.vi = vi;
global.createMswRequestSpy = createMswRequestSpy;
globalThis.createMswRequestSpy = createMswRequestSpy;

if (typeof globalThis.ProgressEvent === 'undefined') {
  class ProgressEventPolyfill extends Event {
    constructor(type, eventInitDict = {}) {
      super(type, eventInitDict);
      this.lengthComputable = Boolean(eventInitDict.lengthComputable);
      this.loaded = Number(eventInitDict.loaded || 0);
      this.total = Number(eventInitDict.total || 0);
    }
  }

  globalThis.ProgressEvent = ProgressEventPolyfill;
  global.ProgressEvent = ProgressEventPolyfill;
}

// Set up MSW server for API mocking
const server = setupServer(...mswAll);

beforeAll(() => {
  // Start MSW server with error handling for unhandled requests
  server.listen({
    onUnhandledRequest: 'error',
    // Ensure MSW intercepts requests properly
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  });
  //console.log('[MSW] Server started with handlers:', mswAll.length);
});

afterAll(() => {
  server.close();
  //console.log('[MSW] Server closed');
});

afterEach(() => {
  server.resetHandlers();
  //console.log('[MSW] Handlers reset');
});

//import "@testing-library/user-event"; //maybe add here? 

/*
 vitest setup outlined here: https://www.youtube.com/watch?v=G-4zgIPsjkU

add this do package.scripts or run: 

"installTesting": "npm install -D vitest vitest/ui jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event"

--------------------------------------
add to vite config.js
/// <reference types="vitest" />
/// <reference types="vite/client" />

//you can create a separate config file for vitest, but this is recommended. 
import { defineConfig } from "vitest/config"; !important

...

export default defineConfig({
  test: {
    globals:true,
    environment:"jsdom",
    setupFiles: './src/test/_setupTest.js',
    css: true
  },

  ---------------------------------------


*/



import { afterEach } from "vitest";
//import { cleanup } from "@testing-library/react";

afterEach(() => {
  //cleanup(); //it's called automaticaly since v9
})