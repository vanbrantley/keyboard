import { useContext, useEffect } from "react";
import MiniKeyboard from "./MiniKeyboard";
import { NOTES } from './../global/constants';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const MobileLandscapeLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { isMajor, selectedIndex, scaleNotes, chordNotes, getScale, getChords, playChord, handleScaleButtonClick, handleRadioChange } = store;

    // keep these useEffects until you implement mobx store autorun
    // get scale notes once the index or scale type changes
    useEffect(() => {
        getScale(selectedIndex)
    }, [selectedIndex, isMajor]);

    // chords change when scale notes change - could potentially just get these together...
    useEffect(() => {
        getChords();
    }, [scaleNotes]);

    const scale = NOTES[selectedIndex];

    const chordNames = isMajor ? [`${scale}I`, `${scale}ii`, `${scale}iii`, `${scale}IV`, `${scale}V`, `${scale}vi`, `${scale}vii°`]
        : [`${scale}mi`, `${scale}mii°`, `${scale}mIII`, `${scale}miv`, `${scale}mv`, `${scale}mVI`, `${scale}mVII`];

    const chordFiles = chordNames.map((chord, index) => {
        return (
            <audio key={chord} id={chord} src={`./../../chords/${chord}.mp3`} preload="auto" />
        );
    });

    return (

        <div className="h-screen flex">
            <div className="w-full">

                <div className="h-2/6 flex flex-col items-center justify-center">
                    <MiniKeyboard scaleNotes={scaleNotes.slice(0, 8)} />
                </div>
                <div className="h-2/6 flex flex-col items-center justify-center">
                    <br></br>
                    <div className="flex space-x-4">
                        <label className="text-white">
                            <input
                                type="radio"
                                value="major"
                                checked={isMajor}
                                onChange={handleRadioChange}
                            />
                            Major
                        </label>
                        <label className="text-white">
                            <input
                                type="radio"
                                value="minor"
                                checked={!isMajor}
                                onChange={handleRadioChange}
                            />
                            Minor
                        </label>
                    </div>

                    <div className="flex space-x-1">
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
                </div>
                <div className="h-2/6 flex justify-center">
                    {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                        const chordName = isMajor ? `${scale}${chordNumber}` : `${scale}m${chordNumber}`;
                        return (
                            <button
                                key={chordNumber}
                                onClick={() => playChord(chordName, notes)}
                                className="flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                {chordNumber}
                            </button>
                        );
                    })}
                </div>

            </div>

            <div>
                {chordFiles}
            </div>

        </div>
    )
});

export default MobileLandscapeLayout;