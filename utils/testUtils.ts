import { readFileSync } from "fs";
import { parse } from "yaml";
import path from "path";

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
}