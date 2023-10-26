import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const MajorMinorRadio = observer(() => {

    const store = useContext(AppStoreContext);
    const { isMajor, setIsMajor } = store;

    const handleMajorButton = () => {
        if (!isMajor) {
            setIsMajor(true);
        }
    };

    const handleMinorButton = () => {
        if (isMajor) {
            setIsMajor(false);
        }
    };

    return (

        <div className="flex space-x-2">
            <button
                className={`${isMajor ? 'bg-black text-white' : 'bg-white text-black'} text-white cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleMajorButton}
            >
                Major
            </button>
            <button
                className={`${isMajor ? 'bg-white text-black' : 'bg-black text-white'} text-white cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleMinorButton}
            >
                Minor
            </button>
        </div>

    );

});

export default MajorMinorRadio;