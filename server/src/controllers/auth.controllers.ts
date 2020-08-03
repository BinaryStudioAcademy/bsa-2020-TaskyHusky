import { Request, Response } from 'express';
import { MockUser } from '../../config/passport.config';

class AuthController {
    sendSuccessMessage = (req: Request, res: Response) => {
        const { password, ...user } = req.user as MockUser; // write fields you want to exclude before '...user'
        res.send(user);
    }
}

export default AuthController;
