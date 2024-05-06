import { Component, ReactNode } from "react";
import { DatePicker } from "antd";
interface ComDatePickerProps {
  handleClickDate: (date: []) => void;
  isShowDefault: Boolean;
}
import dayjs from "dayjs";

class ComDatePicker extends Component<ComDatePickerProps, { value: any }> {
  static defaultProps = {
    isShowDefault: 1,
  };
  constructor(props: ComDatePickerProps) {
    super(props);
    this.state = {
      value: (this.props.isShowDefault && dayjs()) || [],
    };
  }
  onChange = (value: any) => {
    this.props.handleClickDate && this.props.handleClickDate(value);
    this.setState({
      value,
    });
  };
  handleReset = () => {
    this.setState({
      value: [],
    });
    this.props.handleClickDate([]);
  };

  render(): ReactNode {
    return (
      <DatePicker
        value={this.state.value}
        allowClear={false}
        picker='week'
        onChange={this.onChange}
      />
    );
  }
}

export default ComDatePicker;
