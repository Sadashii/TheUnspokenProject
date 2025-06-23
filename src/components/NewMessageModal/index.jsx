import {EMOJI_MAP} from "../../data/emoji_map.js";
import {Modal} from "../index.js";
import "./styles.css"

const NewMessageModal = ({show, newMessageData, updateMessageField, cancelCreate}) => {

  const onSubmit = (e) => {
    if (newMessageData.emoji === undefined) {
      alert("Please select an emoji")
      return;
    }
    if (newMessageData.to_name === undefined || newMessageData.to_name.trim() === '') {
      alert("Please enter the name for the person")
      return;
    }
    if (newMessageData.content === undefined || newMessageData.content.trim() === '') {
      alert("Please enter your message")
      return;
    }
    alert("Click on any empty place on the board to save your message there.\nPlease don't click over someone else's message - Thanks")
    updateMessageField("editing_coordinates", true);
  }

  return (
    <Modal show={show} onClose={cancelCreate} title={"Post a new message"} contentClass={"new_message_modal"}>
      <div className="emoji_picker">
        <p className={"title"}>What feeling is this message?</p>
        <div className={"emoji_options"}>
          {Object.keys(EMOJI_MAP).map((emoji, desc) => (
            <div key={desc} className={`emoji_icon ${emoji === newMessageData.emoji ? 'selected_emoji' : ''}`}
                 onClick={() => updateMessageField('emoji', emoji)} style={{background: EMOJI_MAP[emoji].color}}
                 aria-label={EMOJI_MAP[emoji].description}>{emoji}</div>
          ))}
        </div>
      </div>
      <div className="input">
        <p className="title">To</p>
        <input type="text" className="input_field"
               placeholder={"The name of the person, you wish you said the words to"} value={newMessageData.to_name}
               onChange={(e) => updateMessageField('to_name', e.target.value)}/>
      </div>
      <div className="input">
        <p className="title">Message</p>
        <textarea className={"input_field"} rows={3}
                  placeholder={"The words, you wish you said when you had the chance"} value={newMessageData.content}
                  onChange={e => updateMessageField('content', e.target.value)}/>
      </div>
      <div className="submit">
        <button onClick={onSubmit}>Choose the location</button>
      </div>
    </Modal>
  )
}

export default NewMessageModal;