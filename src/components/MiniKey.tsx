import { NOTE_TO_KEY } from "../global/constants";

interface IMiniKeyProps {
    note: string,
    scaleNotes: string[],
    pressedKeys: string[]
}

const MiniKey = (props: IMiniKeyProps) => {

    const { note, scaleNotes, pressedKeys } = props;

    const isFlat = note.length > 2;
    const inScale = scaleNotes.includes(note);
    const isPressed = pressedKeys.includes(NOTE_TO_KEY[note]);

    const keyClassName = `minikey ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''} ${isPressed ? 'pressed' : ''}`;

    return (
        <div className={keyClassName}></div>
    );

};

export default MiniKey;