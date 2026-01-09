import makeApiRequest from "./api";
const provider = {
  getInfo: () => makeApiRequest({verb: "get", url: "/provider/getInfo"}),
};
export default provider;
