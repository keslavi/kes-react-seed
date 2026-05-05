import {lazy} from "react";

const ACTIVE = (import.meta.env.VITE_FORMHELPER_DEFAULT || "").trim().toLowerCase();

const modules = import.meta.glob("./forms/defaults-*.jsx");

const developerActive=ACTIVE ? `./forms/defaults-${ACTIVE}.jsx` : null;

const pick =(developerActive && modules[developerActive]) || modules['./forms/defaults--public.jsx'];

export const schemaDefault = lazy(() => pick().then(m=>({default:m.schemaDefault})));
export const optionDefault = lazy(() => pick().then(m=>({default:m.optionDefault})));
export const itemDefault = lazy(() => pick().then(m=>({default:m.itemDefault})));
export const ChildrenDefault = lazy(() => pick().then(m=>({default:m.ChildrenDefault || (()=><></>)})));
