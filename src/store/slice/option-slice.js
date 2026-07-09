import api from "@/store/api";
import { toast } from "react-toastify";
import { mockLoad } from "@/test/msw/mockLoad";

export const optionSlice = (set, get) => ({
  option: {},

  optionList: async () => {
    const url = "public/options";
    try {
      let option = get().option;
      /*option = { ...option, ...(await api.get(url)).data }; //usual code*/
      option = { ...option, ...(await apiGet(url)).data }; //DO NOT COPY THIS CODE INTO OTHER SLICES
      set({ option }, undefined, url);
    } catch (e) {
      toast.error(`<>${url} error<br/>${e.message}</>`);
    }
  },
  optionRetrieve: async (id) => {
    const url = `public/options/${id}`;
    try {
      let option = get().option;
      if (!option.hasOwnProperty(id)) {
        /*option = { ...option, ...(await api.get(url)).data }; //usual code*/
        option = { ...option, ...(await apiGet(url)).data }; //DO NOT COPY THIS CODE INTO OTHER SLICES
        set({ option }, undefined, url);
      }
    } catch (e) {
      toast.error(`<>${url} error<br/>${e.message}</>`);
    }
  },
});

export default optionSlice;


/*
  NOT PART OF USUAL TEMPLATE, DO NOT COPY THIS CODE INTO OTHER SLICES
  if api call fails, try to load from mock data
*/
const apiGet = async (url) => {
  let raw;

  try {
    raw = (await api.get(url, { suppressHttpError: true })).data;
  } catch (apiError) {
    try {
      raw = await mockLoad("options");
    } catch {
      throw apiError;
    }
  }

  return { data: raw };
};
