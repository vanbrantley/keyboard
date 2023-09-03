import { useState, useEffect } from "react";
import "./../styles/styles.module.css";
import Keyboard from "./../components/Keyboard";
import { NOTES, NOTES2, NOTE_TO_KEY } from './../global/constants';

type StringArrayDictionary = {
    [key: string]: string[];
};

const DesktopLayout = () => {

    const [isMajor, setIsMajor] = useState<boolean>(true);
    const [scaleNotes, setScaleNotes] = useState<string[]>([]);
    const [chordNotes, setChordNotes] = useState<StringArrayDictionary>({});

    const getScale = (index: number) => {

        if (scaleNotes[0] === NOTES2[index]) {
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

    useEffect(() => {
        getChords();
    }, [scaleNotes]);

    return (


        <div className="h-screen flex">
            <div className="w-full">

                <div className="h-1/2 flex flex-col items-center bg-blue-500">
                    <br></br>
                    <Keyboard scaleNotes={scaleNotes} />

                    <br></br>

                    <div className="flex space-x-4">
                        {NOTES.map((note, index) => (
                            <button
                                key={note}
                                onClick={() => getScale(index)}
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            >
                                {note}
                            </button>
                        ))}
                    </div>

                </div>

                <div className="h-1/2 flex justify-center bg-green-500">
                    {(scaleNotes.length === 0) ?
                        null
                        :
                        <div className="flex space-x-16">
                            {Object.entries(chordNotes).map(([key, value]) => {
                                return (
                                    <p key={key}>
                                        {key}: {NOTE_TO_KEY[value[0]]} {NOTE_TO_KEY[value[1]]} {NOTE_TO_KEY[value[2]]}
                                    </p>
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