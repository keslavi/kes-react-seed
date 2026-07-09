import { isEmpty, isTruthy, isFalsy } from "@formhelper";

globalThis.isEmpty = isEmpty;
globalThis.isTruthy = isTruthy;
globalThis.isFalsy = isFalsy;
globalThis.isFalsey = (value) => !isTruthy(value);
