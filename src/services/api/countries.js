import makeApiRequest from "./api";

const countries = async () => makeApiRequest("get", "/countries");

export default countries;
