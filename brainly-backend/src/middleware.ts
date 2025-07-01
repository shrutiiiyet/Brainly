import { JWT_SECRET } from './config'
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';


declare global {
    namespace Express {
        export interface Request {
            userId?: String;
        }
    }
}


export const UserMiddleWare = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers["authorization"];
    const decodedUser = jwt.verify(header as string, JWT_SECRET);

    if(decodedUser) {

        if(typeof decodedUser === 'string') {
            res.status(403).json ({
                message: "You're not logged in"
            })
            return;
        }

        req.userId = (decodedUser as JwtPayload).id;
        next()
    }
    else {
        res.status(403).json ({
            message: "You're not logged in"
        })
    }
}