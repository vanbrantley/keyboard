import { useEffect, useContext } from "react";
import { KEY_TO_NOTE, NOTES2, VALID_KEYS } from './../global/constants';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import Key from "./Key";

const Keyboard = observer(() => {

    const store = useContext(AppStoreContext);
    const { pressedKeys, setPressedKeys, playNote, selectedIndex } = store;

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.repeat) {
            return;
        }
        const key = event.key;
        const note = KEY_TO_NOTE[key];
        if (!pressedKeys.includes(note) && VALID_KEYS.includes(key)) {
            setPressedKeys([...pressedKeys, note]);
        }
        playNote(note);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        const key = event.key;
        const note = KEY_TO_NOTE[key];
        const index = pressedKeys.indexOf(note);
        if (index > -1) {
            const updatedPressedKeys = [...pressedKeys.slice(0, index), ...pressedKeys.slice(index + 1)];
            setPressedKeys(updatedPressedKeys);
        }
    };

    useEffect(() => {
        // Add event listeners when the component mounts
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up by removing event listeners when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys]);

    const shownNotes = (selectedIndex > 9) ? NOTES2.slice(5) : NOTES2.slice(0, -5);

    const keys = shownNotes.map((note) => {
        return (
            <Key key={note} note={note} />
        );
    });

    return (
        <div>
            <div className="piano">
                {keys}
            </div>
        </div>
    );

});

export default Keyboard;