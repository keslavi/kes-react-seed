import {
  act,
  fireEvent,
  render,
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
import { clearMockLoadCache } from './msw/mockLoad';

// Load global extensions as mentioned in prompt.md
import '../helpers/extensions/global-extensions.js';

global.act = act;
global.fireEvent = fireEvent;
global.render = render;
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

const routerState = {
  navigateDefault: vi.fn(),
  navigateQueue: [],
  paramsDefault: {},
  paramsQueue: []
};

const useNavigateMock = vi.fn(() => {
  if (routerState.navigateQueue.length > 0) {
    return routerState.navigateQueue.shift();
  }

  return routerState.navigateDefault;
});

const useParamsMock = vi.fn(() => {
  if (routerState.paramsQueue.length > 0) {
    return routerState.paramsQueue.shift();
  }

  return routerState.paramsDefault;
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: useNavigateMock,
    useParams: useParamsMock
  };
});

/**
 * @typedef {Object} RouterTestApi
 * @property {(input?: { navigate?: import('vitest').Mock, params?: Record<string, any> }) => { navigate: import('vitest').Mock, params: Record<string, any> }} set
 * Set default navigate mock and/or params returned by hooks.
 * @property {(input?: { navigate?: import('vitest').Mock[], params?: Record<string, any>[] }) => void} que
 * Queue call-by-call values for useNavigate and useParams.
 * @property {() => void} reset
 * Reset all router mock state to clean defaults.
 * @property {(mockNavigate?: import('vitest').Mock) => import('vitest').Mock}
 * Get the current navigate mock, or replace it and return it.
 */

/** @type {RouterTestApi} */
const ROUTER = {
  set(input = {}) {
    const { navigate, params } = input;

    if (navigate) {
      routerState.navigateDefault = navigate;
    }

    if (params) {
      routerState.paramsDefault = params;
    }

    global.mockNavigate = routerState.navigateDefault;
    globalThis.mockNavigate = routerState.navigateDefault;

    return {
      navigate: routerState.navigateDefault,
      params: routerState.paramsDefault
    };
  },

  que(input = {}) {
    const { navigate = [], params = [] } = input;

    if (navigate.length > 0) {
      routerState.navigateQueue = [...navigate];
    }

    if (params.length > 0) {
      routerState.paramsQueue = [...params];
    }
  },

  reset() {
    routerState.navigateDefault = vi.fn();
    routerState.navigateQueue = [];
    routerState.paramsDefault = {};
    routerState.paramsQueue = [];

    useNavigateMock.mockClear();
    useParamsMock.mockClear();

    global.mockNavigate = routerState.navigateDefault;
    globalThis.mockNavigate = routerState.navigateDefault;
  },

  navigate(mockNavigate) {
    if (mockNavigate) {
      routerState.navigateDefault = mockNavigate;
      global.mockNavigate = routerState.navigateDefault;
      globalThis.mockNavigate = routerState.navigateDefault;
    }

    return routerState.navigateDefault;
  }
};

ROUTER.reset();

global.ROUTER = ROUTER;
globalThis.ROUTER = ROUTER;

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
  clearMockLoadCache();
  ROUTER.reset();
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

afterEach(()=>{
    //cleanup(); //it's called automaticaly since v9
})