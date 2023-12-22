import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const NotesChordsRadio = observer(() => {

    const store = useContext(AppStoreContext);
    const { isChord, handleChordsButtonClick, handleNotesButtonClick } = store;

    return (

        <div className="flex space-x-2">
            <button
                className={`${isChord ? 'bg-white text-black' : 'bg-black text-white'} 
                cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleNotesButtonClick}
            >
                Notes
            </button>
            <button
                className={`${isChord ? 'bg-black text-white' : 'bg-white text-black'} 
                cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleChordsButtonClick}
            >
                Chords
            </button>
        </div>

    );

});

export default NotesChordsRadio;