import { useEffect, useContext } from "react";
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES } from './../global/constants';
import MiniKeyboard from "./MiniKeyboard";

const MobileLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { isMajor, selectedIndex, scaleNotes, chordNotes,
        getScale, getChords, handleScaleButtonClick, playChord } = store;

    // keep these useEffects until you implement mobx store autorun
    // get scale notes once the index or scale type changes
    useEffect(() => {
        getScale(selectedIndex)
    }, [selectedIndex, isMajor]);

    // chords change when scale notes change - could potentially just get these together...
    useEffect(() => {
        getChords();
    }, [scaleNotes]);


    return (

        <div className="h-screen flex">
            <div className="w-full">

                <div className="h-1/5 flex flex-col items-center bg-blue-500">
                    <br></br>
                    <MiniKeyboard scaleNotes={scaleNotes.slice(0, 8)} />
                </div>
                <div className="h-1/5 flex flex-col items-center bg-yellow-500">
                    <br></br>
                    <div className="grid grid-cols-6 gap-4">
                        {NOTES.map((note, index) => (
                            <button
                                key={note}
                                onClick={() => handleScaleButtonClick(index)}
                                className={`${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                                    } font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
                            >
                                {note}
                            </button>
                        ))}
                    </div>

                </div>
                <div className="h-3/5 flex flex-col items-center bg-orange-500">
                    <br></br>
                    {(scaleNotes.length === 0) ?
                        null
                        :
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                                return (
                                    <button
                                        key={chordNumber}
                                        onClick={() => playChord(notes)}
                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        {chordNumber}
                                    </button>
                                );
                            })}
                        </div>
                    }
                </div>

            </div>
        </div>


    );

});

export default MobileLayout;