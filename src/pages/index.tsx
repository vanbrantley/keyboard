import { useContext, useState, useEffect } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES2 } from './../global/constants';
import { Layout } from './../global/enums';
import Keyboard from './../components/Keyboard';
import MiniKeyboard from './../components/MiniKeyboard';
import ProgressionLab from './../components/ProgressionLab';
import PlayNoteButtons from '../components/PlayNoteButtons';
import NoteButtons from './../components/NoteButtons';
import ChordButtons from './../components/ChordButtons';
import NotesChordsRadio from './../components/NotesChordsRadio';
import MajorMinorRadio from './../components/MajorMinorRadio';

const Home = observer(() => {

  const store = useContext(AppStoreContext);
  const { isMajor, isChord, selectedIndex, scaleNotes, chordNotes,
    scale, chordFilesInfo, getScale, getChords, playChord, handleNoteChordRadioChange,
    showLab, setShowLab } = store;

  const [currentLayout, setCurrentLayout] = useState<Layout>(Layout.Desktop);

  const checkLayout = () => {
    if (window.innerWidth > 896) {
      setCurrentLayout(Layout.Desktop);
    } else if (window.innerWidth <= 896 && window.innerHeight >= window.innerWidth) {
      setCurrentLayout(Layout.Mobile);
    } else if (window.innerWidth <= 896 && window.innerHeight < window.innerWidth) {
      setCurrentLayout(Layout.MobileLandscape);
    }
  };

  // useEffect to check the layout when the component mounts and on window resize
  useEffect(() => {
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => {
      window.removeEventListener('resize', checkLayout);
    };
  }, []);

  // keep these useEffects until you implement mobx store autorun
  // get scale notes once the index or scale type changes
  useEffect(() => {
    getScale(selectedIndex)
  }, [selectedIndex, isMajor]);

  useEffect(() => {
    getChords();
  }, [scaleNotes]);

  let chordFiles: JSX.Element[] = [];

  if (selectedIndex !== -1) {
    chordFiles = chordFilesInfo.map((chord, index) => {
      return (
        <audio key={chord.key} id={chord.id} src={chord.src} preload={chord.preload} />
      );
    });
  };

  const noteFiles = NOTES2.map((note) => {
    return (
      <audio key={note} id={note} src={`./../../notes2/${note}.mp3`} preload="auto" />
    );
  });

  return (

    <div>
      {currentLayout === Layout.Desktop && (
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-3/5 flex flex-col items-center space-y-8">
              {showLab ? (
                <ProgressionLab />
              ) : (
                <>
                  <Keyboard scaleNotes={scaleNotes.slice(0, 8)} />
                  <NoteButtons layout={Layout.Desktop} />
                  <div className="flex space-x-16">
                    <MajorMinorRadio />
                    <NotesChordsRadio />
                  </div>
                </>
              )}

              <br></br>

            </div>

            <div className="h-2/5 flex justify-center">

              {isChord ? (
                <>
                  {/* {(selectedIndex !== -1) && <button onClick={() => setShowLab(!showLab)} style={{ color: "white" }}>Lab toggle</button>} */}
                  <ChordButtons layout={currentLayout} />
                </>
              ) : (
                <PlayNoteButtons mobileLayout={false} />
              )}

            </div>
          </div>

        </div>
      )}

      {currentLayout === Layout.Mobile && (
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-1/2 space-y-8">

              <div className="flex flex-col items-center">
                <br></br>
                <MiniKeyboard scaleNotes={scaleNotes.slice(0, 8)} />
              </div>
              <div className="flex flex-col items-center space-y-4">

                <div className="flex space-x-16">
                  <MajorMinorRadio />
                  <NotesChordsRadio />
                </div>
                <NoteButtons layout={Layout.Mobile} />

              </div>
            </div>
            <div className="h-1/2 flex flex-col items-center">

              {isChord ? (
                <ChordButtons layout={currentLayout} />
              ) : (
                <PlayNoteButtons mobileLayout={true} />
              )}

            </div>

          </div>
        </div>
      )}

      {currentLayout === Layout.MobileLandscape && (
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-1/2 space-y-2">

              <div className="flex flex-col items-center justify-center">
                <MiniKeyboard scaleNotes={scaleNotes.slice(0, 8)} />
              </div>

              <div className="flex flex-col items-center justify-center space-y-2">

                <div className="flex space-x-16">
                  <MajorMinorRadio />
                  <NotesChordsRadio />
                </div>

                <NoteButtons layout={Layout.MobileLandscape} />

              </div>
            </div>

            <div className="h-1/2 flex justify-center">

              {isChord ? (
                <ChordButtons layout={currentLayout} />
              ) : (
                <PlayNoteButtons mobileLayout={false} />
              )}
            </div>

          </div>
        </div>
      )}

      <div>
        {chordFiles}
      </div>

      <div>
        {noteFiles}
      </div>

    </div>
  );

});

export default Home;
