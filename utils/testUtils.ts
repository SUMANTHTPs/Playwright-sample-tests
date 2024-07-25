import * as fs from "fs";
import { readFileSync } from "fs";
import path from "path";
import { parse } from "yaml";

export const getConfig = () => {
  const file = readFileSync("config.yml", "utf8");
  return parse(file);
};

export const getArtifactsDir = () => {
  return path.join(__dirname, "/../", "/artifacts");
};

export const getAuthArtifactsDir = () => {
  return path.join(__dirname, "/../", "/authArtifacts");
};

export const getStorageStateDir = () => {
  return getAuthArtifactsDir() + "/storageState.json";
};

export const checkLoginWithStateFile = () => {
  const storageStateExists = fs.existsSync(getStorageStateDir());
  if (!storageStateExists) {
    console.log("Login state file is required to run tests");
  }
  return storageStateExists;
};
