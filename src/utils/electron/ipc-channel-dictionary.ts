/* eslint-disable @typescript-eslint/no-explicit-any */
abstract class IPCSelector {
    abstract unexpectedQuit?(): void
    abstract toTray?(): void
    abstract fullscreen?(): void
    abstract exit?(): void
}

class IPCMaster implements IPCSelector {
    unexpectedQuit() { return "unexpectedQuit" }
}

class IPCWindow implements IPCSelector {
    toTray() { return "toTray" }
    fullscreen() { return "fullscreen" }
    exit() { return "exit" }
}

export class IPCChannel {
    public static master = new IPCMaster()
    public static window = new IPCWindow()
}

export enum IPCChannelList {
    master = "master",
    window = "window",
    log = "log",
}

