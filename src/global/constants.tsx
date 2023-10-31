const NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const NOTES2 = ['C0', 'Db0', 'D0', 'Eb0', 'E0', 'F0', 'Gb0', 'G0', 'Ab0', 'A0', 'Bb0', 'B0', 'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2'];

type KeyToNoteMapping = {
    [key: string]: string;
};

const KEY_TO_NOTE: KeyToNoteMapping = {
    w: 'C0',
    3: 'Db0',
    e: 'D0',
    4: 'Eb0',
    r: 'E0',
    t: 'F0',
    6: 'Gb0',
    y: 'G0',
    7: 'Ab0',
    u: 'A0',
    8: 'Bb0',
    i: 'B0',
    z: 'C1',
    s: 'Db1',
    x: 'D1',
    d: 'Eb1',
    c: 'E1',
    v: 'F1',
    g: 'Gb1',
    b: 'G1',
    h: 'Ab1',
    n: 'A1',
    j: 'Bb1',
    m: 'B1',
    ',': 'C2',
    l: 'Db2',
    '.': 'D2',
    ';': 'Eb2',
    '/': 'E2',
    "'": 'F2',
    ']': 'Gb2'
};

type NoteToKeyMapping = {
    [note: string]: string;
};

const NOTE_TO_KEY: NoteToKeyMapping = {
    "C0": 'w',
    "Db0": '3',
    "D0": 'e',
    "Eb0": '4',
    "E0": 'r',
    "F0": 't',
    "Gb0": '6',
    "G0": 'y',
    "Ab0": '7',
    "A0": 'u',
    "Bb0": '8',
    "B0": 'i',
    "C1": 'z',
    "Db1": 's',
    "D1": 'x',
    "Eb1": 'd',
    "E1": 'c',
    "F1": 'v',
    "Gb1": 'g',
    "G1": 'b',
    "Ab1": 'h',
    "A1": 'n',
    "Bb1": 'j',
    "B1": 'm',
    "C2": ',',
    "Db2": 'l',
    "D2": '.',
    "Eb2": ';',
    "E2": '/',
    "F2": "'",
    "Gb2": ']'
};

const VALID_KEYS = ['w', '3', 'e', '4', 'r', 't', '6', 'y', '7', 'u', '8', 'i', 'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ',', 'l', '.', ';', '/', "'", ']'];

export { NOTES, NOTES2, KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS };