import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const checkToken = (req: any, res: Response, next: NextFunction) => {
  const token =
    req.body.token ||
    req.headers.authorization ||
    req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err: any, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: "Unauthorized access.", err });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    console.log(1);
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};
