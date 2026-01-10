import makeApiRequest from "./api";

const profile = {
  get:  () => makeApiRequest({verb: "get", url: `/tourist/profile/`}),
  update:  ( data) =>  makeApiRequest({verb:"post", url: `/tourist/profile/`, data}),
}
export default profile;