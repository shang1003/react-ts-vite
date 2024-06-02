import { Spin } from "antd";
const PageLoading: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Spin size='large' />
    </div>
  );
};

export default PageLoading;
