/* eslint-disable @typescript-eslint/no-explicit-any */

//#region Channel Functions
/**
 * Class representing the IPC Master.
 * This class handles events related to the master process.
 */
class IPCMaster {
    /**
     * Handles unexpected quit event.
     * @returns A string indicating "unexpectedQuit".
     */
    unexpectedQuit() { return "unexpectedQuit" }
}

/**
 * Class representing the IPC Window.
 * This class handles events related to the window process.
 */
class IPCWindow {
    /**
     * Sends the window to the system tray.
     * @returns A string indicating "toTray".
     */
    toTray() { return "toTray" }
    /**
     * Sets the window to fullscreen mode.
     * @returns A string indicating "fullscreen".
     */
    fullscreen() { return "fullscreen" }
    /**
     * Exits the application.
     * @returns A string indicating "exit".
     */
    exit() { return "exit" }
    /**
     * Opens the developer tools for debugging.
     * @returns A string indicating "openDevTools".
     */
    openDevTools() { return "openDevTools" }
}
//#endregion

/**
 * Class representing IPC Channel Functions.
 * Provides access to master and window commands.
 */
export class IPCChannelFunction {
    /**
     * Access to the master functions.
     */
    public static master = new IPCMaster()
    /**
     * Access to the window functions.
     */
    public static window = new IPCWindow()
}

/**
 * Enumeration of identifiable channels.
 * Contains channels for master, window, and log processes.
 */
export enum IPCChannels {
    master = "master",
    window = "window",
    log = "log",
}
