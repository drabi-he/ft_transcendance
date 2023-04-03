import { CommonModule } from './../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { Rank } from './models/rank.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Rank])],
  controllers: [RankController],
  providers: [RankService],
  exports: [RankService],
})
export class RankModule {}
