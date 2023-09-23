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
    chordNotes: StringArrayDictionary = {};
    pressedKeys: string[] = [];
    showLab = false;
    progressionChordIndices: number[] = [];

    constructor() {

        makeObservable(this, {

            isMajor: observable,
            isChord: observable,
            selectedIndex: observable,
            scaleNotes: observable,
            chordNotes: observable,
            pressedKeys: observable,
            showLab: observable,
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
                ? [`${this.scale}I`, `${this.scale}ii`, `${this.scale}iii`, `${this.scale}IV`, `${this.scale}V`, `${this.scale}vi`, `${this.scale}vii°`]
                : [`${this.scale}mi`, `${this.scale}mii°`, `${this.scale}mIII`, `${this.scale}miv`, `${this.scale}mv`, `${this.scale}mVI`, `${this.scale}mVII`])
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

    setChordNotes = action((newValue: StringArrayDictionary) => {
        this.chordNotes = newValue;
    });

    setPressedKeys = action((newValue: string[]) => {
        this.pressedKeys = newValue;
    });

    setShowLab = action((newValue: boolean) => {
        this.showLab = newValue;
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
        var indices = this.isMajor ? [index, index + 2, index + 4, index + 5, index + 7, index + 9, index + 11, index + 12, index + 14, index + 16, index + 17] : [index, index + 2, index + 3, index + 5, index + 7, index + 8, index + 10, index + 12, index + 14, index + 15, index + 17];

        // map over indices array, extract elements from notes array
        var scale = indices.map(i => NOTES2[i]);
        this.setScaleNotes(scale);

    });

    getChords = action(() => {

        if (this.scaleNotes.length === 0) {
            this.setChordNotes({});
            return;
        }

        var scale2 = this.scaleNotes.concat(this.scaleNotes);
        var chordNums = this.isMajor ? ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'] : ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
        var chords: StringArrayDictionary = {};

        for (let i = 0; i < 7; i++) {
            chords[chordNums[i]] = [scale2[i], scale2[i + 2], scale2[i + 4]];
        }

        this.setChordNotes(chords);

        // console.log("Scale notes: ", this.scaleNotes);
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

    handleMajorMinorRadioChange = action((event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue = event.target.value === 'major';
        if (newValue !== this.isMajor) {
            this.setIsMajor(newValue);
        }

    });

    handleNoteChordRadioChange = action((event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue = event.target.value === 'chords';
        if (newValue !== this.isChord) {
            this.setIsChord(newValue);
        }

    });

}

const appStore = new AppStore();
export default appStore;

