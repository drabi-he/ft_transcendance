import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { config } from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/login/42Network')
  async login42Network(@Query('code') code, @Res({ passthrough: true }) res) {
    config();
    const rst = await fetch(
      `https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_id=${process.env.INTRA_UID}&client_secret=${process.env.INTRA_SECRET}&code=${code}&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Flogin%2F42Network`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    const data = await rst.json();

    const profile = await fetch('https://api.intra.42.fr/v2/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const info = await profile.json();

    console.log({
      fn: info.first_name,
      ln: info.last_name,
      login: info.login,
      cl: info.cursus_users[1].level,
      campus: info.campus[0].name,
    });

    // return { info };
    if (!(await this.userService.findOne({ login: info.login }))) {
      await this.userService.create({
        first_name: info.first_name,
        last_name: info.last_name,
        login: info.login,
        username: info.login,
        cursus_lvl: info.cursus_users[1].level,
        campus: info.campus[0].name,
      });
    }

    const user = await this.userService.findOne({ login: info.login });

    console.log({ user });
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    res.cookie('jwt', jwt, { httpOnly: true });

    return res.redirect('http://localhost:3000');
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUser(@Req() req) {
    const cookie = req.cookies['jwt'];

    const id = (await this.jwtService.verifyAsync(cookie))['id'];

    if (!id) {
      return { status: 'Error', data: {}, message: 'User not found' };
    }

    return { status: 'Success', data: await this.userService.findOne({ id }) };
  }
}
