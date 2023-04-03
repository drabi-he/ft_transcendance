import { UserModule } from './../user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { RankModule } from 'src/rank/rank.module';

@Module({
  imports: [forwardRef(() => UserModule), CommonModule, RankModule],
  controllers: [AuthController],
})
export class AuthModule {}
