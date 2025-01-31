import { RankModule } from './../rank/rank.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UploadController } from './upload.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UploadController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
