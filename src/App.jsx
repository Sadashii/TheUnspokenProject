import './App.css'
import {useState, useEffect} from "react";
import supabase from "./supabase.js";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {Stage, Layer} from "react-konva"
import { MessageContainer, Navbar, NewMessageModal } from "./components/index.js";


const STAGE_SIZE = 10000;
const OFFSET = STAGE_SIZE / 2;

function App() {
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select('*');
      if (error) console.error('Supabase error:', error);
      else setNotes(data);
    };
    fetchNotes();
  }, []);

  return (
    <div className="main">
      <TransformWrapper
        initialScale={1}
        minScale={window.innerHeight / STAGE_SIZE}
        maxScale={2}
        wheel={{ step: 50 }}
        panning={{ velocityDisabled: true }}
        centerOnInit
        centerZoomedOut
        initialPositionX={-OFFSET + window.innerWidth / 2}
        initialPositionY={-OFFSET + window.innerHeight / 2}
        minPositionX={-OFFSET}
        maxPositionX={OFFSET}
        minPositionY={-OFFSET}
        maxPositionY={OFFSET}
      >
        {() => {
          const [newMessageData, setNewMessageData] = useState({editing_content: false})


          const updateMessageField = (field, value) => {
            setNewMessageData(prev => ({...prev, [field]: value}));
          }

          const onCanvasClick = (event) => {
            console.log(event.evt.offsetX, event.evt.offsetY)


            if (newMessageData.editing_coordinates) {

              const addNote = async () => {
                const { data, error } = await supabase
                  .from('notes')
                  .insert([{
                    to_name: newMessageData.to_name,
                    content: newMessageData.content,
                    emoji: newMessageData.emoji,
                    x: event.evt.offsetX - OFFSET,
                    y: event.evt.offsetY - OFFSET,
                    reactions: {}
                  }])
                  .select();

                console.log(data)
                if (error) console.error('Supabase error:', error);
                else setNotes(prev => ([...prev, data[0]]));
              };
              addNote();
              cancelCreate()

              alert("We've saved your message, thank you!")

            }
          }

          const cancelCreate = () => {
            setNewMessageData({editing_content: false})
          }


          return (
            <>
              <Navbar onClickCreate={() => updateMessageField('editing_content', true)} notes={notes} OFFSET={OFFSET} />

              <NewMessageModal
                show={newMessageData.editing_content && !newMessageData.editing_coordinates}
                newMessageData={newMessageData}
                updateMessageField={updateMessageField}
                cancelCreate={cancelCreate}
              />




              <TransformComponent wrapperClass={"stage"}>
                <Stage
                  width={STAGE_SIZE}
                  height={STAGE_SIZE}
                  style={{border: "3px solid black"}}
                  onClick={onCanvasClick}
                  onTap={onCanvasClick}
                >
                  <Layer>
                    {notes.map(note => (
                      <MessageContainer key={note.id} note={note} OFFSET={OFFSET} onClick={e => console.log(e)} />
                    ))}
                  </Layer>
                </Stage>
              </TransformComponent>
            </>
          )
        }}
      </TransformWrapper>
    </div>
  );
}

export default App;
