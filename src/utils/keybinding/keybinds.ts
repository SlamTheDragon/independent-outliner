// APP > RENDERER

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPCSend } from "../electron/ipc-renderer/ipc-send"
import { ComponentID } from "./dictionary"
import { ModalBindDefinitions } from "./component-bindings/modal-binding"
import { DefaultBindDefinitions } from "./component-bindings/default-binding"


/**
 * ComponentRegistration class for managing the active components that the user is currently on.
 * (probably implemented incorrectly but it works)
 */
export class ComponentRegistration {
    /**
     * The currently active ComponentID.
     */
    public static get: ComponentID | undefined = undefined

    /**
     * Sets the active ComponentID.
     * @param registerID - The ComponentID to be set as active.
     */
    public static set(registerID: ComponentID | undefined) {
        this.get = registerID
    }
}

/**
 * Keybinds class for handling keyboard event bindings.
 */
export class Keybinds {
    // Private static properties to store key state and registered keys
    private static _accumulator: any[] = []
    private static _registerKeys: any[] = []

    // Modifier states for CONTROL, ALT, and SHIFT keys.
    private static _modifierCTRL = false
    private static _modifierALT = false
    private static _modifierSHIFT = false

    /**
     * Watches for keydown events and captures key combinations.
     * @param keys - The keyboard event object.
     */
    public static watch(keys: KeyboardEvent) {
        // Return if the keys are repeating
        if (keys.repeat) return

        // Stop key duplication just in case by iterating to the entire list (even though this method
        // stops working after a key release... maybe remove?)
        for (const contents of this._accumulator) {
            if (contents === keys.key) { return }
        }

        // Booleans for special modifier keys
        if (keys.key.toUpperCase() === "CONTROL") {
            this._modifierCTRL = true
            return
        }
        if (keys.key.toUpperCase() === "ALT") {
            this._modifierALT = true
            return
        }
        if (keys.key.toUpperCase() === "SHIFT") {
            this._modifierSHIFT = true
            return
        }

        // push the sequence of keystrokes into memory
        this._accumulator.push(keyCorrection())

        // Correction since we're using string (might change in the later future)
        function keyCorrection() {
            if (keys.key === " ") {
                return "SPACE"
            } else {
                return keys.key.toUpperCase()
            }
        }
    }

    /**
     * Returns an array of registered key combinations for processing.
     * @returns The array of registered key combinations.
     */
    public static registerSnapshot() {
        // Filter if accumulator is empty
        const compareIfEmpty: any[] = []

        // Using the first key in array to check if the accumulator is empty since it doesn't work without it...
        // for... some reason :3c
        if (this._accumulator[0] !== compareIfEmpty[0]) {
            IPCSend.log.verbose(`[KEYBIND HANDLER] [CTRL:${this._modifierCTRL.toString().toUpperCase()} ALT:${this._modifierALT.toString().toUpperCase()} SHIFT:${this._modifierSHIFT.toString().toUpperCase()}] For Key: ${this._accumulator}`)
            this._registerKeys = this._accumulator
            this._accumulator = []
            return this._registerKeys
        }
    }

    /**
     * Processes key combinations based on component context.
     * @param bindsToCompare - Array of key combinations to compare.
     * @param componentContext - The context in which the key combinations originate.
     * @returns The result of evaluating key combinations.
     */
    public static keyFunctions(bindsToCompare: string[], componentContext: ComponentID) {


        const modalBinds = new ModalBindDefinitions(
            // FIXME: Define these binds and make their binding definition somewhere where a user can assign custom for certain actions.
            ["ESCAPE"]
        )
        const defaultBinds = new DefaultBindDefinitions(
            ["F12"]
        )
        
        // declare an evaluation entry point to be evaluated by the
        // FIXME: we have a problem here. See "layering" in "./src/pages/Home/Home.tsx"

        // if the default keybindings is meant to be globally available then

        switch (componentContext) {
            case ComponentID.default:
                return defaultBinds.evalKeys(bindsToCompare)
            case ComponentID.modal:
                return modalBinds.evalKeys(bindsToCompare)

            default:
                break
        }
    }

    /**
     * Releases modifier keys based on the provided modifier name.
     * @param modifier - The name of the modifier key (e.g., "CONTROL", "ALT", "SHIFT").
     */
    public static releaseModifiers(modifier: string) {
        if (modifier === "CONTROL") this._modifierCTRL = false
        if (modifier === "ALT") this._modifierALT = false
        if (modifier === "SHIFT") this._modifierSHIFT = false
    }
}
