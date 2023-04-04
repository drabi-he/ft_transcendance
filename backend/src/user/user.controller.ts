import { RankService } from './../rank/rank.service';
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.find({ avatar: true, username: true });
    return { status: 'Success', data: [...users] };
  }

  @Get(':username')
  async getUserProfile(@Param('username') username: string) {
    const user = await this.userService.findOne({ username }, ['rank']);
    return user;
  }
}
