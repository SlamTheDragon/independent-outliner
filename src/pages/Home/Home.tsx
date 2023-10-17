import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useModalOperation } from '../../utils/component-utils/modalOperation'
import { IPCSend } from '../../utils/electron/ipc-renderer/ipc-send'
import { decrement, increment, selectCount } from '../../components/slice/counterSlice'
import Button from '../../components/common/Button'
import style from "./home.module.scss"
import { ComponentRegistration } from '../../utils/keybinding/keybinds'
import { ComponentID } from '../../utils/keybinding/dictionary'


export default function Home() {
    // const navigate = useNavigate()

    // get
    
    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()

    // function forward() {
    //     navigate('/error')
    // }

    function exit() {
        IPCSend.window.exit()
    }

    function test() {
        IPCSend.log.verbose('verbose')
        IPCSend.log.debug('debug')
        IPCSend.log.info('info')
        IPCSend.log.warn('warn')
        IPCSend.log.error('error')
    }

    function fatalTest() {
        try {
            throw new Error('Test Fatal Error')
        } catch (error) {
            IPCSend.log.fatal(error)
        }
    }

    function other() {
        IPCSend.window.fullscreen()
        IPCSend.window.toTray()
        IPCSend.master.unexpectedQuit()
    }

    function dispatchOpenModal() {
        openModal('Test', 0)
    }

    function onInteract() {
        ComponentRegistration.set(ComponentID.default)
        IPCSend.log.debug('Default Component Mounted')
    }

    return (
        <div onMouseEnter={onInteract}>
            <Button classItem='primary' onClick={exit}>exit</Button>
            <Button classItem='primary' onClick={test}>test</Button>
            <Button classItem='primary' onClick={other}>trigger other</Button>
            <Button classItem='danger' onClick={fatalTest}>trigger other</Button>
            <Button classItem='primary' onClick={dispatchOpenModal}>modal</Button>
        </div>
    )
}