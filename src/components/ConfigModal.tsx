import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { Modal, Dialog } from '@mui/material';
import { NOTES } from './../global/constants';
import NotesChordsRadio from './../components/NotesChordsRadio';
import MajorMinorRadio from './../components/MajorMinorRadio';
import { Layout } from './../global/enums';

interface IConfigModalProps {
    layout: Layout,
}

const ConfigModal = observer((props: IConfigModalProps) => {

    const store = useContext(AppStoreContext);
    const { selectedIndex, handleScaleButtonClick, showConfigModal, setShowConfigModal } = store;

    const { layout } = props;

    const handleCloseModal = () => {
        setShowConfigModal(false);
    };

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

        <Modal open={showConfigModal} onClose={handleCloseModal}>
            <Dialog open={showConfigModal} onClose={handleCloseModal}>

                <div className="flex flex-col items-center p-8 bg-gray-600">

                    <div className="flex-grow w-full space-y-8">
                        <div className="space-y-4">
                            <p style={{ fontFamily: "Verdana", color: "white" }}>Select Scale</p>
                            <div className={gridClassName}>
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
                        </div>

                        <div className="space-y-4">
                            <p style={{ fontFamily: "Verdana", color: "white" }}>Scale Type</p>
                            <div className="flex justify-center">
                                <MajorMinorRadio />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p style={{ fontFamily: "Verdana", color: "white" }}>Show Notes or Chords</p>
                            <div className="flex justify-center">
                                <NotesChordsRadio />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleCloseModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                style={{ marginTop: "10px" }}
                            >
                                Close
                            </button>
                        </div>

                    </div>

                </div>

            </Dialog>
        </Modal>

    );

})

export default ConfigModal;