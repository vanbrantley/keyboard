import MiniKey from "./MiniKey";
import { NOTES2 } from "./../global/constants";

interface IMiniKeyboardMiniProps {
    chordNotes: string[],
}

const MiniKeyboardMini = (props: IMiniKeyboardMiniProps) => {

    const startPoints = [0, 5, 12, 17];
    const endPoints = [11, 16, 23, 28];

    const findStartPoint = (arr: number[], val: number) => {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] <= val) return arr[i];
        }
    };

    const findEndPoint = (arr: number[], val: number) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= val) return arr[i];
        }

    };

    const findKeys = (notes: string[]): [number, number] => {

        // find first note index in NOTES2
        const firstNote = notes[0];
        const firstNoteIndex = NOTES2.indexOf(firstNote);
        const startPoint = findStartPoint(startPoints, firstNoteIndex)!;

        // find end note index in NOTES2
        const lastNote = notes[notes.length - 1];
        const lastNoteIndex = NOTES2.indexOf(lastNote);
        const endPoint = findEndPoint(endPoints, lastNoteIndex)!;

        return [startPoint, endPoint];

    }

    const [startIndex, endIndex] = findKeys(props.chordNotes);

    const keys = NOTES2.slice(startIndex, endIndex + 1).map((note, index) => {
        return (
            // <MiniKey key={note} note={note} scaleNotes={props.chordNotes} pressedKeys={[]} />
            <MiniKey key={note} note={note} />
        );
    });

    return (
        <>

            <div className="piano">
                {keys}
            </div>

        </>
    );

}

export default MiniKeyboardMini;