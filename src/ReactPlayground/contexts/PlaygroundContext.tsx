import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { compress, fileName2Language, uncompress } from "../utils";
import { initFiles } from "../files";
import { useToggle } from "ahooks";
import _ from "lodash";

export interface File {
  name: string;
  value: string;
  language: string;
}

export type Theme = "dark" | "light";
export interface PlaygroundContext {
  files: File[];
  theme: Theme;
  toggleTheme: () => void;
  showMinMap: boolean;
  setShowMinMap: (thumbnail: boolean) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: File[]) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
  swapFile: (index1: number, index2: number) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx"
} as PlaygroundContext);

const getFilesFromUrl = () => {
  let files: File[] | undefined;
  try {
    const hash = uncompress(window.location.hash.slice(1));
    files = JSON.parse(hash);
  } catch (error) {
    console.warn(error);
  }
  return files;
};

export const usePlayGroundContext = () => useContext(PlaygroundContext);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<File[]>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");
  const [theme, { toggle: toggleTheme }] = useToggle<"dark", "light">(
    "dark",
    "light"
  );
  const [showMinMap, setShowMinMap] = useState<boolean>(false);

  const addFile = (name: string) => {
    const newFile = {
      name,
      language: fileName2Language(name),
      value: ""
    };
    setFiles([...files, newFile]);
  };

  const removeFile = (name: string) => {
    setFiles((preFiles) => {
      return preFiles.filter((file) => file.name !== name);
    });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (
      _.findIndex(files, (file) => file.name === oldFileName) < 0 ||
      _.isNil(newFileName)
    ) {
      return;
    }
    const index = files.findIndex((file) => file.name === oldFileName);
    if (index > -1) {
      files[index] = {
        ...files[index],
        name: newFileName,
        language: fileName2Language(newFileName)
      };
    }
    setFiles([...files]);
  };

  const swapFile = (index1: number, index2: number) => {
    if (index1 < 0 || index2 < 0 || index1 === index2) {
      return;
    }
    const temp = files[index1];
    files[index1] = files[index2];
    files[index2] = temp;
    setFiles([...files]);
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
        swapFile,
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
