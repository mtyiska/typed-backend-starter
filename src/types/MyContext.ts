import {Request, Response} from "express";

export interface MyContext{
  req: Request;
  res: Response;
  payload?: {email: string} //optional field. if user is logged in payload exists
}
