import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

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

const FallbackRender = ({ error }: { error: Error }) => {
  const { t } = useTranslation();
  return (
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
        title={t("header.wentWrong")}
        subTitle={t("header.checkAndResubmit")}
        extra={[
          <Button type="primary" key="console">
            {t("header.checkConsole")}
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
};
