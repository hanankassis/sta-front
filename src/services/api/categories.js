import makeApiRequest from "./api";

export const categories = {
  // GET /categories
  list: async () => makeApiRequest("get", "/admin/categories"),

  // GET /categories/:id
  get: async (id) => {
    if (!id) throw new Error("id is required");
    return makeApiRequest("get", `/admin/categories/${id}`);
  },

  // POST /categories
  create: async (data) => {
    return makeApiRequest("post", "/admin/categories", data);
  },

  // PUT /categories/:id
  update: async (id, data) => {
    if (!id) throw new Error("id is required");
    return makeApiRequest("put", `/admin/categories/${id}`, data);
  },

  // DELETE /categories/:id
  remove: async (id) => {
    if (!id) throw new Error("id is required");
    return makeApiRequest("delete", `/admin/categories/${id}`);
  },
};

export default categories;