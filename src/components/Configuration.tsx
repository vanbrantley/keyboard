import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { NOTES } from './../global/constants';

const Configuration = observer(() => {

    const store = useContext(AppStoreContext);
    const { selectedIndex, isMajor, isChord, setShowConfigModal } = store;

    const handleOpenModal = () => {
        setShowConfigModal(true);
    };

    return (
        <div className="flex items-center space-x-4">
            <p style={{ color: "white", fontFamily: "Verdana", fontSize: "24px" }}>{NOTES[selectedIndex]} {isMajor ? "Major" : "Minor"} {isChord ? "chords" : "notes"}</p>
            <IconButton size="large" onClick={handleOpenModal}>
                <TuneIcon fontSize="large" style={{ color: "gray" }} />
            </IconButton>
        </div>
    );

});

export default Configuration;