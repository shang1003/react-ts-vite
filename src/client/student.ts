import request from "./request";
export interface StudentType {
  id?: string;
  operation_name: string;
  phone: string;
  chinese_name: string;
  english_name: string;
  gender: string;
  age?: string;
  grade?: string;
  student_bg?: string;
  channel?: string;
  trial_class_category?: string;
  mail?: string;
  notes?: string;
}
export interface StudentListType {
  data: StudentType[] | [];
}
export interface RechargeRecord {
  student_id: string;
  operation_name: string;
  recharge_date: string;
  course_category: string;
  total_hours?: string;
  course_unit_price?: string;
  total_amount?: string;
  textbook?: string;
  mail?: string;
  settlement_date?: string;
  notes?: string;
}
export const getStudentList = async (params?: {
  name: string;
  course_category?: string;
}) => {
  return request.makeRequest<StudentListType>({
    method: "get",
    params,
    url: "/student-list",
  });
};
export const createStudent = async (data: Omit<StudentType, "id">) => {
  return request.makeRequest<StudentListType>({
    method: "post",
    data,
    url: "/student-create",
  });
};

export const deleteStudent = (data: { id: string }) => {
  return request.makeRequest({
    method: "delete",
    data,
    url: "/student-delete",
  });
};

export const editStudent = (data: StudentType) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/student-edit",
  });
};

export const getStudentDetail = (params: { id: string | undefined }) => {
  return request.makeRequest<StudentType>({
    method: "get",
    params,
    url: "/student-detail",
  });
};

export const getStudentExcel = () => {
  return request.makeRequest({
    method: "get",
    url: "/student-export",
    responseType: "blob",
  });
};
export const uploadStudents = (data: any) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `/students/upload`,
    headers: {
      "Content-Type": "multipart/form-data", //文件上传
    },
  });
};
export const batchDeleteStudents = (data: any) => {
  return request.makeRequest({
    method: "delete",
    data,
    url: "/batch-delete-students",
  });
};

export const bind = (data: any) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/bind",
  });
};
export const createRechargeRecord = (data: RechargeRecord) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/recharge-record",
  });
};
export const getRechargeRecord = (params?: { student_id?: string }) => {
  return request.makeRequest<{ data: RechargeRecord[] }>({
    method: "get",
    params,
    url: "/recharge-record",
  });
};
export const deleteRechargeRecord = (id: string) => {
  return request.makeRequest({
    method: "delete",
    url: `/recharge-record/${id}`,
  });
};
export const editRechargeRecord = (id: string, data: RechargeRecord) => {
  return request.makeRequest({
    method: "patch",
    data,
    url: `/recharge-record/${id}`,
  });
};
