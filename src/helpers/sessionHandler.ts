import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

interface ISession {
    token: string;
    user: any;
}

interface IRequest extends Request {
    session: any;
}

class Session {
    setSession(req: Request | IRequest, data: ISession) {
        (req as IRequest).session['user'] = JSON.stringify(data);
    }

    getCurrentSeesion(req: Request) {
        const user = JSON.parse(req.session.user);
        if(!user){
            return null;
        }
        return user;
    }

    deleteSession(req: Request | IRequest) {

    }
    
}

export const sessionHandler = new Session();