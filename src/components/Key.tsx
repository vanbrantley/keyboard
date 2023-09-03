import { NOTE_TO_KEY } from "../global/constants";

interface IKeyProps {
    note: string,
    scaleNotes: string[],
    pressedKeys: string[],
    playNoteOnClick: (note: string) => void
}

const Key = (props: IKeyProps) => {

    const { note, scaleNotes, pressedKeys, playNoteOnClick } = props;

    const handleClick = () => {
        playNoteOnClick(note); // Pass the 'note' as an argument
    };

    const isFlat = note.length > 2;
    const isPressed = pressedKeys.includes(NOTE_TO_KEY[note]);
    const inScale = scaleNotes.includes(note);

    const keyClassName = `key ${isFlat ? 'flat' : ''} ${isPressed ? 'pressed' : ''}`;
    const keyTextClassName = `key-text ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''}`;

    return (
        <div className={keyClassName} onClick={handleClick}>
            <div className={keyTextClassName}>{NOTE_TO_KEY[note]}</div>
        </div>
    );

};

export default Key;