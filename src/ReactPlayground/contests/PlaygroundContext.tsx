import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { compress, fileName2Language, uncompress } from "../utils";
import { initFiles } from "../files";
import { useToggle } from "ahooks";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export type Theme = "dark" | "light";
export interface PlaygroundContext {
  files: Files;
  theme: Theme;
  toggleTheme: () => void;
  showMinMap: boolean;
  setShowMinMap: (thumbnail: boolean) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx"
} as PlaygroundContext);

const getFilesFromUrl = () => {
  let files: Files | undefined;
  try {
    const hash = uncompress(window.location.hash.slice(1));
    files = JSON.parse(hash);
  } catch (error) {
    console.warn(error);
  }
  console.log("files", files);
  return files;
};

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");
  const [theme, { toggle: toggleTheme }] = useToggle<Theme>("dark");
  const [showMinMap, setShowMinMap] = useState<boolean>(false);

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: ""
    };
    setFiles({ ...files });
  };

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({ ...files });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (
      !files[oldFileName] ||
      newFileName === undefined ||
      newFileName === null
    ) {
      return;
    }
    const { [oldFileName]: value, ...rest } = files;
    const newFile = {
      [newFileName]: {
        ...value,
        language: fileName2Language(newFileName),
        name: newFileName
      }
    };
    setFiles({
      ...rest,
      ...newFile
    });
  };

  useEffect(() => {
    const hash = compress(JSON.stringify(files));
    window.location.hash = hash;
  }, [files]);

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        theme,
        showMinMap,
        setShowMinMap,
        toggleTheme,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
