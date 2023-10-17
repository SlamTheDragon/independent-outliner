import { app } from "electron"
import { Logging } from "./logging/logging"

const logging = new Logging('shutdown handler')

export class Shutdown {
    private static _exitCode: number
    
    constructor(exitCode: number) {
        Shutdown._exitCode = exitCode

        logging.info(`Application Closing Gracefully...`)
        Shutdown.cleanUp()
    }
    
    public static cleanUp() {
        // add clean up code here

        logging.info(`Application exiting with exit code: ${this._exitCode}`)
        app.exit(this._exitCode)
    }
}