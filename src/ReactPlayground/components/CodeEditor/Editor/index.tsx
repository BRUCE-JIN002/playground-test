import { editor } from "monaco-editor";
import MonacoEditor, { EditorProps, Monaco } from "@monaco-editor/react";
import { createATA } from "./ata";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props;

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    //快捷键格式化代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
    //配置编译选项
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true
    });

    const ata = createATA((code, path) => {
      //配置路径提示，获取类型之后用 addExtraLib 添加到 ts 里
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });
    //内容改变获取类型
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });
    //初始获取一次类型
    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6
        },
        ...options
      }}
    />
  );
}
