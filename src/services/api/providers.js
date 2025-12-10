import makeApiRequest from "./api";
export const providers = {
  list: async (data) => makeApiRequest("get", "/admin/providers", data),
  toggleState: async (id) => makeApiRequest("patch", `/admin/providers/${id}`),
};
