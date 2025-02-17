import { BindFunctionDictionary } from "./dictionary";

/**
 * Abstract class for defining component bindings. Is it actually necessary? (my knowledge in abstract classes are limited)
 */
export abstract class ComponentBindings {
    /**
     * Array of key combinations associated with the component bindings.
     */
    abstract keyArray: string[]
    /**
     * Evaluates key combinations and returns a corresponding BindFunctionDictionary.
     * @param keyArray - The array of key combinations to evaluate.
     * @returns The corresponding BindFunctionDictionary value.
     */
    abstract evalKeys?(keyArray: string[]): BindFunctionDictionary
}
