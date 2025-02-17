/**
 * This component requires Redux to work.
 * Here is the overview on how this component works:
 * 
 * ### UPON LOAD ###
 * - if (!props.isOpen) return null
 * Modal wont be displayed unless isOpen turns to be true.
 * - function onInteract()...
 * Modal will finish loading its final state whenever the user starts interacting to it. 
 * This, to prevent locking all elements from being accessible. See modalSlice.ts
*/

import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import style from './modal.module.scss'
import { focusComponent } from '../../../utils/focus-element/focusElement'
import { IPCSend } from '../../../utils/electron/ipc-renderer/ipc-send'
import { ComponentRegistration } from '../../../utils/keybinding/keybinds'
import { ComponentID } from '../../../utils/keybinding/dictionary'

interface ModalProps {
    modalTitle: string
    isOpen: boolean
    children?: React.ReactNode
    selectInterface: number
    selectAction?: number
    onClose: () => void
}

/**
 * Reusable, Single-Plug Modal for React.
 * @param {modalTitle} props.modalTitle - string title
 * @param {isOpen} props.isOpen - boolean, state switcher whether to show the modal or not
 * @param {onClose} props.onClose - void function, requires a function to update `props.isOpen`
 * @param {selectInterface} props.selectInterface - number, select a component in the list by key
 * @param {selectAction} props.selectAction - WIP
 * 
 * @returns Modal, Actions
*/
export default function Modal(props: ModalProps) {
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     if (ComponentID.modal) {
    //         focusComponent('modalInterface')
    //         IPCSend.log.debug('Modal Component Mounted.')
    //     }
    // }, [isLoading])

    // useEffect(() => {
    //     setIsLoading(false)
    // }, [])

    if (!props.isOpen) return null

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            ComponentRegistration.set(ComponentID.modal)
            IPCSend.log.debug('Modal Component Mounted')
            document.body.classList.remove('disable-events')
            setTimeout(() => {
                focusComponent('modalInterface')
            }, 10)
        }
    }, [isLoading])

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const childArray = React.Children.toArray(props.children)
    const selectedChild = childArray[props.selectInterface]   

    return (
        <div className={style.modal}>
            
            <div className={style.modalWrapper}>
                <div className={style.modalHeader}>
                    <h3>{props.modalTitle}</h3>
                    <Button onClick={props.onClose}>✖</Button>
                </div>
                <div className={style.modalContainer}>
                    {selectedChild}
                </div>
                <div className={style.modalAction}>
                    <Button id='modalInterface' classItem='primary'>Hello World</Button>
                </div>
            </div>

            <div className={style.modalBackground} onClick={props.onClose} />
        </div>
    )
}