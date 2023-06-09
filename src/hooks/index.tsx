import { useState, useEffect, DependencyList } from "react";
import request from "@/client/request";
//封装常用hook

//1.状态 true和false切换
export const useToggle = (
  defaultValue: boolean
): [boolean, (value: boolean) => void] => {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: boolean) {
    setValue(value);
  }

  return [value, toggleValue];
};
//2.刷新
export const useRefresh = (): [number, () => void] => {
  const [key, setKey] = useState<number>(0);

  function refresh() {
    setKey(Date.now());
  }

  return [key, refresh];
};

//3.请求  组件销毁会取消请求
export function useFetch<T>(
  clientCall: () => Promise<T>,
  callback: (param: T) => void,
  deps?: DependencyList
) {
  useEffect(() => {
    const { setRequestConfig, getCancelTokenSource } = request;
    const cancelTokenSource = getCancelTokenSource();
    setRequestConfig({
      cancelToken: cancelTokenSource.token,
    });

    clientCall()
      .then((result) => {
        if (!cancelTokenSource.token.reason) {
          callback(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setRequestConfig({
      cancelToken: undefined,
    });

    return () => {
      cancelTokenSource.cancel();
    };
  }, deps);
}
