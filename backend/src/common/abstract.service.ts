import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  async findAll(relations = []) {
    return await this.repository.find({ relations });
  }

  async find(fields = {}, condition = {}, relations = []) {
    return await this.repository.find({
      select: fields,
      where: condition,
      relations,
    });
  }

  async paginate(page = 1, take = 10, relations = []) {
    if (page < 1) page = 1;
    if (take < 10) take = 10;
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * take,
      take,
      relations,
    });

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async findOne(condition, relations = []) {
    return await this.repository.findOne({ where: condition, relations });
  }

  async create(data) {
    return await this.repository.save(data);
  }

  async update(condition, data) {
    return await this.repository.update(condition, data);
  }

  async delete(condition) {
    return await this.repository.delete(condition);
  }
}
