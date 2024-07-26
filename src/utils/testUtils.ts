import { test } from "@playwright/test";
import * as fs from "fs";
import { readFileSync } from "fs";
import path from "path";
import { parse } from "yaml";

/**
 * Returns configurations
 * @returns configs
 */
export const getConfig = () => {
  const file = readFileSync("config.yml", "utf8");
  return parse(file);
};

/**
 * Returns artifacts path
 * @returns path
 */
export const getArtifactsDir = () => {
  return path.join(__dirname, "/../../", "/artifacts");
};

/**
 * Returns auth artifacts path
 * @returns path
 */
export const getAuthArtifactsDir = () => {
  return path.join(__dirname, "/../../", "/authArtifacts");
};

/**
 * Returns storage state path
 * @returns path
 */
export const getStorageStateDir = () => {
  return getAuthArtifactsDir() + "/storageState.json";
};

/**
 * Checks if storage state for login exists
 * @returns boolean
 */
export const checkLoginWithStateFile = (): boolean => {
  const storageStatePath = getStorageStateDir();
  return fs.existsSync(storageStatePath);
};

/**
 * Custom test.describe block
 * @param title test title
 * @param callBack call back function
 */
export const testDescribe = (title: string, callBack: () => void): void => {
  console.log(`[DEBUG] Running test: ${title}`);
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

/**
 * Convert string to number
 * @param str string
 * @returns number
 */
export const convertStringToNumber = (str: string): Number => {
  return Number(str.match(/\d+/g));
};
