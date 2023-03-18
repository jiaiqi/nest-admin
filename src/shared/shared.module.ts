import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configModuleOptions } from "./configs/module-options";
import { SystemService } from "./system.service";

@Module({
    providers: [SystemService, ConfigModule],
    exports: [SystemService],
    imports: [
        ConfigModule.forRoot(configModuleOptions)
    ]
})

export class SharedModule {
}