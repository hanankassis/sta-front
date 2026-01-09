import makeApiRequest  from "./api";
export const preferences = {
  list:  (type) =>   makeApiRequest({verb : "get", url: "/admin/preferences", params:  {type:type}}),
  get:  (id ) =>    makeApiRequest({verb: "get",  url: `/admin/preferences/${id}`}),
  create:  (data , type) =>  makeApiRequest({verb:"post",  url: "/admin/preferences",  data: data , params: {type:type} }), 
  update:  (id, data , type) =>  makeApiRequest({verb:"put",  url: `/admin/preferences/${id}`, data: data , params: type}),
  remove:  (id) =>  makeApiRequest({verb:"delete",  url:`/admin/preferences/${id}`}),
};
export default preferences;