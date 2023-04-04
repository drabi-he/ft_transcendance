import { UserService } from './../user/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { config } from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { RankService } from 'src/rank/rank.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly rankService: RankService,
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
        rank: await this.rankService.findOne({ id: 1 }),
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
  @Get('user')
  async getUser(@Req() req) {
    try {
      const cookie = req.cookies['jwt'];

      const id = (await this.jwtService.verifyAsync(cookie))['id'];
      return {
        status: 'Success',
        data: await this.userService.findOne({ id }),
      };
    } catch (error) {
      return { status: 'Error', data: {}, message: 'User not found' };
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    try {
      res.clearCookie('jwt');
      return { status: 'Success', data: {} };
    } catch (error) {
      return { status: 'Error', data: {} };
    }
  }

  @UseGuards(AuthGuard)
  @Patch('user')
  async updateUser(
    @Req() req,
    @Body() data: { username?: string; avatar?: string },
  ) {
    const cookie = req.cookies['jwt'];

    const id = (await this.jwtService.verifyAsync(cookie))['id'];
    console.log({ data });

    const user = await this.userService.findOne({ id: id });

    this.userService.update(id, {
      username:
        data.username && data.username.toLowerCase() !== 'username'
          ? data.username
          : user.username,
      avatar: data.avatar ? data.avatar : user.avatar,
    });
    return {
      status: 'Success',
      data: await this.userService.findOne({ id: id }),
    };
  }
}
