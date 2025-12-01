declare module "connect-livereload" {
  import { RequestHandler } from "express";
  export default function connectLivereload(): RequestHandler;
}