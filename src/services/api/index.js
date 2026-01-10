import makeApiRequest from "./api";


export { default as auth} from './auth'
export { default as categories} from './categories';
export { default as preferences} from './preferences';
export { default as admin} from './admin';
export { default as services} from './services';
export {default as notifications} from './notifications';
export {default as provider} from './providers';




export const countries =  () => makeApiRequest({verb: "get", "url" : "/countries"});
export const provinces =  () => makeApiRequest({verb: "get", "url" : "/provinces"});

  