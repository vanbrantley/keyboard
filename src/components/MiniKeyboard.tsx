import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES2 } from './../global/constants';
import MiniKey from './MiniKey';

const MiniKeyboard = observer(() => {

    const store = useContext(AppStoreContext);
    const { selectedIndex } = store;

    // conditionally set range of keys on keyboard based on scale root note
    const determiningNote = 'A0';
    const determiningIndex = NOTES2.indexOf(determiningNote);

    // show C0 - E0 keys
    const lowerKeys = NOTES2.slice(0, -5);
    // shift keyboard to start at F0 and include highest notes
    const higherKeys = NOTES2.slice(5);

    const shownNotes = (selectedIndex > determiningIndex) ? higherKeys : lowerKeys;

    const keys = shownNotes.map((note, index) => {
        return (
            <MiniKey key={note} note={note} />
        );
    });

    return (
        <div className="piano">
            {keys}
        </div>
    );

});

export default MiniKeyboard;