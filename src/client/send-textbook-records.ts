import request from "./request";
const prefix = "send-textbook-records";
export interface SendTextbookRecordsType {
  student_id: string;
  course_category?: string; // 课程类别
  name?: string; //教材名称
  price?: string; //教材价格
  address?: string; //收件地址
}

export function getSendTextbookRecords(params?: { student_id?: string }) {
  return request.makeRequest<{ data: SendTextbookRecordsType[] }>({
    method: "get",
    url: prefix,
    params,
  });
}
export function createSendTextbookRecords(data: SendTextbookRecordsType) {
  return request.makeRequest({
    method: "post",
    url: prefix,
    data,
  });
}
export function deleteSendTextbookRecords(id: string) {
  return request.makeRequest({
    method: "delete",
    url: `${prefix}/${id}`,
  });
}
