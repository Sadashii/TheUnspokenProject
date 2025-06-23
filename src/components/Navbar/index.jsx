import "./styles.css"
import {useControls} from "react-zoom-pan-pinch";

const Navbar = ({ onClickCreate, notes, OFFSET }) => {
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
          <div className="option">About</div>
          <div className="option" onClick={visitRandomNote}>Random</div>
          <div className="post_a_message" onClick={onClickCreate}>Post a message</div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;