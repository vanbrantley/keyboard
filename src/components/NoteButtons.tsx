import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

interface IPlayNoteButtonsProps {
    mobileLayout: boolean,
}

const NoteButtons = observer((props: IPlayNoteButtonsProps) => {

    const { mobileLayout } = props;

    const store = useContext(AppStoreContext);
    const { scaleNotes, playNote } = store;

    const className = (mobileLayout ? ("grid grid-cols-2") : ("flex flex-grow"));
    const styleName = (mobileLayout ? { width: "100%", height: "100%" } : {});

    return (
        <div className={className} style={styleName}>
            {scaleNotes.slice(0, 8).map((note) => {
                const noteName = note.slice(0, -1);
                const isFlat = noteName.length > 1;
                return (
                    <button
                        key={note}
                        onClick={() => playNote(note)}
                        className={`flex-grow ${isFlat ? ("bg-black text-white hover:bg-zinc-900") : ("bg-white text-gray-800 hover:bg-gray-300")} 
                        font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
                        <p style={{ fontFamily: "Verdana", fontSize: "24px" }}>{noteName}</p>
                    </button>
                );
            })}
        </div>
    );

});

export default NoteButtons;