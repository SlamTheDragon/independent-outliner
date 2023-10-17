/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPCChannelList, IPCChannel } from "../ipc-channel-dictionary"

abstract class IPCMethodSelector {
    // main
    abstract unexpectedQuit?(): void

    // window
    abstract fullscreen?(): void
    abstract exit?(): void
    abstract toTray?(): void

    // internal logging
    abstract debug?(arg: any): void
    abstract verbose?(arg: any): void
    abstract info?(arg: any): void
    abstract warn?(arg: any): void
    abstract error?(arg: any): void
    abstract fatal?(arg: any): void
}

class IPCWindow implements IPCMethodSelector {
    fullscreen() {
        return new IPCPayload(IPCChannelList.window, IPCChannel.window.fullscreen())
    }
    exit() {
        return new IPCPayload(IPCChannelList.window, IPCChannel.window.exit())
    }
    toTray() {
        return new IPCPayload(IPCChannelList.window, IPCChannel.window.toTray())
    }
}

class IPCMaster implements IPCMethodSelector {
    unexpectedQuit() {
        return new IPCPayload(IPCChannelList.master, IPCChannel.master.unexpectedQuit())
    }
}

class IPCLogging implements IPCMethodSelector {
    verbose(input: any) {
        console.debug('[VERBOSE]', input)
        return new IPCPayload(IPCChannelList.log, [0, input])
    }
    debug(input: any) {
        console.debug('[DEBUG]', input)
        return new IPCPayload(IPCChannelList.log, [1, input])
    }
    info(input: any) {
        console.info('[INFO]', input)
        return new IPCPayload(IPCChannelList.log, [2, input])
    }
    warn(input: any) {
        console.warn('[WARN]', input)
        return new IPCPayload(IPCChannelList.log, [3, input])
    }
    error(input: any) {
        console.error('[ERROR]', input)
        return new IPCPayload(IPCChannelList.log, [4, input])
    }
    fatal(input: any) {
        console.error('[FATAL]', input)
        return new IPCPayload(IPCChannelList.log, [5, input])
    }
}

class IPCPayload {
    private static _channel: string
    private static _args: any[]

    constructor(channel: string, ...args: any[]) {
        IPCPayload._channel = channel
        IPCPayload._args = args

        IPCPayload.push()
    }

    static push() {
        window.electron.ipcRenderer.send(this._channel, ...this._args)
    }
}

export class IPCSend {
    public static window = new IPCWindow
    public static master = new IPCMaster
    public static log = new IPCLogging
}