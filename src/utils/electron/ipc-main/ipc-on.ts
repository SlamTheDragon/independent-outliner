import { ipcMain } from 'electron';
import { IPCChannelList, IPCChannel } from '../ipc-channel-dictionary';
import { Logging } from '../logging/logging';
import { Shutdown } from '../shutdown';


ipcMain.on(IPCChannelList.master, async (event, ...args) => {
    const logging = new Logging('ipc main')

    switch (args[0]) {
        case IPCChannel.master.unexpectedQuit():
            logging.info('hmmm')
            break

        default:
            logging.warn('something went wrong: default was selected')
            break
    }
})

ipcMain.on(IPCChannelList.window, (event, ...args) => {
    const logging = new Logging('ipc window')

    switch (args[0]) {
        case IPCChannel.window.fullscreen():
            logging.debug('fullscreen')
            break
        
        case IPCChannel.window.exit():
            return new Shutdown(0)

        case IPCChannel.window.toTray():
            logging.debug('tray')
            break

        
        default:
            logging.warn('something went wrong: default was selected')
            break
    }
})

ipcMain.on(IPCChannelList.log, async (event, args) => {
    const logging = new Logging('renderer')

    switch (args[0]) {
        case 0:
            logging.verbose(args[1])
            break
        case 1:
            logging.debug(args[1])
            break
        case 2:
            logging.info(args[1])
            break
        case 3:
            logging.warn(args[1])
            break
        case 4:
            logging.error(args[1])
            break
        case 5:
            logging.fatal(args[1])
            break

        default:
            logging.warn('something went wrong: default was selected')
            break
    }
})
