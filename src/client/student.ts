import request from "./request";
export interface StudentType {
  id: string;
  name: string;
  phone: string;
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