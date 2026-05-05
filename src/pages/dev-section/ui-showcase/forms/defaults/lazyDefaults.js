import { lazy } from "react";

const ACTIVE= (import.meta.env.vite_FORMHELPER_FORMHELPER_DEFAULT || "").trim().toLowerCase();

const modules= import.meta.glob('./defaults-*.jsx');

const developerActive=ACTIVE ? `./defaults-${ACTIVE}.jsx`: null;

const pick = developerActive && modules[developerActive] ? developerActive : './defaults--public.jsx';

export const schemaDefault=lazy(()=> modules[pick]().then(m=>({default:m.schemaDefault})));
export const optionDefault=lazy(()=> modules[pick]().then(m=>({default:m.optionDefault})));
export const itemDefault=lazy(()=> modules[pick]().then(m=>({default:m.itemDefault})));
export const ChildrenDefault=lazy(()=> modules[pick]().then(m=>({default:m.ChildrenDefault})));
