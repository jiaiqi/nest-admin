import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configModuleOptions } from "./configs/module-options";
import { DatabaseProvider } from "./database.providers";
import { SystemService } from "./system.service";


@Module({
    exports: [SystemService, ConfigModule, ...DatabaseProvider],
    providers: [SystemService, ...DatabaseProvider],
    imports: [
        ConfigModule.forRoot(configModuleOptions)
    ]
})
export class ShareModule { }