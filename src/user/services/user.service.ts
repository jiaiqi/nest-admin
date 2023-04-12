import { UploadService } from '@/shared/upload/upload.service';
import { encryptPassword, makeSalt } from '@/shared/utils/cryptogram.util';
import { Inject, Injectable } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { SystemService } from 'src/shared/system.service';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.mongo.entity';
import { getPassword } from '@/shared/utils/user.util';

@Injectable()
export class UserService {
  constructor(
    private readonly systemService: SystemService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: MongoRepository<User>,
    private readonly logger: AppLogger,
    private readonly uploadService: UploadService
  ) {
    this.logger.setContext(UserService.name);
  }

  create(user: CreateUserDto) {
    // 加密处理
    if (user.password) {
      const { salt, hashPassword } = getPassword(user.password)
      user.salt = salt
      user.password = hashPassword
    }
    return this.userRepository.save({ ...user });
  }

  async findAll({ page, size }): Promise<{ data: User[]; count: number }> {
    console.log(page, size);
    const [data, count] = await this.userRepository.findAndCount({
      order: { createAt: 'DESC' },
      skip: (page - 1) * size,
      take: size * 1,
      cache: true,
    });
    return { data, count };
    // return `This action returns all user`;
  }

  async findAll2({
    page,
    order,
    where,
  }): Promise<{ data: User[]; count: number }> {
    // createAt: "DESC"
    let orderParams = {};
    if (Array.isArray(order) && order.length > 0) {
      order.forEach((item) => {
        orderParams[item.column] = item.type;
      });
    } else if (order) {
      orderParams = { ...order };
    } else {
      orderParams = { createAt: 'DESC' };
    }

    const [data, count] = await this.userRepository.findAndCount({
      // select:[],
      where,
      order: { ...orderParams },
      skip: (page.page - 1) * page.size,
      take: page.size * 1,
      cache: true,
    });
    return { data, count };
    // return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy(id);
  }

  async update(id: string, user: CreateUserDto) {
    let post = await this.userRepository.findOneBy(id);
    user = { ...post, ...user };
    // 加密处理
    if (user.password) {
      const { salt, hashPassword } = getPassword(user.password)
      user.salt = salt
      user.password = hashPassword
    }
    await this.userRepository.save(user);
    return await this.userRepository.findOneBy(id);
    // return await this.userRespository.update(id, user);
  }

  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }


  async uploadAvatar(file) {
    const data = await this.uploadService.upload(file)
    return { data, msg: '上传成功', statusCode: 200 }
  }

}
