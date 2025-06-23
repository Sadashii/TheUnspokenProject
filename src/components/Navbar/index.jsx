import "./styles.css"
import {useControls} from "react-zoom-pan-pinch";
import {useState} from "react";
import { AboutModal, EmojiModal } from "../index.js";

const Navbar = ({ onClickCreate, notes, OFFSET }) => {
  const [showAbout, setShowAbout] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)
  const {setTransform} = useControls()
  
  const zoomToNote = (note) => {
    let X= window.innerWidth / 2 - 1 * OFFSET - 1 * note.x - 80;
    let Y= window.innerHeight / 2 - 1 * OFFSET - 1 * note.y - window.innerHeight / 2 + 80;

    setTransform(
      X, Y,
      1,
      250,
    )
  }

  const visitRandomNote = () => {
    let random_note = Math.floor(Math.random() * notes.length)
    let note = notes[random_note];
    zoomToNote(note)
  }
  
  
  return (
    <>
      <nav>
        <div className="icon">
          <img src="./logo_black.png" alt="The Unspoken Project logo"/>
          The<br/>Unspoken<br/>Project
        </div>
        <div className="options">
          <div className="option" onClick={() => setShowAbout(true)}>About</div>
          <div className="option" onClick={() => setShowEmojis(true)}>The Emojis</div>
          <div className="option" onClick={visitRandomNote}>Random</div>
          <div className="post_a_message" onClick={onClickCreate}>Post a message</div>
        </div>
      </nav>
      <AboutModal show={showAbout} onClose={() => setShowAbout(false)} />
      <EmojiModal show={showEmojis} onClose={() => setShowEmojis(false)} />
    </>
  )
}

export default Navbar;