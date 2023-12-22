import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const MajorMinorRadio = observer(() => {

    const store = useContext(AppStoreContext);
    const { isMajor, handleMajorButtonClick, handleMinorButtonClick } = store;

    return (

        <div className="flex space-x-2">
            <button
                className={`${isMajor ? 'bg-black text-white' : 'bg-white text-black'} 
                cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleMajorButtonClick}
            >
                Major
            </button>
            <button
                className={`${isMajor ? 'bg-white text-black' : 'bg-black text-white'} 
                cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center`}
                onClick={handleMinorButtonClick}
            >
                Minor
            </button>
        </div>

    );

});

export default MajorMinorRadio;