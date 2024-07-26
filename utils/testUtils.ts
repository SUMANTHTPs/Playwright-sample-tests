import { test } from "@playwright/test";
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

export const checkLoginWithStateFile = (): boolean => {
  const storageStatePath = getStorageStateDir();
  return fs.existsSync(storageStatePath);
};

export const testDescribe = (title: string, callBack: () => void): void => {
  console.log(`[Debug] Running test: ${title}`);
  test.describe(title, () => {
    let loginStateExists: boolean;

    test.beforeAll(() => {
      loginStateExists = checkLoginWithStateFile();
      if (!loginStateExists) {
        console.log("Login state file is required to run tests");
        test.skip();
      }
    });

    if (checkLoginWithStateFile()) {
      test.use({ storageState: getStorageStateDir() });
    }

    callBack();
  });
};
