import { useRef, useEffect, useState } from "react";
import {Circle, Group, Rect, Text} from "react-konva";
import { EMOJI_MAP } from "../../data/emoji_map.js";

const MessageContainer = ({ note, OFFSET, ...props }) => {
  const WIDTH = 160;
  const FONT_SIZE = 12;

  const textRef = useRef();
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.height());
    }
  }, [note.content, note.to_name, note.emoji]);

  return (
    <Group x={note.x + OFFSET} y={note.y + OFFSET}>
      <Rect
        width={WIDTH + 2}
        height={textHeight + 2}
        fill={"black"}
        offsetY={1}
        offsetX={1}
      />
      <Rect
        width={WIDTH}
        height={textHeight}
        fill={EMOJI_MAP[note.emoji].color}
        shadowBlur={1}
      />

      <Circle
        radius={FONT_SIZE + 1}
        offsetX={-FONT_SIZE / 2}
        offsetY={-FONT_SIZE / 2}
        fill={"black"}
      />
      <Circle
        radius={FONT_SIZE}
        offsetX={-FONT_SIZE / 2}
        offsetY={-FONT_SIZE / 2}
        fill={"white"}
      />


      <Text
        text={note.emoji}
        fill={'#fff'}
        fontSize={FONT_SIZE * 1.5}
        offsetX={6}
        offsetY={2}
        />
      <Text
        ref={textRef}
        text={`     for ${note.to_name}\n\n${note.content}`}
        padding={6}
        fill="#111"
        width={160}
        wrap="word"
      />
    </Group>
  );
};

export default MessageContainer;