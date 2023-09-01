import { useState, useEffect } from "react";
import "../styles/styles.module.css";
import Key from "./Key";
import { KEY_TO_NOTE, NOTES, NOTES2, VALID_KEYS } from './../global/constants';

interface IKeyboardProps {
    scaleNotes: string[],
}

const Keyboard = (props: IKeyboardProps) => {

    const [pressedKeys, setPressedKeys] = useState<string[]>([]);

    const playNote = (note: string | undefined) => {
        if (note) {
            const noteAudio = new Audio(document.getElementById(note)?.src || '');
            noteAudio.play();
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.repeat) {
            return;
        }
        const key = event.key;
        if (!pressedKeys.includes(key) && VALID_KEYS.includes(key)) {
            setPressedKeys([...pressedKeys, key]);
        }
        playNote(KEY_TO_NOTE[key]);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        const index = pressedKeys.indexOf(event.key);
        if (index > -1) {
            const updatedPressedKeys = [...pressedKeys.slice(0, index), ...pressedKeys.slice(index + 1)];
            setPressedKeys(updatedPressedKeys);
        }
    };

    useEffect(() => {
        // Add event listeners when the component mounts
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up by removing event listeners when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys]);

    const keys = NOTES2.map((note, index) => {
        return (
            <Key note={note} scaleNotes={props.scaleNotes} pressedKeys={pressedKeys} />
        );
    });

    const audioFiles = NOTES2.map((note, index) => {
        return (
            <audio id={note} src={`./../../notes2/${note}.mp3`} />
        );
    });

    return (
        <>
            <div>
                <div className="piano">
                    {keys}
                </div>

                <div>
                    {audioFiles}
                </div>
            </div>
        </>
    );

};

export default Keyboard;

function handleKeyUp(this: Window, ev: KeyboardEvent) {
    throw new Error("Function not implemented.");
}
