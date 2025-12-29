import makeApiRequest from "./api";


const auth = {
  login:  (data) => makeApiRequest({verb: "post", url: "/login", data}),            
  register: (data) =>  makeApiRequest({verb:"post", url: "/register", data , contentType:"multipart/form-data"}),      
  logout: () =>  makeApiRequest({verb:"post", url:"/logout"}),
  currentUser: () =>  localStorage.getItem("name"),
  currentUserType: () => localStorage.getItem("type"),
};

export default auth;


