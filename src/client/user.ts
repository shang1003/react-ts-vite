import request from "./request";
export interface UserDetailType {
  id: string;
  name: string;
  age: number;
  address: string;
  description: string;
  password: string;
}
export interface UserRegistrationStatisticsType {
  registration_date: string;
  registration_count: number;
}

export interface UserListType {
  userList: UserDetailType[] | [];
}
export const getUserList = async () => {
  return request.makeRequest<UserListType>({
    method: "get",
    url: "/user-list",
  });
};
export const getUserDetail = (params: { id: string | undefined }) => {
  return request.makeRequest<UserDetailType>({
    method: "get",
    params,
    url: "/user-detail",
  });
};
export const createUser = (data: Omit<UserDetailType, "id">) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/user-create",
  });
};
export const deleteUser = (data: { id: string }) => {
  return request.makeRequest({
    method: "delete",
    data,
    url: "/user-delete",
  });
};
export const editUser = (data: UserDetailType) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/user-edit",
  });
};
export const getUserRegistrationStatistics = () => {
  return request.makeRequest<UserRegistrationStatisticsType[]>({
    method: "get",
    url: "/user-count",
  });
};
