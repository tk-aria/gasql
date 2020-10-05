import { doGet, doPost } from "./main";

declare const global: {
  [x: string]: unknown;
};

global.doGet = doGet;
global.doPost = doPost;
