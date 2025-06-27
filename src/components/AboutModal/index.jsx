import "./styles.css";
import {Modal} from "../index.js";


const AboutModal = ({show, onClose}) => {
    
    return (
        <Modal show={show} onClose={onClose} title={"About"} contentClass={"aboutmodal"}>
            <p>In 2015, Rora Blue started <a href="https://theunsentproject.com/">the Unsent Project</a> to figure out
                what color people see love in, in this, people submitted colors the people associated with their first
                love. <a
                    href="https://theunsentproject.com/about">Read more</a></p>
            <p>Highly inspired from that, I, Tanishq Sangwan, built this, <b>The Unspoken Project</b> - an interactive
                wall of anonymous messages — a version of The Unsent Project, reimagined through my eyes, beyond just
                love letters.</p>
            <p>Where The Unsent Project collects unsent texts to past lovers, The Unspoken Project invites users to
                express <b>anything they've never been able to say</b> — from friendship, betrayal, and surrender to
                deep secrets and silent grief — all anonymously.</p>
            <p>Every note appears on an almost (infinite) canvas, with it's emoji and message, forming a universe of
                what was left unspoken.</p>
            <p>Github link: <a href="http://github.com/sadashii/TheUnspokenProject">here</a></p>
        </Modal>
    )
}

export default AboutModal;