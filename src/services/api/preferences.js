import makeApiRequest  from "./api";
export const preferences = {
  list: async (type) =>  await makeApiRequest({verb : "get", url: "/admin/preferences", params:  {type:type}}),
  get: async (id ) =>    makeApiRequest({verb: "get",  url: `/admin/preferences/${id}`}),
  create: async (data , type) =>  makeApiRequest({verb:"post",  url: "/admin/preferences",  data: data , params: type }), 
  update: async (id, data , type) =>  makeApiRequest({verb:"put",  url: `/admin/preferences/${id}`, data: data , params: type}),
  remove: async (id) =>  makeApiRequest({verb:"delete",  url:`/admin/preferences/${id}`}),
};
export default preferences;