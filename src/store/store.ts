import { observable, action, computed, makeObservable } from 'mobx';
import { NOTES, NOTES2 } from './../global/constants';

type StringArrayDictionary = {
    [key: string]: string[];
};

class AppStore {

    // state variables
    isMajor = true;
    isChord = false;
    selectedIndex = -1;
    scaleNotes: string[] = [];
    allScaleNotes: string[] = [];
    chordNotes: StringArrayDictionary = {};
    pressedKeys: string[] = [];
    showLab = false;
    showConfigModal = false;
    progressionChordIndices: number[] = [];

    constructor() {

        makeObservable(this, {

            isMajor: observable,
            isChord: observable,
            selectedIndex: observable,
            scaleNotes: observable,
            allScaleNotes: observable,
            chordNotes: observable,
            pressedKeys: observable,
            showLab: observable,
            showConfigModal: observable,
            progressionChordIndices: observable,
            scale: computed,
            chordNames: computed,
            chordFilesInfo: computed,

        });

    }

    // computed functions
    get scale() {
        return this.selectedIndex !== -1 ? NOTES[this.selectedIndex] : '';
    };

    get chordNames() {
        return this.selectedIndex !== -1
            ? (this.isMajor
                ? [`${this.scale}I1`, `${this.scale}ii`, `${this.scale}iii`, `${this.scale}IV`, `${this.scale}V`, `${this.scale}vi`, `${this.scale}vii°`, `${this.scale}I2`,]
                : [`${this.scale}mi1`, `${this.scale}mii°`, `${this.scale}mIII`, `${this.scale}miv`, `${this.scale}mv`, `${this.scale}mVI`, `${this.scale}mVII`, `${this.scale}mi2`,])
            : [];
    };

    get chordFilesInfo() {
        return this.chordNames.map((chord) => ({
            key: chord,
            id: chord,
            src: `./../../chords/${chord}.mp3`,
            preload: 'auto',
        }));
    };

    // setter functions
    setIsMajor = action((newValue: boolean) => {
        this.isMajor = newValue;
    });

    setIsChord = action((newValue: boolean) => {
        this.isChord = newValue;
    });

    setSelectedIndex = action((newValue: number) => {
        this.selectedIndex = newValue;
    });

    setScaleNotes = action((newValue: string[]) => {
        this.scaleNotes = newValue;
    });

    setAllScaleNotes = action((newValue: string[]) => {
        this.allScaleNotes = newValue;
    });

    setChordNotes = action((newValue: StringArrayDictionary) => {
        this.chordNotes = newValue;
    });

    setPressedKeys = action((newValue: string[]) => {
        this.pressedKeys = newValue;
    });

    setShowLab = action((newValue: boolean) => {
        this.showLab = newValue;
    });

    setShowConfigModal = action((newValue: boolean) => {
        this.showConfigModal = newValue;
    });

    setProgressionChordIndices = action((newValue: number[]) => {
        this.progressionChordIndices = newValue;
    });

    addProgressionChordIndex = action((newValue: number) => {
        if (this.progressionChordIndices.length < 8) {
            this.progressionChordIndices.push(newValue);
        } else {
            console.warn("Array limit reached. Cannot add more elements.");
        }
    });

    removeProgressionChordIndex = action((index: number) => {
        this.progressionChordIndices.splice(index, 1);
    });


    // updating functions
    addPressedKey = action((newKey: string) => {
        this.pressedKeys.push(newKey);
    });

    removePressedKey = action((keyToRemove: string) => {
        this.pressedKeys = this.pressedKeys.filter((key) => key !== keyToRemove);
    });

    getScale = action((index: number) => {

        if (this.selectedIndex === -1) {
            this.setScaleNotes([]);
            return;
        }

        // major - W W H W W W H
        // minor - W H W W H W W
        // added one more note to scale to complete
        var scaleIndices = this.isMajor ?
            [index, index + 2, index + 4, index + 5, index + 7, index + 9, index + 11, index + 12, index + 14, index + 16, index + 17, index + 19]
            : [index, index + 2, index + 3, index + 5, index + 7, index + 8, index + 10, index + 12, index + 14, index + 15, index + 17, index + 19];

        const leftBound = 0;
        const rightBound = NOTES2.length - 1;
        console.log(rightBound);
        console.log(NOTES2);
        console.log(NOTES2[leftBound]);
        console.log(NOTES2[rightBound]);

        // want to keep sliding left until left < leftBound, keep sliding right until right > rightBound
        // add to left and right and check those conditions before you ever index the array to avoid outOfBounds errors

        // you know you're starting at index which is inbounds, and currently ending at index + 19 which is also inbounds
        // ooo think you want to have that, then do little searches to left and right of index & index + 19 & make little subarrays for them
        // then append all of the arrays together

        var leftSteps: number[] = this.isMajor ? [1, 3, 5, 7, 8, 10, 12] : [2, 4, 5, 7, 9, 10, 12];
        var rightSteps: number[] = this.isMajor ? [2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21] : [2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20];

        var leftScaleIndices: number[] = [];
        var rightScaleIndices: number[] = [];

        // construct left and right scale indices arrays
        var left = index;
        var right = index + 12;

        // crawl to the left
        for (let i = 0; i < leftSteps.length; i++) {

            const newIndex = left - leftSteps[i];
            if (newIndex < leftBound) break;
            leftScaleIndices.push(newIndex);

        }

        // crawl to the right
        for (let i = 0; i < rightSteps.length; i++) {

            const newIndex = right + rightSteps[i];
            if (newIndex > rightBound) break;
            rightScaleIndices.push(newIndex);

        }

        leftScaleIndices.reverse();

        console.log('Left indices: ', leftScaleIndices);
        console.log('Normal indicies: ', scaleIndices.slice(0, 8));
        console.log('Right indices: ', rightScaleIndices);

        const allScaleIndices = leftScaleIndices.concat(scaleIndices.slice(0, 8), rightScaleIndices);
        console.log('All indices: ', allScaleIndices);

        // map over indices array, extract elements from notes array
        var scaleNotes = scaleIndices.map(i => NOTES2[i]);
        this.setScaleNotes(scaleNotes);
        var allScaleNotes = allScaleIndices.map(i => NOTES2[i])
        this.setAllScaleNotes(allScaleNotes);

    });

    getChords = action(() => {

        if (this.scaleNotes.length === 0) {
            this.setChordNotes({});
            return;
        }

        var chordNums = this.isMajor ? ['I1', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°', 'I2'] : ['i1', 'ii°', 'III', 'iv', 'v', 'VI', 'VII', 'i2'];
        var chords: StringArrayDictionary = {};

        for (let i = 0; i < chordNums.length; i++) {
            chords[chordNums[i]] = [this.scaleNotes[i], this.scaleNotes[i + 2], this.scaleNotes[i + 4]];
        }

        this.setChordNotes(chords);

        // console.log("Scale notes: ", scaleNotes);
        // console.log("Chords: ", chords);

    });

    playChord = action((chordName: string, notes: string[]) => {

        if (notes) {
            const chordAudio = new Audio((document.getElementById(chordName) as HTMLAudioElement)?.src || '');
            chordAudio.play();

            // add keys to pressedKeys array for a second
            this.setPressedKeys([...this.pressedKeys, ...notes]);

            setTimeout(() => {
                const notesRemoved = this.pressedKeys.filter((key) => !notes.includes(key));
                this.setPressedKeys(notesRemoved);
            }, 800);

        }

    });

    playNote = (note: string | undefined) => {
        if (note) {
            const noteAudio = new Audio((document.getElementById(note) as HTMLAudioElement)?.src || '');
            noteAudio.play();

            // add key to pressedKeys array for a second
            this.setPressedKeys([...this.pressedKeys, note]);

            setTimeout(() => {
                const noteRemoved = this.pressedKeys.filter((key) => key !== note);
                this.setPressedKeys(noteRemoved);
            }, 300);
        }
    };

    handleScaleButtonClick = action((index: number) => {

        if (index === this.selectedIndex) this.setSelectedIndex(-1);
        else this.setSelectedIndex(index);

    });

}

const appStore = new AppStore();
export default appStore;

