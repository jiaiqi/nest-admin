import { IsNotEmpty, Matches } from "class-validator";
import { regPositiveOrEmpty } from "../utils/regex.util";

export class CommonDTO {
    // 主键
    // @IsNotEmpty({ message: '_id 不能为空' })
    // @Matches(regPositiveOrEmpty, { message: '请输入有效 _id' })
    readonly _id: string;

    // 创建时间
    // 特殊列，自动设置为实体的插入时间。 不需要在此列中手动写入值，该值会自动设置
    readonly createAt: Date;

    // 更新时间
    //每次从实体管理器或存储库调用save时自动设置为实体更新时间的特殊列。 不需要在此列中手动写入值，该值会自动设置。
    readonly updateAt: Date;
}