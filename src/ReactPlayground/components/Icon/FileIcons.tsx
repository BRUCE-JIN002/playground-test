import { createFromIconfont } from "./createFromIconFont";
import { IconProps } from "./Icon";

const IconFont = createFromIconfont(
  "//at.alicdn.com/t/c/font_4659371_a17t83ka88u.js"
);

export const JsonIcon = (props: IconProps) => {
  return <IconFont type={"icon-json1"} {...props} />;
};

export const CssIcon = (props: IconProps) => {
  return <IconFont type={"icon-css"} {...props} />;
};

export const JsIcon = (props: IconProps) => {
  return <IconFont type={"icon-js"} {...props} />;
};

export const JsxIcon = (props: IconProps) => {
  return <IconFont type={"icon-jsx"} {...props} />;
};

export const ScssIcon = (props: IconProps) => {
  return <IconFont type={"icon-Scss"} {...props} />;
};

export const TsIcon = (props: IconProps) => {
  return <IconFont type={"icon-ts"} {...props} />;
};

export const EmptyFileIcon = (props: IconProps) => {
  return <IconFont type={"icon-empty-file"} {...props} />;
};

export const getFileIcon = (name: string): React.JSX.Element => {
  if (name.endsWith(".jsx") || name.endsWith(".tsx")) {
    return <JsxIcon />;
  } else if (name.endsWith(".ts")) {
    return <TsIcon />;
  } else if (name.endsWith(".js")) {
    return <JsIcon />;
  } else if (name.endsWith(".json")) {
    return <JsonIcon />;
  } else if (name.endsWith(".css")) {
    return <CssIcon />;
  } else if (name.endsWith(".scss")) {
    return <ScssIcon />;
  }
  return <EmptyFileIcon />;
};
