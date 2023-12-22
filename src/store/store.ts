import { observable, action, computed, makeObservable } from 'mobx';
import { NOTES, NOTES2, KEY_TO_NOTE, VALID_KEYS, MAJOR_STEPS, MINOR_STEPS } from './../global/constants';

type StringArrayDictionary = {
    [key: string]: string[];
};

class AppStore {

    // state variables
    isMajor = true;
    isChord = false;
    selectedIndex = -1;
    scaleNotes: string[] = []; // one ocatve of scale notes
    allScaleNotes: string[] = []; // contains all notes on the keyboard that are in the scale
    chordNotes: StringArrayDictionary = {};
    pressedKeys: string[] = [];
    timeoutId: NodeJS.Timeout | null = null;

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
    addPressedNote = action((newNote: string) => {
        this.pressedKeys.push(newNote);
    });

    removePressedNote = action((noteToRemove: string) => {
        this.pressedKeys = this.pressedKeys.filter((note) => note !== noteToRemove);
    });

    handleKeyDown = action((event: KeyboardEvent) => {

        if (event.repeat) {
            return;
        }
        const key = event.key;
        const note = KEY_TO_NOTE[key];
        if (!this.pressedKeys.includes(note) && VALID_KEYS.includes(key)) {
            this.addPressedNote(note);
        }
        this.playNote(note);

    });

    handleKeyUp = action((event: KeyboardEvent) => {

        const key = event.key;
        const note = KEY_TO_NOTE[key];
        const index = this.pressedKeys.indexOf(note);
        if (index > -1) {
            this.removePressedNote(note);
        }

    });

    getPrimaryScaleIndices = (index: number): number[] => {

        const steps = this.isMajor ? MAJOR_STEPS : MINOR_STEPS;
        const scaleIndices = [index];
        let currentStep = index;

        steps.forEach((step) => {
            currentStep += step;
            scaleIndices.push(currentStep);
        });

        return scaleIndices;

    };

    getAllScaleIndices = (index: number, primaryScaleIndices: number[]): number[] => {

        const leftBound = 0;
        const rightBound = NOTES2.length - 1;

        // these arrays can be computed from the scaleIndices (left by reversing)
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

        const allScaleIndices = leftScaleIndices.concat(primaryScaleIndices.slice(0, 8), rightScaleIndices);
        return allScaleIndices;

    };

    getScale = action((index: number) => {

        if (this.selectedIndex === -1) {
            this.setScaleNotes([]);
            return;
        }

        const primaryScaleIndices = this.getPrimaryScaleIndices(index);
        const primaryScaleNotes = primaryScaleIndices.map(i => NOTES2[i]);
        this.setScaleNotes(primaryScaleNotes);

        const allScaleIndices = this.getAllScaleIndices(index, primaryScaleIndices);
        const allScaleNotes = allScaleIndices.map(i => NOTES2[i]);
        this.setAllScaleNotes(allScaleNotes);

    });

    getChords = action(() => {

        if (this.scaleNotes.length === 0) {
            this.setChordNotes({});
            return;
        }

        const chordNums = this.isMajor ? ['I1', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°', 'I2']
            : ['i1', 'ii°', 'III', 'iv', 'v', 'VI', 'VII', 'i2'];
        let chords: StringArrayDictionary = {};

        const scaleRootNote = NOTES2[this.selectedIndex];
        const scaleRootNoteIndex = this.allScaleNotes.indexOf(scaleRootNote);
        const chordRelevantNotes = this.allScaleNotes.slice(scaleRootNoteIndex);

        for (let i = 0; i < chordNums.length; i++) {
            chords[chordNums[i]] = [chordRelevantNotes[i], chordRelevantNotes[i + 2], chordRelevantNotes[i + 4]];
        }

        this.setChordNotes(chords);

    });

    playChord = action((chordName: string, notes: string[]) => {

        if (notes) {
            const chordAudio = new Audio((document.getElementById(chordName) as HTMLAudioElement)?.src || '');
            chordAudio.play();

            // clear existing timeout
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                // clear existing pressedKeys when there's an existing timeout
                this.setPressedKeys([]);
            }

            // add keys to pressedKeys array for time interval
            this.setPressedKeys([...this.pressedKeys, ...notes]);

            // store current pressedKeys state
            const currentPressedKeys = [...this.pressedKeys];

            // remove chord keys from pressedKeys
            this.timeoutId = setTimeout(() => {
                const notesRemoved = currentPressedKeys.filter((key) => !notes.includes(key));
                this.setPressedKeys(notesRemoved);
                this.timeoutId = null;
            }, 800);

        }

    });

    playNote = (note: string | undefined) => {
        if (note) {
            const noteAudio = new Audio((document.getElementById(note) as HTMLAudioElement)?.src || '');
            noteAudio.play();

            this.addPressedNote(note);

            setTimeout(() => {
                this.removePressedNote(note);
            }, 300);
        }
    };

    handleScaleButtonClick = action((index: number) => {

        if (index === this.selectedIndex) this.setSelectedIndex(-1);
        else this.setSelectedIndex(index);

    });

    handleMajorButtonClick = action(() => {
        if (!this.isMajor) {
            this.setIsMajor(true);
        }
    });

    handleMinorButtonClick = action(() => {
        if (this.isMajor) {
            this.setIsMajor(false);
        }
    });

    handleChordsButtonClick = action(() => {
        if (!this.isChord) {
            this.setIsChord(true);
        }
    });

    handleNotesButtonClick = action(() => {
        if (this.isChord) {
            this.setIsChord(false);
        }
    });

    handleCloseModal = action(() => {
        this.setShowConfigModal(false);
    });

}

const appStore = new AppStore();
export default appStore;

