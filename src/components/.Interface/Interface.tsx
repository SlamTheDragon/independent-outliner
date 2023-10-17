import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, selectCount } from '../slice/counterSlice'
import { useModalOperation } from '../../utils/component-utils/modalOperation'
import { Send } from '../../utils/ipc/send'
import {ReactComponent as Logo} from "../../assets/svg/SlamTheDragon Logo.svg"
import Button from "../common/Button";
import style from "./interface.module.scss"

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    // get
    const count = useSelector(selectCount)
    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()

    function test() {
        Send.msg()
    }

    return (
        <div className={style.interface}>
            
            {/* <Logo/> */}

            <h1 id="output" style={{marginBottom: 10}}>
                Open <u>Interface.tsx</u> and Start Editing!
            </h1>

            <div style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
                <Button classItem='primary' onClick={() => dispatch(decrement())}>-</Button>
                <h1 style={{ marginTop: 0, marginBottom: 0 }}>
                    {count}
                </h1>
                <Button classItem='primary' onClick={() => dispatch(increment())}>+</Button>

                <Button classItem='primary' onClick={() => {test()}}>Close Window</Button>

                <Button classItem='primary' onClick={() => openModal("Sample Title", count)}>Feature Toggle</Button>
            </div>


            <div style={{ opacity: 0.7, padding: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <span>template by <a href="https://github.com/SlamTheDragon" target="blank">SlamTheDragon</a></span>
                <span>Check out this template repository's main <a href="https://github.com/SlamTheDragon/slam-electron-template/blob/main/README.md" target="blank">README.md</a></span>
            </div>
        </div>
    );
}