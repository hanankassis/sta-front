import makeApiRequest from "./api";

export const categories = {
  list: async () => makeApiRequest({verb: "get", url: "/admin/categories"}),
  get: async (id) => makeApiRequest({verb: "get", url: `/admin/categories/${id}`}),
  create: async (data) =>  makeApiRequest({verb:"post", url: "/admin/categories", data}),
  update: async (id, data) =>  makeApiRequest({verb:"put", url: `/admin/categories/${id}`, data}),
  remove: async (id) =>  makeApiRequest({verb:"delete", url:  `/admin/categories/${id}`})
}
export default categories;