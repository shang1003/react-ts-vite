import request from "./request";
export interface StudentType {
  id: string;
  name: string;
  phone: string;
  channel: string;
  course_category: string;
  purchase_date: string;
  course_unit_price: number;
  total_hours: string;
  total_amount: number;
  notes: string
}
export interface StudentListType {
  data: StudentType[] | [];
}
export const getStudentList = async () => {
  return request.makeRequest<StudentListType>({
    method: "get",
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
    url: "/student-excel",
    responseType: "blob"
  });
};
