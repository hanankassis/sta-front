import makeApiRequest from "./api";

const services = {
  list:  () => makeApiRequest({verb: "get", url: "/provider/services"}),
  get:  (id) => makeApiRequest({verb: "get", url: `/provider/services/${id}`}),
  create:  (data) =>  makeApiRequest({verb:"post", url: "/provider/services", data}),
  update:  (id, data) =>  makeApiRequest({verb:"put", url: `/provider/services/${id}`, data}),
  remove:  (id) =>  makeApiRequest({verb:"delete", url:  `/provider/services/${id}`})
}
export default services;