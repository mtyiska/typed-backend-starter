import express, {Express} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ORIGIN, REFRESH_TOKEN_SECRET } from "./config";
import { verify } from "jsonwebtoken";
import User from "./entity/User";
import { createAccessToken, createRefreshToken } from "./utils/auth";

export const createApp = () => {
  const app: Express = express();

  app.use(express.json());

  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: ORIGIN,
      optionsSuccessStatus: 200,
    })
  )

  app.get("/", (_,res) => res.send("hello world"));
  app.post("/refresh_token", async (req,res) =>{
    const token = req.cookies!.token;
    if(!token){
      return res.send({ok:false, accessToken:""})
    }

    let payload:any = null;
    try {
      payload = verify(token,REFRESH_TOKEN_SECRET!)
    } catch (err) {
      console.warn(err);
      return res.send({ok:false, accessToken:""})
    }

    // token is valid and we can send back access
    const user = await User.findOne({email: payload.email});

    if(!user){
      return res.send({ok: false, accessToken: ""});
    }


    res.cookie("token", createRefreshToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return res.send({ok: true, accessToken:createAccessToken(user)});

  });

  return app;
}
