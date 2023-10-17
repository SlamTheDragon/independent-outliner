import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice";
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice";
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice";
import Interface from "./components/.Interface/Interface";
import Modal from "./components/common/Modal";
import Sample1 from "./components/widgets/modal-contents/SsampleContentA";
import DefaultModal from "./components/widgets/modal-contents/DefaulModal";
import Sample2 from "./components/widgets/modal-contents/SsampleContentB";
import Sample3 from "./components/widgets/modal-contents/SsampleContentC";


function App() {
	/***************[ INITIALIZERS ]**************/

	// Redux get
	// ...
	const isModalOpen = useSelector(modalState)
	const getHeader = useSelector(readHeader)
	const getInterfaceID = useSelector(readModalInterface)

	// Redux set
	const dispatch = useDispatch()

	// Initialize
	document.addEventListener('keydown', handleEscapeKeyPress);


	/***************[ SURFACE FUNCTIONS ]**************/
	function handleEscapeKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dispatch(closeModal())
		}
	}

	
	return (
		<>
			<Modal
				// Hover/Open component source for definition
				//
				// Usage:
				// ... Component() {
				// 		const foo = useModalOperation()
				//
				//		return (
				//				<button onClick={() => foo( modalTitle: string, modalInterfaceID: number }> Open Modal </button>	
				// 		)
				// }

				modalTitle={getHeader}
				isOpen={isModalOpen}
				onClose={() => dispatch(closeModal())}
				selectInterface={getInterfaceID}
				selectAction={0}
			>
				{/* You Can Remove This */}
				<DefaultModal key={0} />

				{/* List All Components */}
				<Sample1 key={1} />
				<Sample2 key={2} />
				<Sample3 key={3} />
			</Modal>
			<Interface/>
		</>
	);
}

export default App;
