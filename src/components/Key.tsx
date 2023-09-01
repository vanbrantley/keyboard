import { NOTE_TO_KEY } from "../global/constants";

interface IKeyProps {
    note: string,
    scaleNotes: string[],
    pressedKeys: string[]
}

const Key = (props: IKeyProps) => {

    const isFlat = props.note.length > 2;
    const isPressed = props.pressedKeys.includes(NOTE_TO_KEY[props.note]);
    const inScale = props.scaleNotes.includes(props.note);

    const keyClassName = `key ${isFlat ? 'flat' : ''} ${isPressed ? 'pressed' : ''}`;
    const keyTextClassName = `key-text ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''}`;

    return (
        <div className={keyClassName}>
            <div className={keyTextClassName}>{NOTE_TO_KEY[props.note]}</div>
        </div>
    );

};

export default Key;