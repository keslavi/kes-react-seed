import { mockLoad } from "./mockLoad";
import { http } from "msw";

export const mswOption = [
  // GET all options - matches the component's call to "public/options"
  http.get('/api/public/options', async ({ request }) => {
    try {
      const options = await mockLoad('options');
      return Response.json(options);
    } catch (error) {
      console.error('[MSW] Error in options handler:', error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }),

  // GET options by key - matches the component's call to "public/options/:key"
  http.get('/api/public/options/:key', async ({ request, params }) => {
    try {
      const options = await mockLoad('options');
      const { key } = params;
      
      if (options) {
        return Response.json(options);
      } else {
        return Response.json(
          { error: `Options not found for key: ${key}` },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error('[MSW] Error in options by key handler:', error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
  })
];
