import makeApiRequest from "./api";

const tourist = {
  getProfile:  () => makeApiRequest({verb: "get", url: `/tourist/profile/`}),
  updateProfile:  ( data) =>  makeApiRequest({verb:"post", url: `/tourist/profile/`, data}),
  matchProvider:  () =>  makeApiRequest({verb:"get", url: `/tourist/matchProvider`}),
  booking:  ( data) =>  makeApiRequest({verb:"post", url: `/tourist/booking/`, data}),
  tourHistory:  () =>  makeApiRequest({verb:"get", url: `/tourist/tourHistory`}),
  rate:  ( data) =>  makeApiRequest({verb:"post", url: `/tourist/rate/`, data}),
  comment:  ( data) =>  makeApiRequest({verb:"post", url: `/tourist/comment/`, data}),
}
export default tourist;