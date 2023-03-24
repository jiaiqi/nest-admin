import { PaginationParamsDto } from '@/shared/dtos/pagination-params.dto';
import { Inject, Injectable } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { SystemService } from 'src/shared/system.service';
import { Equal, MongoRepository, Not } from 'typeorm';
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

  async findAll({ page, pageSize }): Promise<{ data: User[], count: number }> {
    console.log(page);

    const [data, count] = await this.userRespository.findAndCount({
      order: { createdAt: "DESC" },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    })
    return { data, count }
    // return `This action returns all user`;
  }

  async findAll2({ page, order, where }): Promise<{ data: User[], count: number }> {
    // createdAt: "DESC" 
    let orderParams = {}
    if (Array.isArray(order) && order.length > 0) {
      order.forEach(item => {
        orderParams[item.column] = item.type
      })
    } else if (order) {
      orderParams = { ...order }
    } else {
      orderParams = { createdAt: "DESC" }
    }

    // const whereParams = {
    // }
    // if (Array.isArray(where) && where.length > 0) {
    //   where.forEach(item => {
    //     switch (item.rule) {
    //       case 'eq':
    //         whereParams[item.column] = item.value
    //         break;
    //       case 'ne':
    //         whereParams[item.column] = new RegExp(`^?!${item.value}$`)
    //         break;
    //       default:
    //         whereParams[item.column] = item.value
    //         break;
    //     }
    //   })
    // }
    // console.log(whereParams,'where');
    
    const [data, count] = await this.userRespository.findAndCount({
      // select:[],
      where,
      order: { ...orderParams },
      skip: (page.current - 1) * page.size,
      take: page.size * 1,
      cache: true,
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
