import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES } from "../global/constants";
import { Layout } from '../global/enums';

interface INoteButtonsProps {
    layout: Layout,
}

const ConfigNoteButtons = observer((props: INoteButtonsProps) => {

    const store = useContext(AppStoreContext);
    const { selectedIndex, handleScaleButtonClick } = store;

    const { layout } = props;

    // conditional number of grid columns based on layout
    let gridClassName = "";
    switch (layout) {
        case Layout.Desktop:
            gridClassName = "grid grid-cols-4";
            break;
        case Layout.Mobile:
            gridClassName = "grid grid-cols-3";
            break;
        case Layout.MobileLandscape:
            gridClassName = "grid grid-cols-6";
            break;
    };

    return (
        <div className={gridClassName}>
            {NOTES.map((note, index) => (
                <button
                    key={note}
                    onClick={() => handleScaleButtonClick(index)}
                    className={`${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'}
                    font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                >
                    {note}
                </button>
            ))}
        </div>
    );

});

export default ConfigNoteButtons;