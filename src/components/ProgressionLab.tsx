import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import Progression from './Progression';

const ProgressionLab = observer(() => {

    const store = useContext(AppStoreContext);
    const { chordNotes, progressionChordIndices, addProgressionChordIndex, removeProgressionChordIndex } = store;

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <div className="h-4/5 w-full flex items-center justify-center">

                {(progressionChordIndices.length !== 0) ? (
                    <Progression />
                ) : (
                    <p style={{ color: "white" }}>Add chords to your progression using the chord number buttons below</p>

                )}

            </div>
            <div className="h-1/5 w-full flex items-center justify-center">
                {Object.entries(chordNotes).map(([chordNumber, notes], index) => {
                    return (
                        <button
                            key={chordNumber}
                            onClick={() => addProgressionChordIndex(index)}
                            className="flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            {chordNumber}
                        </button>
                    );
                })}
            </div>

        </div>
    );

});

export default ProgressionLab;