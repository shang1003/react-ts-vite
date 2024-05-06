import request from "./request";
export interface Sell {
  name?: string;
  description?: string;
}

export interface SellGroup {
  count: number;
  trial_class_count_sum: number;
  trial_class_scheduling_test_sum: number;
  formal_class_test_sum: number;
  omTotalLessonsSum: number;
  omTotalAmountSum: number;
  fTotalLessonsSum: number;
  fTotalAmountSum: number;
  zTotalLessonsSum: number;
  zTotalAmountSum: number;
}


export interface SellStudent {
  date: Date;
  studentName: string;
  salespersonId: number;
  phoneNumber: string;
  basicInfo: string;
  trialClassTime: Date;
  courseCategory: string;
  textbookName: string;
  lessonPrice: number;
  totalLessons: number;
  totalAmount: number;
  trialClassCount: number;
  trialClassSchedulingTest: string;
  formalClassTest: string;
}
export const createSell = (data: Sell) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `sell`
  });
};
export const delSell = (id: string) => {
  return request.makeRequest({
    method: "delete",
    url: `sell/${id}`
  });
};
export const delSellsStudent = (id: string) => {
  return request.makeRequest({
    method: "delete",
    url: `sell-student/${id}`
  });
};
export const editSell = (id: string, data: Sell) => {
  return request.makeRequest({
    method: "patch",
    data,
    url: `sell/${id}`
  });
};
export const editSellStudent = (id: string, data: SellStudent) => {
  return request.makeRequest({
    method: "patch",
    data,
    url: `sell-student/${id}`
  });
};
export const createSellStudent = (data: SellStudent) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `sell-student`
  });
};
export const getSellStudent = (params: { salespersonId: string }) => {
  return request.makeRequest<{ data: SellStudent[] }>({
    method: "get",
    params,
    url: `sell-student`
  });
};

export const getSell = (params?: { salespersonId: string, date: Date }) => {
  return request.makeRequest<any>({
    method: "get",
    params,
    url: `sell/user`
  });
};
export const getSellGroup = (params?: { date?: string }) => {
  return request.makeRequest<{ data: SellGroup[] }>({
    method: "get",
    params,
    url: `sell-student/group`
  });
};

