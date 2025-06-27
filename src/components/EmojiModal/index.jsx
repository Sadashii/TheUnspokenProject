import "./styles.css"
import {Modal} from "../index.js";
import {EMOJI_MAP} from "../../data/emoji_map.js";


const EmojiModal = ({show, onClose}) => {
    
    
    return (
        <Modal show={show} onClose={onClose} title={"The emojis"} contentClass={"about_emoji"}>
            {Object.keys(EMOJI_MAP).map((emoji, index) => (
                <div key={index} style={{background: EMOJI_MAP[emoji].color}}>
                    <span className="icon">{emoji}</span> {EMOJI_MAP[emoji].description}
                </div>
            ))}
        </Modal>
    )
}

export default EmojiModal;