import { AbstractService } from 'src/common/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from './models/rank.entity';

@Injectable()
export class RankService extends AbstractService {
  constructor(
    @InjectRepository(Rank) private readonly rankRepository: Repository<Rank>,
  ) {
    super(rankRepository);
  }
}
