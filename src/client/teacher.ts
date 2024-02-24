import request from "./request";
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
  id: string,
  name: string
}
export interface ClassRecordsListType {
  data: ClassRecordsType[]
}
export interface BindType {
  id: string;
  student_id: string;
  student_name: string;
}
export interface TeacherType {
  teacher_id: string;
  name: string;
  gender: string;
  phone: string;
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
export const bindStudent = (data: BindType) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/bind-student",
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

export const getClassRecords = (params: { id?: string | undefined, teacher_name?: string, student_id?: string }) => {
  return request.makeRequest<ClassRecordsListType>({
    method: "get",
    params,
    url: "class-records",
  });
};
export const createClassRecords = (data: ClassRecordsType) => {
  return request.makeRequest<ClassRecordsType>({
    method: "post",
    data,
    url: "class-records",
  });
};
export const deleteClassRecords = (data: { id: string, student_id: string }) => {
  return request.makeRequest<ClassRecordsListType>({
    method: "delete",
    data,
    url: "class-records-delete",
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
    responseType: "blob"
  });
};
export const getClassRecordsExcel = (params: { id: string | undefined, teacher_name: string }) => {
  return request.makeRequest({
    method: "get",
    params,
    url: "/class-records-excel",
    responseType: "blob"
  });
};
export const getTeacherSalaryExcel = (params: { id: string | undefined, teacher_name: string }) => {
  return request.makeRequest({
    method: "get",
    params,
    url: "/teacher-salary-excel",
    responseType: "blob"
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
    params: { id: teacher_id }
  });
};
