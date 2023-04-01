import { ApiError } from "@point-hub/express-error-handler";
import { NextFunction, Request, Response } from "express";
import { DestroyMachineService } from "../services/destroy.service.js";
import { db } from "@src/database/database.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization ?? "";
    if (authorizationHeader === "") {
      throw new ApiError(401);
    }

    const session = db.startSession();

    db.startTransaction();
    const destroyMachineService = new DestroyMachineService(db);
    const result = await destroyMachineService.handle(req.params.id, { session });

    await db.commitTransaction();

    res.status(204).json(result);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
