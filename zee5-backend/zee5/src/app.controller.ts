import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('http://localhost:4200/dashboard' + '?token=' + jwt);
    else res.redirect('http://localhost:4200');
  }
}
