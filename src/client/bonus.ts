import request from "./request";
export interface BonusType {
  id?: number;
  user_id?: number;
  student_id?: string;
  rewards?: string;
  reward_quantity?: number;
  amount?: number;
}

export const getBonus = (params?: { start_date: string; end_date: string }) => {
  return request.makeRequest<{ data: BonusType[] }>({
    method: "get",
    params,
    url: `bonus`,
  });
};
export const createBonus = (data: BonusType) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `bonus`,
  });
};

export const deleteBonus = (id: string) => {
  return request.makeRequest({
    method: "delete",
    url: `/bonus/${id}`,
  });
};

export const getBonusExcel = (params?: { start_date: string; end_date: string }) => {
  return request.makeRequest({
    method: "get",
    params,
    url: "/bonus/bonus-excel",
    responseType: "blob",
  });
};
