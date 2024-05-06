import request from "./request";
import { UserDetailType } from "./user";
const prefix = "salary/user";
export interface ClassRecordsType {
  teacher_id: string;
  course: string;
  student_id: string;
  status: string;
  remarks: string;
  class_time: string;
  operation_date: string;
}
export interface StudentType {
  id: string;
  chinese_name: string;
}
export interface ClassRecordsListType {
  data: ClassRecordsType[];
}
export interface BindType {
  id: string;
  student_id: string;
  student_name: string;
}

export interface SalaryType {
  salary_date: string;
  teacher_id: string;
  gross_salary: string;
  bonuses_penalties: string;
  net_salary: string;
}
export interface SalaryListType {
  data: SalaryType[];
}
export interface TeacherListType {
  data: UserDetailType[] | [];
}
export const getTeacherList = async () => {
  return request.makeRequest<TeacherListType>({
    method: "get",
    url: "/teacher-list",
  });
};

export const getSalary = (params: { user_id: string | undefined; date: string | undefined }) => {
  return request.makeRequest<SalaryListType>({
    method: "get",
    params,
    url: prefix,
  });
};
export const createSalary = (data: SalaryType) => {
  return request.makeRequest<SalaryListType>({
    method: "post",
    data,
    url: prefix,
  });
};
export const editSalary = (id: string, data: SalaryType) => {
  return request.makeRequest<UserDetailType>({
    method: "patch",
    data,
    url: `${prefix}/${id}`,
  });
};
export const deleteSalary = (id: string) => {
  return request.makeRequest<SalaryType>({
    method: "delete",
    url: `${prefix}/${id}`,
  });
};

export const editClassRecords = (data: any) => {
  return request.makeRequest<ClassRecordsType>({
    method: "post",
    data,
    url: "/class-records-edit",
  });
};
export const getTeacherExcel = () => {
  return request.makeRequest({
    method: "get",
    url: "/teacher-excel",
    responseType: "blob",
  });
};
export const getClassRecordsExcel = (params: { id: string | undefined; teacher_name: string }) => {
  return request.makeRequest({
    method: "get",
    params,
    url: "/class-records-excel",
    responseType: "blob",
  });
};
export const getTeacherSalaryExcel = (params: {
  user_id: string | undefined;
  date: string | undefined;
}) => {
  return request.makeRequest({
    method: "get",
    params,
    url: "/salary/user/salary-excel",
    responseType: "blob",
  });
};

export const syncCourse = () => {
  return request.makeRequest({
    method: "post",
    url: "/course-table-sync",
  });
};
export const deleteCourseWeek = () => {
  return request.makeRequest({
    method: "delete",
    url: "/course-table-delete-week",
  });
};

export const getBindStudentList = async (teacher_id: string) => {
  return request.makeRequest<{ data: StudentType[] }>({
    method: "get",
    url: "/student-bind-list",
    params: { id: teacher_id },
  });
};
