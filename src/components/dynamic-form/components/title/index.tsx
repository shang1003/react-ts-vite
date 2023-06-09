import "./index.less";
const APP: React.FC<dynamic.ComponentProps> = (props) => {
  const { label } = props;
  return <div className="title">{label}</div>;
};

export default APP;
