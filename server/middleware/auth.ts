import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

const SECRET:string = "Scre534tuus";  // This should be in an environment variable in a real application

const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err || !user || typeof user === "string") {
        return res.sendStatus(403);
      }
      req.headers["userEmail"] = user.username;
      req.headers["role"] = user.role;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { authenticateJwt, SECRET };