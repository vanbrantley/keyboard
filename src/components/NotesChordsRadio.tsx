import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const NotesChordsRadio = observer(() => {

    const store = useContext(AppStoreContext);
    const { isChord, handleNoteChordRadioChange } = store;

    return (

        <div className="flex space-x-4">
            <label className="text-white">
                <input
                    type="radio"
                    value="notes"
                    checked={!isChord}
                    onChange={handleNoteChordRadioChange}
                />
                Notes
            </label>
            <label className="text-white">
                <input
                    type="radio"
                    value="chords"
                    checked={isChord}
                    onChange={handleNoteChordRadioChange}
                />
                Chords
            </label>
        </div>

    );

});

export default NotesChordsRadio;