import { Inject, Injectable } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { SystemService } from 'src/shared/system.service';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.mongo.entity';

@Injectable()
export class UserService {
  constructor(private readonly systemService: SystemService,
    @Inject("USER_REPOSITORY")
    private readonly userRespository: MongoRepository<User>,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(UserService.name)
  }

  create(user: CreateUserDto) {
    return this.userRespository.save({ ...user })
  }

  async findAll(): Promise<{ data: User[], count: number }> {
    const [data, count] = await this.userRespository.findAndCount({

    })
    return { data, count }
    // return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRespository.findOneBy(id);
  }

  async update(id: string, user: CreateUserDto) {
    return await this.userRespository.update(id, user)
  }

  async remove(id: string): Promise<any> {
    return await this.userRespository.delete(id)
  }
}
