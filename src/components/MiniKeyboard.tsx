import { useContext } from 'react';
import MiniKey from './MiniKey';
import { NOTES2 } from './../global/constants';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';

const MiniKeyboard = observer(() => {

    const store = useContext(AppStoreContext);
    const { selectedIndex } = store;

    const shownNotes = (selectedIndex > 9) ? NOTES2.slice(5) : NOTES2.slice(0, -5);

    const keys = shownNotes.map((note, index) => {
        return (
            <MiniKey key={note} note={note} />
        );
    });

    return (
        <div className="piano">
            {keys}
        </div>
    );

});

export default MiniKeyboard;