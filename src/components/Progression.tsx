import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import MiniKeyboardMini from './MiniKeyboardMini';

type StringArrayDictionary = {
    [key: string]: string[];
};

const Progression = observer(() => {

    const store = useContext(AppStoreContext);
    const { progressionChordIndices, chordNotes, removeProgressionChordIndex } = store;

    const getKeyValuePairAtIndex = (dictionary: StringArrayDictionary, index: number): [string, string[]] => {
        const keys = Object.keys(dictionary);
        const key = keys[index];
        const value = dictionary[key];
        return [key, value];
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ width: "100%", height: "100%" }}>
                {progressionChordIndices.map((index, i) => {
                    const [name, notes] = getKeyValuePairAtIndex(chordNotes, index);
                    return (
                        <div key={i} onClick={() => removeProgressionChordIndex(i)}
                            className="flex flex-col items-center hover:opacity-60 cursor-pointer">
                            <p style={{ color: "white" }}>{name}</p>
                            <MiniKeyboardMini chordNotes={notes} />
                        </div>
                    );
                })}
            </div>
        </div>
    );

});

export default Progression;