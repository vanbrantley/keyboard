import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES } from './../global/constants';
import { Layout } from './../global/enums';
import NotesChordsRadio from './../components/NotesChordsRadio';
import MajorMinorRadio from './../components/MajorMinorRadio';
import ConfigNoteButtons from './ConfigNoteButtons';
import { Modal, Dialog } from '@mui/material';

interface IConfigModalProps {
    layout: Layout,
}

const ConfigModal = observer((props: IConfigModalProps) => {

    const store = useContext(AppStoreContext);
    const { showConfigModal, handleCloseModal } = store;

    const { layout } = props;

    return (

        <Modal open={showConfigModal} onClose={handleCloseModal}>
            <Dialog open={showConfigModal} onClose={handleCloseModal}>

                <div className="flex flex-col items-center p-8 bg-gray-600">

                    <div className="flex-grow w-full space-y-8">
                        <div className="space-y-4">
                            <p style={{ fontFamily: "Verdana", color: "white" }}>Select Scale</p>
                            <ConfigNoteButtons layout={layout} />
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