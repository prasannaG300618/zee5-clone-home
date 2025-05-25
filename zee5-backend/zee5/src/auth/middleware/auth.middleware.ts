import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { registerDto } from 'src/register/dto/register.dto';
import { jwtConstants } from '../constants';
import { UserService } from 'src/user/user.service';
import { IsPhoneNumber } from 'class-validator';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers["token"] as string
    console.log(bearer)

    if (!bearer) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(
        bearer,
        jwtConstants.secret as string,
      ) as jwt.JwtPayload;
      console.log(decoded.credential);
      async function getDetails(userService) {
        let details = await userService.findUser(decoded.credential);
        req["user"] = details;
        if(details) return next()
       return res.status(401).json({message:"Invalid user"})
      }
      getDetails(this.userService);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
