import { mockLoad } from "./mockLoad";
import { http } from "msw";
import { createMswRequestSpy } from "./createMswRequestSpy";

// Create a spy to track handler calls
export const mswTaskSpy = createMswRequestSpy(['post']);

Object.defineProperties(mswTaskSpy, {
  postCalled: {
    get() {
      return this.called.post;
    },
  },
  postData: {
    get() {
      return this.data.post;
    },
  },
});

mswTaskSpy.waitForPost = () => mswTaskSpy.waitFor('post');

export const mswTask = [
  // GET all tasks (filter out ID 0) - matches the component's call to "public/tasks"
  http.get('/api/public/tasks', async ({ request }) => {
    try {
      const data = await mockLoad('task');
      const ret = data.filter(x => x.id !== 0);
      return Response.json(ret);
    } catch (error) {
      console.error('[MSW] Error in tasks handler:', error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }),

  // GET task by ID
  http.get('/api/public/tasks/:id', async ({ request, params }) => {
    try {
      const data = await mockLoad('task');
      const ret = data.find(x => x.id == params.id);
      return Response.json(ret);
    } catch (error) {
      console.error('[MSW] Error in task by ID handler:', error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }),

  // POST task (create/update/delete)
  http.post('/api/public/tasks', async ({ request }) => {
    try {
      const requestBody = await request.json();
      mswTaskSpy.capture('post', requestBody);
      
      const data = await mockLoad('task');
      
      if (requestBody.delete) {
        // Delete logic would go here
        return Response.json({ success: true, message: 'Task deleted' });
      } else if (requestBody.id) {
        // Update logic would go here
        return Response.json({ success: true, message: 'Task updated' });
      } else {
        // Create logic would go here
        return Response.json({ success: true, message: 'Task created' });
      }
    } catch (error) {
      console.error('[MSW] Error in task POST handler:', error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
  })
];