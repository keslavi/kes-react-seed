import api from "@/store/api";
import { toast } from "react-toastify";
import { mockLoad } from "@/test/msw/mockLoad";


export const taskSlice = (set, get) => ({
  tasks: [],
  task: {},

  taskList: async () => {
    const url = "public/tasks";
    try {
      /*const tasks = (await api.get(url)).data; //usual code*/
      const tasks = (await apiGet(url)).data; //DO NOT COPY THIS CODE INTO OTHER SLICES
      
      let option = get().option ||{};
      if(!option.task) {
        get().optionRetrieve("task");
      }
      
      set({ tasks }, undefined, url);
    } catch (e) {
      toast.error(`<>${url} <br/>${e.message}`);
    }
  },
  taskRetrieve: async (id) => {
    const url = `public/tasks/${id}`;
    try {
      /*const task = (await api.get(url)).data; //usual code*/
      const task = (await apiGet(url, id)).data; //DO NOT COPY THIS CODE INTO OTHER SLICES
      set({ task }, undefined, url);
      
      let option = get().option ||{};
      if(!option.task) {
        get().optionRetrieve("task");
      }

    } catch (e) {
      toast.error(`<>${url} <br/>${e.message}`);
    }
  },
  taskUpsert: async (kvp) => {
    const url = "public/tasks";
    try {
      let res = await api.post(url, kvp);
      const task = res.data;
      set({ task }, undefined, `${url}Upsert`);
    } catch (e) {
      toast.error(`<>${url} error<br/>${e.message}</>`);
    }
  },
  taskDelete: async (id) => {
    const url = "public/tasks";
    const kvp = { id, delete: true };
    try {
      let res = await api.post(url, kvp);
      if (res.data.deleted) {
        set({ task:{} }, undefined, `${url}Delete`);
      } else {
        toast.error ("something went wrong, item not deleted in api");
      }
    } catch (e) {
      toast.error(`<>${url} Delete ${id} error<br/>${e.message}</>`);
    }
  },
});

export default taskSlice;


/*
  NOT PART OF USUAL TEMPLATE, DO NOT COPY THIS CODE INTO OTHER SLICES
  if api call fails, try to load from mock data
*/
const apiGet = async (url, id = null) => {
  let raw;

  try {
    raw = (await api.get(url, { suppressHttpError: true })).data;
  } catch (apiError) {
    try {
      raw = await mockLoad("task");
    } catch {
      throw apiError;
    }
  }

  const data = id != null
    ? (Array.isArray(raw) ? raw.find((x) => x.id == id) : raw)
    : (Array.isArray(raw) ? raw.filter((x) => x.id !== 0) : raw);

  return { data };
};