import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const NoteButtons = observer(() => {

    const store = useContext(AppStoreContext);
    const { scaleNotes, playNote } = store;

    return (
        <div className="flex flex-grow">
            {scaleNotes.slice(0, 7).map((note, i) => {
                const noteName = note.slice(0, -1);
                const isFlat = noteName.length > 1;
                return (
                    <button
                        key={noteName}
                        onClick={() => playNote(note)}
                        className={`flex-grow ${isFlat ? ("bg-black text-white hover:bg-zinc-900") : ("bg-white text-gray-800 hover:bg-gray-300")} font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
                        {noteName}

                    </button>
                );
            })}
        </div>
    );

});

export default NoteButtons;