import request from "./request";
export interface UserDetailType {
  id: string;
  name: string;
  address: string;
  description: string;
  password: string;
}
export interface CourseTableType {
  id: string;
  name: string;
  status?: string,
  time?: string,
  teacher_id?: string,
  uid?: string//每周课表唯一值
  isChangeName?:boolean
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
export const upload = (id: string, data: any) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `/upload/${id}`,
    headers: {
      "Content-Type": "multipart/form-data"//文件上传
    }
  });
};
export const changePassword = (id: string, data: any) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `/change-password/${id}`,
  });
};
export const getUserRegistrationStatistics = () => {
  return request.makeRequest<UserRegistrationStatisticsType[]>({
    method: "get",
    url: "/user-count",
  });
};
export const getCourseTable = (params: { id: string }) => {
  console.log(params, 'params');

  return request.makeRequest<{ data: CourseTableType[] }>({
    method: "get",
    url: "/course-table",
    params
  });
};
export const editCourseTable = (data: CourseTableType) => {
  return request.makeRequest({
    method: "post",
    data,
    url: '/course-table-edit',
  });
};
export const getUserExcel = () => {
  return request.makeRequest({
    method: "get",
    url: "/user-excel",
    responseType: "blob"
  });
};

