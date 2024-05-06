import request from "./request";
export interface CoursetableType {
  id?: string;
  teacher_id?: string;
  name?: string;
  date?: string;
  status?: string;
  student_id?: string;
  ceilTop?: number;
  ceilHeight?: number;
  start_time?: string;
  end_time?: string;
  dayOfWeek?: number;
}

export const getCoursetable = (params?: {
  teacher_id?: string;
  dateArr?: Date[];
  student_id?: string;
  status?: string;
}) => {
  return request.makeRequest<{ data: CoursetableType[] }>({
    method: "get",
    url: "/course-table",
    params,
  });
};

export const editCourseTable = (data: CoursetableType & { isChangeName?: true }) => {
  return request.makeRequest({
    method: "post",
    data,
    url: "/course-table-edit",
  });
};
export const deleteCourseTable = (data: Pick<CoursetableType, "id">) => {
  return request.makeRequest({
    method: "delete",
    data,
    url: "/course-table-delete",
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
