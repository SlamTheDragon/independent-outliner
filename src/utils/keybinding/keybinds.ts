// APP > RENDERER

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPCSend } from "../electron/ipc-renderer/ipc-send"
import { ComponentID } from "./dictionary"
import { ModalBindDefinitions } from "./component-bindings/modal-binding"


/**
 * ComponentRegistration class for managing the active component identification.
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
     * @param e - The keyboard event object.
     */
    public static watch(e: KeyboardEvent) {
        // Return if the keys are repeating
        if (e.repeat) return

        for (const key of this._accumulator) {
            if (key === e.key) {
                return
            }
        }

        if (e.key.toUpperCase() === "CONTROL") {
            this._modifierCTRL = true
            return
        }
        if (e.key.toUpperCase() === "ALT") {
            this._modifierALT = true
            return
        }
        if (e.key.toUpperCase() === "SHIFT") {
            this._modifierSHIFT = true
            return
        }

        this._accumulator.push(e.key.toUpperCase())
    }

    /**
     * Returns an array of registered key combinations for processing.
     * @returns The array of registered key combinations.
     */
    public static registerSnapshot() {
        // Filter if accumulator is empty
        const compareIfEmpty: any[] = []

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

        switch (componentContext) {
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
