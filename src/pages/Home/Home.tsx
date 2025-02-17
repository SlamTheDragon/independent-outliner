// import { useDispatch } from 'react-redux'
import { useModalOperation } from '../../utils/component-utils/modalOperation'
import { IPCSend } from '../../utils/electron/ipc-renderer/ipc-send'
import Button from '../../components/common/Button'
import style from "./home.module.scss"
import { ComponentRegistration } from '../../utils/keybinding/keybinds'
import { ComponentID } from '../../utils/keybinding/dictionary'
import { useEffect, useState } from 'react'


export default function Home() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            ComponentRegistration.set(ComponentID.default)
            IPCSend.log.info('Default Interface Attached')
        }
    }, [isLoading])

    useEffect(() => {
        setIsLoading(false)
    }, [])


    // const navigate = useNavigate()

    // get
    
    // set
    // const dispatch = useDispatch()
    const openModal = useModalOperation()

    // function forward() {
    //     navigate('/error')
    // }

    // function exit() {
    //     IPCSend.window.exit()
    // }

    // function test() {
    //     IPCSend.log.verbose('verbose')
    //     IPCSend.log.debug('debug')
    //     IPCSend.log.info('info')
    //     IPCSend.log.warn('warn')
    //     IPCSend.log.error('error')
    // }

    // function fatalTest() {
    //     try {
    //         throw new Error('Test Fatal Error')
    //     } catch (error) {
    //         IPCSend.log.fatal(error)
    //     }
    // }

    // function other() {
    //     IPCSend.window.fullscreen()
    //     IPCSend.window.toTray()
    //     IPCSend.master.unexpectedQuit()
    // }

    /**
     *  TODO:
     * 
     * there are two types of component mounting systems in this app:
     * - the ones that can be rendered such as a modal which only needs once to be registered for keybind tracking
     * - the ones that needs to listen for mouse activity listening if it is currently
     *   on the component with additional keybinds loaded for it also for keybind tracking.
     *   SOME_THINGS_WE_NEED_TO_CONSIDER
     *   (!) We may need a different onFocus system to handle keyboard events separately
     *   (!) We need to edit how the keybinds work in such a way:
     *      - default keybind suppression when a component specific keybind is used
     *        (since we are using switch statements, we may need to add something in there,,, aka layering)
     * 
     * What's the problem?
     * - When it comes to HTML manipulation uh... sometimes the... that ComponentRegistration Class
     *   I created would have no other way to be triggered unless ran via the useEffect hook or via mouse activity.
     *   There is no keyboard mounting for this yet and Im thinking that enabling focus for this to be read via keyboard might
     *   be a good idea
     * 
     * The fuck is the purpose?
     * - Status bar updates, literally what Blender (the 3d app) is doing
     * 
     * Do you have something else to say?
     * - Well yes, mouse bindings and/or actions... which probably should be a separate system but with a very identical setup as how I
     *   created the keybinding system for the keyboard (this is gonna be terrible and I love it)
     * 
     * Got any ideas after some slight brainstorming?
     * - i could just log the history of where the user is at in the renderer so whenever I uhhhh,,, need
     *   to go back into the interface ig i can just (lmao idk what im talking about) iterate on the history backwards 
     *   and apply the previous component id
     * */
    function onInteract() {
        ComponentRegistration.set(ComponentID.default)
        IPCSend.log.debug('Default Interface Mounted')
    }

    return (
        <section
            id='interface'
            className={style.interface}
            onMouseEnter={onInteract}
            // onFocus={onInteract}
        >
            <div>
                <Button classItem='primary' onClick={()=>(openModal("Thingy", 0))}>Auehg</Button>
            </div>
            <div>
                B
            </div>
            <div>
                C
            </div>
        </section>
    )
}