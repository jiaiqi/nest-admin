import {
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  VersionColumn,
} from 'typeorm';

// 共用字段
export abstract class Common {
  // 主键
  @ObjectIdColumn()
  _id: ObjectID;

  // 创建时间
  @CreateDateColumn()
  createAt: Date;

  // 更新时间
  @UpdateDateColumn()
  updateAt: Date;

  // 软删除
  @Column({
    default: false,
    select: false,
  })
  isDelete: boolean;

  // 更新次数
  @VersionColumn({
    select: false,
  })
  version: number;
}
