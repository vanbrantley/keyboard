import { NOTE_TO_KEY } from "../global/constants";

interface IKeyProps {
    note: string,
    scaleNotes: string[],
    pressedKeys: string[],
}

const Key = (props: IKeyProps) => {

    const { note, scaleNotes, pressedKeys } = props;

    const isFlat = note.length > 2;
    const isPressed = pressedKeys.includes(note);
    const inScale = scaleNotes.includes(note);

    const keyClassName = `key ${isFlat ? 'flat' : ''} ${isPressed ? 'pressed' : ''}`;
    const keyTextClassName = `key-text ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''}`;

    return (
        <div className={keyClassName}>
            <div className={keyTextClassName}>{NOTE_TO_KEY[note]}</div>
        </div>
    );

};

export default Key;