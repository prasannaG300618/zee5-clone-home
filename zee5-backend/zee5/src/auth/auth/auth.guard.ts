import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { request, response } from 'express';
import *as jwt from "jsonwebtoken"
import { jwtConstants } from '../constants';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = request;
    let res = response;
    const bearer = req.headers["token"] as string
    if (!bearer) return false

    try {
      const decoded = jwt.verify(bearer,jwtConstants.secret as string) as jwt.JwtPayload;
      console.log(decoded.credential);
      async function getDetails(userService) {
        let details = await userService.findUser(decoded.credential);
        console.log(details);
        req["user"] = details;
        if(details) return true
        return false
      }
      getDetails(this.userService)
    }catch(e){
      return false
    }
    return true
  }
}
