import request from "./request";
export interface TeacherType {
  teacher_id: string;
  name: string;
  gender: string;
  id_card_number: string;
  bank_account_number: string;
}
export interface TeacherListType {
  data: TeacherType[] | [];
}
export const getTeacherList = async () => {
  return request.makeRequest<TeacherListType>({
    method: "get",
    url: "/teacher-list",
  });
};
export const createTeacher = async (data: Omit<TeacherType, "id">) => {
  return request.makeRequest<TeacherListType>({
    method: "post",
    data,
    url: "/teacher-create",
  });
};

export const deleteTeacher = (data: { id: string }) => {
  return request.makeRequest({
    method: "delete",
    data,
    url: "/teacher-delete",
  });
};

export const editTeacher = (data: TeacherType) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/teacher-edit",
  });
};

export const getTeacherDetail = (params: { id: string | undefined }) => {
  return request.makeRequest<TeacherType>({
    method: "get",
    params,
    url: "/teacher-detail",
  });
};
