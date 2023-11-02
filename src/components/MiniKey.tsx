import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

interface IMiniKeyProps {
    note: string
}

const MiniKey = observer((props: IMiniKeyProps) => {

    const store = useContext(AppStoreContext);
    const { allScaleNotes, pressedKeys, playNote } = store;

    const { note } = props;

    const isFlat = note.length > 2;
    const inScale = allScaleNotes.includes(note);
    const isPressed = pressedKeys.length == 0 ? false : pressedKeys.includes(note);

    const keyClassName = `minikey ${isFlat ? 'flat' : ''} ${inScale ? 'scale' : ''} ${isPressed ? 'pressed' : ''}`;

    return (
        <div className={keyClassName}></div>
    );

});

export default MiniKey;