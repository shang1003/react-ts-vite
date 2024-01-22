import request from "./request";
export interface TeacherType {
  teacher_id: string;
  name: string;
  gender: string;
  id_card_number: string;
  bank_account_number: string;
}
export interface TeacherSalaryType {
  id: string,
  salary_date: string,
  teacher_id: string,
  gross_salary: string,
  bonuses_penalties: string,
  net_salary: string
}
export interface TeacherSalaryListType {
  data: TeacherSalaryType[]
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
export const getTeacherSalary = (params: { id: string | undefined }) => {
  console.log(params, 'params');

  return request.makeRequest<TeacherSalaryListType>({
    method: "get",
    params,
    url: "teacher-salary",
  });
};
export const createTeacherSalary = (data: TeacherSalaryType) => {
  return request.makeRequest<TeacherType>({
    method: "post",
    data,
    url: "/teacher-salary-create",
  });
};
export const editTeacherSalary = (data: TeacherSalaryType) => {
  return request.makeRequest<TeacherType>({
    method: "post",
    data,
    url: "/teacher-salary-edit",
  });
};
export const deleteTeacherSalary = (data: { id: string }) => {
  return request.makeRequest<TeacherType>({
    method: "delete",
    data,
    url: "/teacher-salary-delete",
  });
};
