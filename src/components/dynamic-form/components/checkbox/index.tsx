import { Checkbox as VCheckbox } from "antd";
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const { content, className, disabled, onChange, value, ...res } = props;
  const handleChange = (e: any) => {
    onChange && onChange(e.target.checked);
  };
  const conf = {
    checked: value,
    className,
    disabled,
    onChange: handleChange,
  };
  return <VCheckbox {...conf}>{content}</VCheckbox>;
};

export default App;
