import { Controller, Post, Get, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: any, @Res() res) {
    return this.authService.signin(body, res);
  }

  @Post('username')
  checkUsername(@Body('username') username: string) {
    return this.authService.checkUsername(username);
  }

  @Get('signedin')
  signedin(@Req() req) {
    return this.authService.checkSignedIn(req);
  }

  @Post('signout')
  signout(@Res() res) {
    return this.authService.signout(res);
  }
}
