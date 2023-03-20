import { UserModule } from './../user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [forwardRef(() => UserModule), CommonModule],
  controllers: [AuthController],
})
export class AuthModule {}
