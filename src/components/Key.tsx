import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTE_TO_KEY } from "../global/constants";

interface IKeyProps {
    note: string
}

const Key = observer((props: IKeyProps) => {

    const store = useContext(AppStoreContext);
    const { allScaleNotes, pressedKeys, playNote } = store;

    const { note } = props;

    const isFlat = note.length > 2;
    const isPressed = pressedKeys.includes(note);
    const inScale = allScaleNotes.includes(note);

    const keyClassName = `key ${isFlat ? 'flat' : ''} ${isPressed ? 'pressed' : ''}`;
    const keyTextClassName = `key-text ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''}`;

    return (
        <div className={keyClassName} onClick={() => playNote(note)}>
            <div className={keyTextClassName} style={{ fontFamily: "Verdana" }}>{NOTE_TO_KEY[note]}</div>
        </div>
    );

});

export default Key;