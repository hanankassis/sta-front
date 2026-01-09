import makeApiRequest from "./api";

const categories = {
  all:  () => makeApiRequest({verb: "get", url: "/categories"}),
  list:  () => makeApiRequest({verb: "get", url: "/admin/categories"}),
  get:    (id) => makeApiRequest({verb: "get", url: `/admin/categories/${id}`}),
  create:  (data) =>  makeApiRequest({verb:"post", url: "/admin/categories", data}),
  update:  (id, data) =>  makeApiRequest({verb:"put", url: `/admin/categories/${id}`, data}),
  remove:  (id) =>  makeApiRequest({verb:"delete", url:  `/admin/categories/${id}`}),

  tree:  () =>  makeApiRequest({verb:"get", url:  `/categories/tree`}),
}
export default categories;