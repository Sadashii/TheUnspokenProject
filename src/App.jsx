import './App.css'
import {useEffect, useState} from "react";
import supabase from "./supabase.js";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {Layer, Stage} from "react-konva"
import {ControlsModal, Loader, MessageContainer, Navbar, NewMessageModal} from "./components/index.js";


const STAGE_SIZE = 4000;
const OFFSET = STAGE_SIZE / 2;

function App() {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([]);
    const [showControls, setShowControls] = useState(false);
    
    useEffect(() => {
        const fetchNotes = async () => {
            const delay = new Promise(resolve => setTimeout(resolve, 2500)); // minimum wait time
            
            const {data, error} = await supabase.from('notes').select('*');
            if (error) {
                console.error('Supabase error:', error);
            } else {
                setNotes(data);
            }
            
            await delay;
            setLoading(false);
            setShowControls(true);
        };
        
        fetchNotes();
    }, []);
    
    
    return (
        <div className="main">
            <TransformWrapper
                initialScale={1}
                minScale={window.innerHeight / STAGE_SIZE}
                maxScale={2}
                wheel={{step: 50}}
                panning={{velocityDisabled: true}}
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
                        
                        
                        if (newMessageData.editing_coordinates) {
                            
                            const addNote = async () => {
                                const {data, error} = await supabase
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
                            <Navbar onClickCreate={() => updateMessageField('editing_content', true)} notes={notes}
                                    OFFSET={OFFSET}/>
                            
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
                                            <MessageContainer key={note.id} note={note} OFFSET={OFFSET}
                                                              onClick={e => console.log("Container clicked")}/>
                                        ))}
                                    </Layer>
                                </Stage>
                            </TransformComponent>
                        </>
                    )
                }}
            </TransformWrapper>
            <ControlsModal show={showControls} onClose={() => setShowControls(false)}/>
            <div className="controls-helper" onClick={() => setShowControls(true)}>?</div>
            
            {loading && <Loader/>}
        </div>
    );
}

export default App;
