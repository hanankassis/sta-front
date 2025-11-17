import { auth } from "./api"

export async function login(credentials) {
  const data = await auth.loginUser(credentials);
  localStorage.setItem('token' , data.token);
  localStorage.setItem('name' , data.name);
  localStorage.setItem('type' , data.type);
  return data;
}
export async function register(info){
  const data = await auth.registerUser(info);
  localStorage.setItem('token' , data.token);
  localStorage.setItem('name' , data.name);
  localStorage.setItem('type' , data.type)
  return data;
}

export function logout() {
  auth.logoutUser();
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('type');
}

export function currentUser() {  
    return localStorage.getItem('name');  
}
export function currentUserType() {
  try {
    const raw = localStorage.getItem('type')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
