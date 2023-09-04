import { useState, useEffect } from "react";
import "./../styles/styles.module.css";
import Keyboard from "./../components/Keyboard";
import { NOTES, NOTES2, NOTE_TO_KEY } from './../global/constants';

type StringArrayDictionary = {
    [key: string]: string[];
};

const DesktopLayout = () => {

    const [isMajor, setIsMajor] = useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [scaleNotes, setScaleNotes] = useState<string[]>([]);
    const [chordNotes, setChordNotes] = useState<StringArrayDictionary>({});

    // const selectedIndex = 4;

    const getScale = (index: number) => {

        if (selectedIndex === -1) {
            setScaleNotes([]);
            return;
        }

        // major - W W H W W W H
        // minor - W H W W H W W
        var indices = isMajor ? [index, index + 2, index + 4, index + 5, index + 7, index + 9, index + 11, index + 12, index + 14, index + 16, index + 17] : [index, index + 2, index + 3, index + 5, index + 7, index + 8, index + 10, index + 12, index + 14, index + 15, index + 17];

        // map over indices array, extract elements from notes array
        var scale = indices.map(i => NOTES2[i]);
        setScaleNotes(scale);

    };

    const handleButtonClick = (index: number) => {

        if (index === selectedIndex) setSelectedIndex(-1);
        else setSelectedIndex(index);
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value === 'major';
        console.log("new value: ", newValue);
        console.log("isMajor: ", isMajor);
        if (newValue !== isMajor) {
            setIsMajor(newValue);
        }
    };

    const getChords = () => {

        if (scaleNotes.length === 0) {
            setChordNotes({});
            return;
        }

        var scale2 = scaleNotes.concat(scaleNotes);
        var chordNums = isMajor ? ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'] : ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
        var chords: StringArrayDictionary = {};

        for (let i = 0; i < 7; i++) {
            chords[chordNums[i]] = [scale2[i], scale2[i + 2], scale2[i + 4]];
        }

        setChordNotes(chords);

        console.log("Scale notes: ", scaleNotes);
        console.log("Chords: ", chords);

    };

    const playChord = (notes: string[]) => {

        if (notes) {
            const audioElements = notes.map((note: string) => {
                const audio = new Audio(`./../../notes2/${note}.mp3`);
                audio.load();
                return audio;
            });

            // Play all audio elements concurrently
            audioElements.forEach((audio) => audio.play());
        }
    }

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
                    <Keyboard scaleNotes={scaleNotes} />

                    <br></br>

                    <div className="flex space-x-4">
                        {NOTES.map((note, index) => (
                            <button
                                key={note}
                                onClick={() => handleButtonClick(index)}
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

};

export default DesktopLayout;