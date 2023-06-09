import request from "./request";
export type UseInfo = {
  username: string;
};
export const login = (data: Record<string, any>) => {
  return request.makeRequest<UseInfo>({
    method: "post",
    data,
    url: "/login",
  });
};
export const logout = () => {
  return request.makeRequest({
    method: "get",
    url: "/logout",
  });
};
export const getUserInfo = () => {
  return request.makeRequest<UseInfo>({
    method: "get",
    url: "/userinfo",
  });
};
//动态表单测试
export const testDynamicForm = (data: Record<string, any>) => {
  return request.makeRequest<UseInfo>({
    method: "post",
    url: "/dynamic-form",
    data,
  });
};
