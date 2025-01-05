import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface IDecode {
  userId: string;
  iat: number;
  exp: number;
}

export class AuthService {
  private authorization: string;

  constructor(
    readonly req: Request,
    readonly res: Response,
    readonly next: NextFunction,
  ) {
    this.authorization = req?.headers?.authorization || "";
  }

  public execute(): Promise<IDecode> | Response<any> | void {
    if (!this.authorization) {
      return this.res.status(401).json({
        message: "Missing token",
      });
    }

    const token = this.authorization.split(" ")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error, decode: IDecode | any) => {
        if (error) {
          return this.res.status(401).json({
            message: "Invalid Token",
          });
        }

        if (decode) {
          this.req.restaurant = {
            id: decode.sub,
            email: decode.email,
          };
        }

        return this.next();
      },
    );
  }
}
