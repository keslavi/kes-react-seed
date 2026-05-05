import { isEmpty, isTruthy, isFalsy } from "../../../formhelper-mui-dist/formhelper-mui.js";

globalThis.isEmpty = isEmpty;
globalThis.isTruthy = isTruthy;
globalThis.isFalsy = isFalsy;
globalThis.isFalsey = (value) => !isTruthy(value);
