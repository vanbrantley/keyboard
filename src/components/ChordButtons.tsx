import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { Layout } from './../global/enums';
import { NOTE_TO_KEY } from "../global/constants";

interface IChordButtonsProps {
    layout: Layout,
}

const ChordButtons = observer((props: IChordButtonsProps) => {

    const store = useContext(AppStoreContext);
    const { isMajor, scale, chordNotes, playChord } = store;

    const { layout } = props;

    // conditional style settings based on layout
    const styleName = ((layout == Layout.Mobile) ? { width: "100%", height: "100%" } : {});
    let outerDivClassName = "";
    let buttonClassName = "";
    let marginBottom = "32px";
    let fontSize = "24px";

    switch (layout) {
        case Layout.Desktop:
            outerDivClassName = "flex flex-grow";
            buttonClassName = "flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
            break;
        case Layout.Mobile:
            outerDivClassName = "grid grid-cols-2";
            buttonClassName = "h-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
            marginBottom = "12px";
            fontSize = "18px";
            break;
        case Layout.MobileLandscape:
            outerDivClassName = "flex flex-grow";
            buttonClassName = "flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
            marginBottom = "12px";
            fontSize = "24px";
            break;
    };

    return (
        <div className={outerDivClassName} style={styleName}>
            {Object.entries(chordNotes).map(([chordNumber, notes]) => {

                const chordName = isMajor ? `${scale}${chordNumber}` : `${scale}m${chordNumber}`;

                const noteKeyboardKeys = notes.map(note => NOTE_TO_KEY[note]).join(' ');
                const noteLetters = notes.map(note => note.replace(/\d/g, ' ')).join(' '); // remove training octave number from note

                const content = (layout === Layout.Desktop) ? noteKeyboardKeys : noteLetters;

                return (
                    <button
                        key={chordNumber}
                        onClick={() => playChord(chordName, notes)}
                        className={buttonClassName}
                    >
                        <p style={{ margin: 0, marginBottom: marginBottom, fontFamily: "Verdana", fontSize: fontSize }}>
                            {chordNumber.replace(/[12]$/, '')}
                        </p>
                        {(layout != Layout.MobileLandscape) &&
                            <p style={{ margin: 0, fontFamily: "Verdana", fontSize: fontSize }}>
                                {content}
                            </p>
                        }
                    </button>
                );
            })}
        </div>
    );

});

export default ChordButtons;