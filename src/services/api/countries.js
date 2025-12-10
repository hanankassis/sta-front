import makeApiRequest from "./api";

const countries = async () => makeApiRequest({verb: "get", "url" : "/countries"});

export default countries;
