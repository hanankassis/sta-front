import makeApiRequest from "./api";
const provider = {
  getProfile:  () => makeApiRequest({verb: "get", url: `/provider/categories/`}),
  updateProfile:  ( data) =>  makeApiRequest({verb:"post", url: `/provider/categories/`, data}),
  getInfo: () => makeApiRequest({verb: "get", url: "/provider/getInfo"}),
  comments: () => makeApiRequest({verb: "get", url: "/provider/comments"}),
  ratings: () => makeApiRequest({verb: "get", url: "/provider/ratings"}),
};
export default provider;
