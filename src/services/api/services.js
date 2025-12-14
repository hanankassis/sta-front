import makeApiRequest from "./api";

const services = {
  list: async () => makeApiRequest({verb: "get", url: "/provider/services"}),
  get: async (id) => makeApiRequest({verb: "get", url: `/provider/services/${id}`}),
  create: async (data) =>  makeApiRequest({verb:"post", url: "/provider/services", data}),
  update: async (id, data) =>  makeApiRequest({verb:"put", url: `/provider/services/${id}`, data}),
  remove: async (id) =>  makeApiRequest({verb:"delete", url:  `/provider/services/${id}`})
}
export default services;