import request from "./request";
export interface UserDetailType {
  id: string;
  name: string;
  english_name: string;
  chinese_name: string;
  password: string;
  phone: string;
  gender: string;
  id_card_number: string;
  description: string;
  bank_account_number: string;
  role: string;
  avatar: string;
  student_name: string;
  student_id: string;
}
export interface CourseTableType {
  id: string;
  name: string;
  status?: string;
  time?: string;
  date?: string;
  time_slot?: string;
  teacher_id?: string;
  student_id?: string;
  student_name?: string;
  uid?: string//每周课表唯一值
  isChangeName?: boolean
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
export const getUserListInfo = async () => {
  return request.makeRequest<{ data: UserDetailType[] }>({
    method: "get",
    url: "/user-info",
  });
};
export const getUserDetail = (params: { id: string | undefined }) => {
  return request.makeRequest<UserDetailType>({
    method: "get",
    params,
    url: "/user-detail",
  });
};
export const getTeacherDetail = (params: { id: string | undefined }) => {
  return request.makeRequest<UserDetailType>({
    method: "get",
    params,
    url: "/teacher-detail",
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
    method: "patch",
    data,
    url: "/user-edit",
  });
};
export const upload = (id: string, data: any) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `/upload/avatar/${id}`,
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



export const getUserExcel = () => {
  return request.makeRequest({
    method: "get",
    url: "/user-excel",
    responseType: "blob"
  });
};
export const uploadNetworkDisk = (id: string, data: any) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `/network-disk/${id}`,
    headers: {
      "Content-Type": "multipart/form-data"//文件上传
    }
  });
};

