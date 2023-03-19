import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from 'typeorm'
import * as path from 'path'
import { createConnection } from "typeorm";

const databaseType: DataSourceOptions['type'] = 'mongodb'
export const DatabaseProviders = [
    {
        provide: 'MONGODB_DATA_SOURCE',
        inject: [ConfigService], //url,用户名,密码
        useFactory: async (ConfigService: ConfigService) => {
            //  createConnection({
            //     type: databaseType,
            //     host: "139.155.86.10",
            //     port: 27017,
            //     database: 'nest_server',
            //     entities: [
            //         path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)
            //     ],
            // })
            const config = {
                type: databaseType,
                // host:"localhost",
                host:"139.155.86.10",
                // port:27017,
                // url: ConfigService.get<string>('database.url'),
                // username: ConfigService.get<string>('database.user'),
                // pasword: ConfigService.get<string>('database.pass'),
                database: ConfigService.get<string>('database.name'),
                entities: [
                    path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)
                ],
                // logging: ConfigService.get<boolean>('database.logging'),
                // synchronize: ConfigService.get<boolean>('database.synchronize'),

            }
            console.log("===== config start ======\n", config);
            console.log("===== config end ======\n");

            const ds = new DataSource(config)
            await ds.initialize()
            return ds

            // const AppDataSource = new DataSource({
            //     type: databaseType,
            //     host: "127.0.0.1",
            //     port: 27017,
            //     database: 'nest_server',
            //     entities: [
            //         path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)
            //     ],
            // })

            // await AppDataSource.initialize()
            // console.log("Data Source has been initialized!")
            // .catch((err) => {
            //     console.error("Error during Data Source initialization", err)
            // })
            // return AppDataSource
        }
    }
]