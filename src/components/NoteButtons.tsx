import { NOTES } from "./../global/constants";
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { Layout } from './../global/enums';

interface INoteButtonsProps {
    layout: Layout,
}

const NoteButtons = observer((props: INoteButtonsProps) => {

    const store = useContext(AppStoreContext);
    const { selectedIndex, handleScaleButtonClick } = store;

    const { layout } = props;

    let className = "";

    switch (layout) {
        case Layout.Desktop:
            className = "flex space-x-4";
            break;
        case Layout.Mobile:
            className = "grid grid-cols-6 gap-4";
            break;
        case Layout.MobileLandscape:
            className = "flex space-x-1";
            break;
    };

    return (
        <div className={className}>
            {NOTES.map((note, index) => (
                <button
                    key={note}
                    onClick={() => handleScaleButtonClick(index)}
                    className={`${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                        } font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                >
                    {note}
                </button>
            ))}
        </div>
    );

});

export default NoteButtons;