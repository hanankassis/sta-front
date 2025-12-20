import makeApiRequest from "./api";
const providers = {
  // list: async (data) => makeApiRequest({verb: "get", url: "/admin/providers",  data}),
  // toggleState: async (id) => makeApiRequest({verb: "patch", url: `/admin/providers/${id}`}),
};
export default providers;
