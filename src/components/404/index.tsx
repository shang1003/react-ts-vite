import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NoMatch: React.FC = function () {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goBack}>
          Back
        </Button>
      }
    />
  );
};

export default NoMatch;
