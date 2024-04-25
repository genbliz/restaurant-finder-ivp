// import fs from "node:fs";
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
const myEnv = config();
expand(myEnv);
//
const envGlobCache: { [x: string]: string | undefined } = {};

/**
 * cache value, its faster!
 *
 * @param {string} envKey
 * @returns
 */
function getEnv(envKey: string) {
  if (envGlobCache[envKey] !== undefined) {
    return envGlobCache[envKey];
  }
  const envVal = process.env[envKey];
  if (envVal !== undefined) {
    envGlobCache[envKey] = envVal;
    return envVal;
  }
  return undefined;
}

function getEnvString(envKey: string) {
  const val = getEnv(envKey);
  if (val) {
    return val;
  }
  return '';
}

function getEnvBool(envKey: string) {
  const val = getEnv(envKey);
  if (val !== undefined && String(val).trim() === 'true') {
    return true;
  }
  return false;
}

function getEnvNumber(envKey: string, defaultVal?: number) {
  const val = getEnv(envKey);
  if (val !== undefined && !isNaN(Number(val))) {
    return Number(val);
  }
  return defaultVal as number;
}

type IEnvironment = 'production' | 'staging' | 'development' | 'test';

export const envConfig = {
  //
  PORT: getEnvNumber('PORT'),
  SERVER_JWT_SECRET: getEnvString('SERVER_JWT_SECRET'),
  //
  NODE_ENV: getEnvString('NODE_ENV') as IEnvironment,
  //
  PG_DB_HOST: getEnvString('PG_DB_HOST'),
  PG_DB_PORT: getEnvNumber('PG_DB_PORT'),
  PG_DB_NAME: getEnvString('PG_DB_NAME'),
  PG_DB_USER: getEnvString('PG_DB_USER'),
  PG_DB_PASS: getEnvString('PG_DB_PASS'),
} as const;

export type IEnvConfig = typeof envConfig;
