import { ConfigProvider } from "antd";
import { useContext } from "react";
import { PlaygroundContext } from "./PlaygroundContext";

const AntdConfigContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useContext(PlaygroundContext);

  return (
    <ConfigProvider
      theme={{
        token:
          theme === "dark"
            ? {
                colorPrimary: "#478ba3",
                colorPrimaryHover: "skyblue",
                colorBgElevated: "#1a1a1a",
                colorText: "#fff",
                fontSize: 12
              }
            : { fontSize: 12 },
        components: {
          Switch: {
            colorPrimary: "skyblue",
            colorPrimaryHover: "#6cb6d1"
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigContextProvider;
