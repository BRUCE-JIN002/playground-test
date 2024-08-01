import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const { Paragraph } = Typography;

export default function ErrorBoundary({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary fallbackRender={FallbackRender}>
      {children}
    </ReactErrorBoundary>
  );
}

const FallbackRender = ({ error }: { error: Error }) => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Result
      status="error"
      title="Something Went Wrong"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button type="primary" key="console">
          Please Check The Console
        </Button>
      ]}
    >
      <div className="desc">
        <Paragraph>
          <CloseCircleOutlined style={{ color: "red" }} /> {error.message}
        </Paragraph>
      </div>
    </Result>
  </div>
);
