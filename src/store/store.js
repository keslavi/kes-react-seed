import { create } from "zustand";
import { devtools } from "zustand/middleware";

import api from "./slice/api-slice"; //http request counter
import error from "./slice/error-slice";
import option from "./slice/option-slice";
import task from "./slice/task-slice";

export const useStoreDirectly = create(devtools((...a) => ({
    ...api(...a),//http request counter
    ...error(...a),
    ...option(...a),
    ...task(...a),
  }))
);

//export const useStore=useStoreDangerously;

const createSelectors= _store=>{
  const store=_store;
  store.use={};
  for (const k of Object.keys(store.getState())){
    store.use[k]=()=>store(s=>s[k]);
  }
  return store;
}

export const store=createSelectors(useStoreDirectly);
export const useStore=store;
export default store;
