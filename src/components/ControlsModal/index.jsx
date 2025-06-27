import "./styles.css"
import {Modal} from "../index.js";


const ControlsModal = ({show, onClose}) => {
    
    
    return (
        <Modal show={show} onClose={onClose} title={"Controls"} contentClass={"controls-modal"}>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>Drawing</td>
                        <td>🖱️ Left click / ☝️ Single-finger-touch</td>
                    </tr>
                    <tr>
                        <td>Moving</td>
                        <td>🖱️ Right click / ✌️ Two-finger-touch</td>
                    </tr>
                    <tr>
                        <td>Zooming</td>
                        <td>🖱️ Scroll wheel / 🤏 Pinch</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}

export default ControlsModal;