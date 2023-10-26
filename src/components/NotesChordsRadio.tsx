import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const NotesChordsRadio = observer(() => {

    const store = useContext(AppStoreContext);
    const { isChord, setIsChord } = store;

    const handleChordsButton = () => {
        if (!isChord) {
            setIsChord(true);
        }
    };

    const handleNotesButton = () => {
        if (isChord) {
            setIsChord(false);
        }
    };

    return (

        <div className="flex space-x-2">
            <button
                className={`${isChord ? 'bg-white text-black' : 'bg-black text-white'} text-white cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleNotesButton}
            >
                Notes
            </button>
            <button
                className={`${isChord ? 'bg-black text-white' : 'bg-white text-black'} text-white cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleChordsButton}
            >
                Chords
            </button>
        </div>

    );

});

export default NotesChordsRadio;