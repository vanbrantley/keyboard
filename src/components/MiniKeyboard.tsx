
import { useState } from 'react';
import MiniKey from './MiniKey';
import { NOTES2 } from './../global/constants';

interface IMiniKeyboardProps {
    scaleNotes: string[],
}

const MiniKeyboard = (props: IMiniKeyboardProps) => {

    const [pressedKeys, setPressedKeys] = useState<string[]>([]);

    const keys = NOTES2.map((note, index) => {
        return (
            <MiniKey key={note} note={note} scaleNotes={props.scaleNotes} pressedKeys={[]} />
        );
    });

    return (
        <div className="piano">
            {keys}
        </div>
    );

};

export default MiniKeyboard;