import request from "./request";
export interface NetworkDiskType {
  name: string;
  user_id: string;
  url: string
}

export const uploadNetworkDisk = (id: string, data: any, name: string) => {
  return request.makeRequest({
    method: "post",
    data,
    url: `upload/network-disk/${id}?name=${name}`,
    headers: {
      "Content-Type": "multipart/form-data"//文件上传
    }
  });
};
export const getNetworkDiskList = () => {
  return request.makeRequest<{ data: NetworkDiskType[] }>({
    method: "get",
    url: `network-disk`
  });
};
export const deleteNetworkDisk = (data: { id: string, url: string }) => {
  return request.makeRequest({
    method: "delete",
    data,
    url: `/network-disk`
  });
};

