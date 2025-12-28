import makeApiRequest from "./api";

const countries =  () => makeApiRequest({verb: "get", "url" : "/countries"});

export default countries;
