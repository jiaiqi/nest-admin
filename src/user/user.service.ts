import { Inject, Injectable } from '@nestjs/common';
import { SystemService } from 'src/shared/system.service';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mongo.entity';

@Injectable()
export class UserService {
  constructor(private readonly systemService: SystemService,
    @Inject("USER_REPOSITORY")
    private readonly userRespository: MongoRepository<User>) { }

  create(createUserDto: CreateUserDto) {
    // console.log('Env:', this.systemService.getEnv());

    // return 'This action adds a new user';

    return this.userRespository.save({
      name: 'lyc',
      email: '1@111.com'
    })
  }

  findAll() {
    return this.userRespository.findAndCount({
      
    })
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
