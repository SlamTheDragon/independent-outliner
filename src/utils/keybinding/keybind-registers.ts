/* eslint-disable @typescript-eslint/no-namespace */
// APP > MAIN

export class KeybindRegisters {
    // Declare variables for the function dictionary

    // global keybinds
    public static closeModal: string[] | undefined
    public static devtools: string[] | undefined

    // Add JSON decoder

    // Assign JSON to mapped functions

    // Export those mapped keys to be compared by the binding system (keyFunctions in keybinds.ts)

    /**
     * We must differentiate if a certain element is closable or is a part of a component (like a modal vs
     * floating window when pressing esc)
    */


    /**
     * Use this template to construct keybinds:
     * string: {[MODIFIER KEYS], KEYBOARD KEY}
     * separator: +
     * 
     * Example: 
     *   raw string - "CmdOrCtrl+Z"
     *   decoded object - [CTRL, Z]
     * Use cases:
     *   - raw string provides display for menubar accelerators to use and also to
     *     store keybind data to the json file
     *   - decoded object is used for component binding decoding system where keybinds will
     *     be assigned.
     * Summary:
     *   - There will be two pipelines that will handle keybindings. Electron Main & Renderer
    */
}

