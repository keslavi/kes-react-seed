import { http } from 'msw';
import { mockLoad } from './mockLoad';

const METHODS = {
  GET: http.get,
  POST: http.post,
  PUT: http.put,
  PATCH: http.patch,
  DELETE: http.delete,
};

const asArray = (value) => (Array.isArray(value) ? value : []);

const defaultModes = {
  list: async ({ data, endpoint }) => {
    const list = asArray(data);
    const filtered = typeof endpoint.filter === 'function' ? list.filter((item) => endpoint.filter(item)) : list;
    return Response.json(filtered);
  },

  byId: async ({ data, params, endpoint }) => {
    const idParam = endpoint.idParam || 'id';
    const list = asArray(data);
    const idValue = params?.[idParam];
    const item = list.find((entry) => String(entry?.id) === String(idValue));

    if (!item) {
      return Response.json({ error: `Not found for ${idParam}: ${idValue}` }, { status: 404 });
    }

    return Response.json(item);
  },

  passthrough: async ({ data }) => Response.json(data),

  upsert: async ({ request, data, endpoint }) => {
    const requestBody = await request.json();

    if (typeof endpoint.capture === 'function') {
      endpoint.capture(requestBody);
    }

    if (typeof endpoint.upsertResolver === 'function') {
      const customResult = await endpoint.upsertResolver({ requestBody, data });
      return Response.json(customResult);
    }

    if (requestBody?.delete) {
      return Response.json({ success: true, message: 'Deleted' });
    }

    if (requestBody?.id) {
      return Response.json({ success: true, message: 'Updated' });
    }

    return Response.json({ success: true, message: 'Created' });
  },
};

const toEndpointKey = (endpoint) => `${endpoint.method} ${endpoint.path}`;

const resolveMode = async (context) => {
  const { endpoint } = context;

  if (typeof endpoint.resolver === 'function') {
    return endpoint.resolver(context);
  }

  const modeHandler = defaultModes[endpoint.mode || 'passthrough'];
  if (!modeHandler) {
    throw new Error(`Unsupported endpoint mode: ${endpoint.mode}`);
  }

  return modeHandler(context);
};

export const createMswResourceHandlers = ({
  resource,
  endpoints,
  overrides = {},
}) => {
  return endpoints.map((endpoint) => {
    const methodFactory = METHODS[endpoint.method];
    if (!methodFactory) {
      throw new Error(`Unsupported HTTP method in endpoint spec: ${endpoint.method}`);
    }

    const handler = async ({ request, params }) => {
      try {
        const key = toEndpointKey(endpoint);
        if (typeof overrides[key] === 'function') {
          return overrides[key]({ request, params, endpoint, resource });
        }

        const loaded = await mockLoad(resource, {
          cache: endpoint.cache,
          endpoint: endpoint.path,
          method: endpoint.method,
        });

        const data = typeof endpoint.select === 'function'
          ? endpoint.select(loaded)
          : loaded;

        return resolveMode({
          request,
          params,
          endpoint,
          resource,
          data,
          loaded,
        });
      } catch (error) {
        console.error('[MSW] Endpoint handler error:', endpoint.method, endpoint.path, error);
        return Response.json(
          { error: error.message || 'Unknown MSW handler error' },
          { status: 500 }
        );
      }
    };

    return methodFactory(endpoint.path, handler);
  });
};
