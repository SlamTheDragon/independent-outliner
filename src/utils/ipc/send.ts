

export class Send {
    public static msg() {
        try {
            const e = window.electron.ipcRenderer;  
            e.send('e', 'payload');
        } catch (error) {
            console.error(error);
        }
    }
}