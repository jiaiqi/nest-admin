import { AppLogger } from '@/shared/logger/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mongo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: MongoRepository<User>,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(UserService.name)
  }

  create(createUserDto: CreateUserDto) {
    // console.log('Env:', this.systemService.getEnv());
    this.logger.info(null,'user created ...')
    return this.userRepository.save(createUserDto)
    // return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find()
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepository.findBy(id)
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id)

    return `This action removes a #${id} user`;
  }
}
