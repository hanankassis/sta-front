import makeApiRequest from "./api";

const admin = {
  list: (accepted) => makeApiRequest({ verb: "get", url: "/admin/providers", params: {accepted: accepted} }),
  acceptProvider:  (id) =>
    makeApiRequest({ verb: "patch", url: `/admin/accept-provider/${id}` }),
  totals:  () =>     makeApiRequest({ verb: "get", url: "/admin/totals" }),
  complaints:  () =>     makeApiRequest({ verb: "get", url: "/admin/complaints" }),
};
export default admin;
