import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const MajorMinorRadio = observer(() => {

    const store = useContext(AppStoreContext);
    const { isMajor, handleMajorMinorRadioChange } = store;

    return (

        <div className="flex space-x-2">
            <label className="text-white">
                <input
                    type="radio"
                    value="major"
                    checked={isMajor}
                    onChange={handleMajorMinorRadioChange}
                />
                Major
            </label>
            <label className="text-white">
                <input
                    type="radio"
                    value="minor"
                    checked={!isMajor}
                    onChange={handleMajorMinorRadioChange}
                />
                Minor
            </label>
        </div>

    );

});

export default MajorMinorRadio;