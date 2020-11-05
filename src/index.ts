import { doGet, doPost } from "./main";
import gasql from "./gasql";

declare const global: {
  [x: string]: unknown;
};

global.doGet = doGet;
global.doPost = doPost;
