import { IPCSend } from "../../../utils/electron/ipc-renderer/ipc-send";
import { ComponentBindings } from "../component-bindings";
import { BindFunctionDictionary } from "../dictionary";


export class ModalBindDefinitions implements ComponentBindings {
    keyArray: string[]

    constructor(input: string[]) {
        this.keyArray = input
    }

    evalKeys(bindsToCompare: string[]) {
        // for (const iterator of this.keyArray) {
        //     if (iterator === bindsToCompare[0]) {
        //         return BindFunctionDictionary.closeModal
        //     }
        // }

        if (bindsToCompare[0] === this.keyArray[0]) {
            IPCSend.log.debug("bind triggered")
            return BindFunctionDictionary.closeModal
        }

    }
}