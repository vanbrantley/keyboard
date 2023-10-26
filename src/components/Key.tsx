import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTE_TO_KEY } from "../global/constants";

interface IKeyProps {
    note: string,
    scaleNotes: string[],
    pressedKeys: string[],
}

const Key = observer((props: IKeyProps) => {

    const store = useContext(AppStoreContext);
    const { playNote } = store;

    const { note, scaleNotes, pressedKeys } = props;

    const isFlat = note.length > 2;
    const isPressed = pressedKeys.includes(note);
    const inScale = scaleNotes.includes(note);

    const keyClassName = `key ${isFlat ? 'flat' : ''} ${isPressed ? 'pressed' : ''}`;
    const keyTextClassName = `key-text ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''}`;

    return (
        <div className={keyClassName} onClick={() => playNote(note)}>
            <div className={keyTextClassName} style={{ fontFamily: "Verdana" }}>{NOTE_TO_KEY[note]}</div>
        </div>
    );

});

export default Key;