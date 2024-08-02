import { File } from "./contexts/PlaygroundContext";
import importMap from "./template/import-map.json?raw";
import AppCss from "./template/App.css?raw";
import App from "./template/App.tsx?raw";
import main from "./template/main.tsx?raw";
import { fileName2Language } from "./utils";

// app fileName
export const APP_COMPONENT_FILE_NAME = "App.tsx";
// esm modules map files name
export const IMPORT_MAP_FILE_NAME = "import-map.json";
// app entry file name
export const ENTRY_FILE_NAME = "main.tsx";

export const initFiles: File[] = [
  {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap
  },
  {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main
  },
  {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App
  },
  {
    name: "App.css",
    language: "css",
    value: AppCss
  }
];
