import makeApiRequest  from "./api";
export const preferences = {
  list: async () => makeApiRequest("get", "/admin/preferences"),

  // GET /preferences/:id
  get: async (id) => {
    if (!id) throw new Error("id is required");
    return makeApiRequest("get", `/admin/preferences/${id}`);
  },

  // POST /preferences
  create: async (data) => {
    return makeApiRequest("post", "/admin/preferences", data);
  },

  // PUT /preferences/:id
  update: async (id, data) => {
    if (!id) throw new Error("id is required");
    return makeApiRequest("put", `/admin/preferences/${id}`, data);
  },

  // DELETE /preferences/:id
  remove: async (id) => {
    if (!id) throw new Error("id is required");
    return makeApiRequest("delete", `/admin/preferences/${id}`);
  },
};
export default preferences;