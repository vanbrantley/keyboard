import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { Layout } from './../global/enums';

interface IChordButtonsProps {
    layout: Layout,
}

const ChordButtons = observer((props: IChordButtonsProps) => {

    const store = useContext(AppStoreContext);
    const { isMajor, scale, chordNotes, playChord } = store;

    const { layout } = props;

    let outerDivClassName = ""
    let buttonClassName = "";
    const styleName = ((layout == Layout.Mobile) ? { width: "100%", height: "100%" } : {});

    switch (layout) {
        case Layout.Desktop:
            outerDivClassName = "flex flex-grow";
            buttonClassName = "flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
            break;
        case Layout.Mobile:
            outerDivClassName = "grid grid-cols-2";
            buttonClassName = "h-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
            break;
        case Layout.MobileLandscape:
            outerDivClassName = "flex flex-grow";
            buttonClassName = "flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
            break;
    };

    return (
        <div className={outerDivClassName} style={styleName}>
            {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                const chordName = isMajor ? `${scale}${chordNumber}` : `${scale}m${chordNumber}`;
                const noteLetters = notes.map(note => note.replace(/\d/g, ' '));
                return (
                    <button
                        key={chordNumber}
                        onClick={() => playChord(chordName, notes)}
                        className={buttonClassName}
                    >
                        <p style={{ margin: 0, marginBottom: '24px', fontFamily: "Verdana", fontSize: "24px" }}>{chordNumber}</p>
                        {(layout != Layout.MobileLandscape) && <p style={{ margin: 0, fontFamily: "Verdana", fontSize: "24px" }}>{noteLetters.join(' ')}</p>}
                    </button>
                );
            })}
        </div>
    );

});

export default ChordButtons;