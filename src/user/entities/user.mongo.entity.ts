import { Entity, Column } from 'typeorm';
import { Common } from '@/shared/entities/common.entity';

// Entity-将模型标记为实体。 实体是一个转换为数据库表的类
@Entity()
export class User extends Common {
  // 昵称
  @Column('text')
  name: string;

  // 头像
  @Column('text')
  avatar: string;

  // @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @Column()
  password: string;

  // 手机号
  @Column('text')
  phone: string;

  @Column('boolean')
  verified: boolean;

  // 加密盐
  @Column({
    type: 'text',
    select: false,
  })
  salt: string;

  @Column()
  isAccountDisabled?: boolean;
}
