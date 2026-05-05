import api from "@/store/api";
import { toast } from "react-toastify";

export const taskSlice = (set, get) => ({
  tasks: [],
  task: {},

  taskList: async () => {
    const url = "public/tasks";
    try {
      const res = await api.get(url);
      const tasks = res.data;

      let option = get().option ||{};
      if(!option.task) {
        get().optionRetrieve("task");
        // option={...option,...{task:optionTask}}
        // set({option},undefined,"optionRetrieve");
      }
      
      set({ tasks });
    } catch (e) {
      toast.error(`<>${url} <br/>${e.message}`);
    }
  },
  taskRetrieve: async (id) => {
    const url = `public/tasks/${id}`;
    try {
      const res = await api.get(url);
      const task = res.data;
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

