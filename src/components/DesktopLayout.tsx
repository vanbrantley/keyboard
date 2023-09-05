import { useEffect, useContext } from "react";
import Keyboard from "./../components/Keyboard";
import { NOTES, NOTES2, NOTE_TO_KEY } from './../global/constants';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const DesktopLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { isMajor, selectedIndex, scaleNotes, chordNotes, setScaleNotes, setChordNotes,
        getScale, getChords, playChord, handleScaleButtonClick, handleRadioChange } = store;

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

                <div className="h-3/5 flex flex-col items-center bg-blue-500">
                    <br></br>
                    <Keyboard scaleNotes={scaleNotes.slice(0, 8)} />

                    <br></br>

                    <div className="flex space-x-4">
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

                    <br></br>

                    <div>
                        <label>
                            <input
                                type="radio"
                                value="major"
                                checked={isMajor}
                                onChange={handleRadioChange}
                            />
                            Major
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="minor"
                                checked={!isMajor}
                                onChange={handleRadioChange}
                            />
                            Minor
                        </label>
                    </div>

                </div>

                <div className="h-2/5 flex justify-center bg-green-500">
                    {(scaleNotes.length === 0) ?
                        null
                        :
                        <div className="flex space-x-16">
                            {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                                return (
                                    <button
                                        key={chordNumber}
                                        onClick={() => playChord(notes)}
                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        {chordNumber}: {NOTE_TO_KEY[notes[0]]} {NOTE_TO_KEY[notes[1]]} {NOTE_TO_KEY[notes[2]]}
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

export default DesktopLayout;