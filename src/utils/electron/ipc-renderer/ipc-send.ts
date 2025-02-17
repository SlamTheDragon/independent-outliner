/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPCChannels, IPCChannelFunction } from "./ipc-channel-dictionary"

/**
 * Class representing IPCWindow.
 * Handles various window-related events and returns IPCPayloads.
 */
class IPCWindow {
    /**
     * Returns an IPCPayload to set the window to fullscreen mode.
     * @returns IPCPayload with channel "window" and corresponding function call.
     */
    fullscreen() { return new IPCPayload(IPCChannels.window, IPCChannelFunction.window.fullscreen()) }
    /**
     * Returns an IPCPayload to exit the application.
     * @returns IPCPayload with channel "window" and corresponding function call.
     */
    exit() { return new IPCPayload(IPCChannels.window, IPCChannelFunction.window.exit()) }
    /**
     * Returns an IPCPayload to send the window to the system tray.
     * @returns IPCPayload with channel "window" and corresponding function call.
     */
    toTray() { return new IPCPayload(IPCChannels.window, IPCChannelFunction.window.toTray()) }
    /**
     * Returns an IPCPayload to open the developer tools for debugging.
     * @returns IPCPayload with channel "window" and corresponding function call.
     */
    openDevTools() { return new IPCPayload(IPCChannels.window, IPCChannelFunction.window.openDevTools()) }
}

/**
 * Class representing IPCMaster.
 * Handles the unexpected quit event and returns an IPCPayload.
 */
class IPCMaster {
    /**
     * Returns an IPCPayload for the unexpected quit event.
     * @returns IPCPayload with channel "master" and corresponding function call.
     */
    unexpectedQuit() { return new IPCPayload(IPCChannels.master, IPCChannelFunction.master.unexpectedQuit()) }
}

/**
 * Class representing IPCLogging.
 * Provides logging functionality and returns IPCPayloads.
 */
class IPCLogging {
    /**
     * Logs a verbose message and returns an IPCPayload.
     * @param input - The message to be logged.
     * @returns IPCPayload with channel "log" and verbose level.
     */
    verbose(input: any) {
        console.debug('[VERBOSE]', input)
        return new IPCPayload(IPCChannels.log, [0, input])
    }
    /**
     * Logs a debug message and returns an IPCPayload.
     * @param input - The message to be logged.
     * @returns IPCPayload with channel "log" and debug level.
     */
    debug(input: any) {
        console.debug('[DEBUG]', input)
        return new IPCPayload(IPCChannels.log, [1, input])
    }
    /**
     * Logs an info message and returns an IPCPayload.
     * @param input - The message to be logged.
     * @returns IPCPayload with channel "log" and info level.
     */
    info(input: any) {
        console.info('[INFO]', input)
        return new IPCPayload(IPCChannels.log, [2, input])
    }
    /**
     * Logs a warning message and returns an IPCPayload.
     * @param input - The message to be logged.
     * @returns IPCPayload with channel "log" and warning level.
     */
    warn(input: any) {
        console.warn('[WARN]', input)
        return new IPCPayload(IPCChannels.log, [3, input])
    }
    /**
     * Logs an error message and returns an IPCPayload.
     * @param input - The message to be logged.
     * @returns IPCPayload with channel "log" and error level.
     */
    error(input: any) {
        console.error('[ERROR]', input)
        return new IPCPayload(IPCChannels.log, [4, input])
    }
    /**
     * Logs a fatal error message and returns an IPCPayload.
     * @param input - The message to be logged.
     * @returns IPCPayload with channel "log" and fatal error level.
     */
    fatal(input: any) {
        console.error('[FATAL]', input)
        return new IPCPayload(IPCChannels.log, [5, input])
    }
}

/**
 * Class representing IPCPayload.
 * Builds and sends IPCPayloads to the Main process.
 */
class IPCPayload {
    private static _channel: string
    private static _args: any[]

    /**
     * Constructs an IPCPayload with a channel and arguments.
     * @param channel - The channel for the IPC message.
     * @param args - The arguments to be sent.
     */
    constructor(channel: string, ...args: any[]) {
        IPCPayload._channel = channel
        IPCPayload._args = args

        IPCPayload.push()
    }

    /**
     * Sends the IPCPayload to the Main process.
     */
    private static push() {
        window.electron.ipcRenderer.send(this._channel, ...this._args)
    }
}

/**
 * Exposes IPC functions to the Renderer process.
 */
export class IPCSend {
    /**
     * Provides access to window-related IPC functions.
     */
    public static window = new IPCWindow
    /**
     * Provides access to master-related IPC functions.
     */
    public static master = new IPCMaster
    /**
     * Provides access to logging-related IPC functions.
     */
    public static log = new IPCLogging
}
