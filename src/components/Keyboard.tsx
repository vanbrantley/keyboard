import { useEffect, useContext } from "react";
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES2 } from './../global/constants';
import Key from "./Key";

const Keyboard = observer(() => {

    const store = useContext(AppStoreContext);
    const { handleKeyDown, handleKeyUp, pressedKeys, selectedIndex } = store;

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

    // conditionally set range of keys on keyboard based on scale root note
    const determiningNote = 'A0';
    const determiningIndex = NOTES2.indexOf(determiningNote);

    // show C0 - E0 keys
    const lowerKeys = NOTES2.slice(0, -5);
    // shift keyboard to start at F0 and include highest notes
    const higherKeys = NOTES2.slice(5);

    const shownNotes = (selectedIndex > determiningIndex) ? higherKeys : lowerKeys;

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