import { Button } from "antd";
import { getUseInfo } from "@/client/login";
export const Test = () => {
  const handleClick = async () => {
    const aa = await getUseInfo();
  };
  return <Button onClick={handleClick}>获取信息</Button>;
};

export default Test;
