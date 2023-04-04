import {
  ObjectIdColumn,
  ObjectID, //将实体中的属性标记为 ObjectID。 此装饰器仅用于 MongoDB。 MongoDB 中的每个实体都必须具有 ObjectID 列
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
  @CreateDateColumn() // 特殊列，自动设置为实体的插入时间。 不需要在此列中手动写入值，该值会自动设置
  createAt: Date;

  // 更新时间
  @UpdateDateColumn() //每次从实体管理器或存储库调用save时自动设置为实体更新时间的特殊列。 不需要在此列中手动写入值，该值会自动设置。
  updateAt: Date;

  // 软删除
  @Column({
    default: false, // 添加数据库级列的DEFAULT值。
    select: false, //  定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认值select：true。
  })
  isDelete: boolean;

  // 更新次数
  // VersionColumn - 每次从实体管理器或存储库调用save时自动设置为实体版本（增量编号）的特殊列。 不需要在此列中手动写入值，该值会自动设置。
  @VersionColumn({
    select: false,
  })
  version: number;
}
