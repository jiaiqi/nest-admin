import { createLogger, Logger } from "winston"

export class AppLogger {
    private context?: string
    private logger: Logger

    public setContext(context:string):void{
        this.context = context
    }

    constructor(){
        this.logger = createLogger({
            
        })
    }
}