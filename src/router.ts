import express, { Express } from "express";
import authRouter from "./modules/auth/router.js";
import machineRouter from "./modules/machines/router.js";
import usersRouter from "./modules/users/router.js";

export default function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use(`/auth`, authRouter);
  app.use(`/users`, usersRouter);
  app.use(`/machines`, machineRouter);

  return app;
}
