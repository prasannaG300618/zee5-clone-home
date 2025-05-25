import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HomeService } from '../home.service';
import { UserService } from 'src/user/user.service';
@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private homeService: HomeService, private userService:UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    let premiumUser = req.headers["premium"]
    if (!req.query.accessId || !premiumUser ) return false;

    try {
      let show = this.homeService.play({ accessId: req.query.accessId });
      return show.then((res) => {
        if (res.length <= 0) return false;
        if(!res[0].premium) return true
        if (res[0].premium && (premiumUser === "true")) {
          return true;
        } else {
          return false;
        }
      });
    } catch {
      return true;
    }
  }
}
