import request from "./request";

export const login = (data:Record<string, any>) => {
  
  return request.makeRequest({
    method: "post",
    data,
    url: "/login",
  }); 
};
export const getUseInfo = () => {
  return request.makeRequest({
    method: "get",
    url: "/userinfo",
  });
};
