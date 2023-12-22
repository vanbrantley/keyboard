import { useContext, useState, useEffect } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
import { NOTES2 } from './../global/constants';
import { Layout } from './../global/enums';
import Keyboard from './../components/Keyboard';
import MiniKeyboard from './../components/MiniKeyboard';
import NoteButtons from '../components/NoteButtons';
import ChordButtons from './../components/ChordButtons';
import ConfigModal from './../components/ConfigModal';
import Configuration from './../components/Configuration';

const Home = observer(() => {

  const store = useContext(AppStoreContext);
  const { isMajor, isChord, selectedIndex, scaleNotes, chordFilesInfo, getScale, getChords, showConfigModal, setShowConfigModal } = store;

  const [currentLayout, setCurrentLayout] = useState<Layout>(Layout.Desktop);

  // conditionally set currentLayout state variable based on window width (screen size)
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

  // get scale notes once the index or scale type changes
  useEffect(() => {
    getScale(selectedIndex)
  }, [selectedIndex, isMajor]);

  useEffect(() => {
    getChords();
  }, [scaleNotes]);

  let chordFiles: JSX.Element[] = [];

  if (selectedIndex !== -1) {
    chordFiles = chordFilesInfo.map((chord) => {
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

  // Press 0 key to show/hide config modal
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '0') {
        // Toggle state of showConfigModal
        setShowConfigModal(!showConfigModal);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showConfigModal]);

  return (

    <div>

      {/* Desktop Layout */}
      {currentLayout === Layout.Desktop && (
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-3/5 flex flex-col items-center space-y-8">
              <br />
              <Keyboard />
              <Configuration />
              <br />
            </div>

            <div className="h-2/5 flex justify-center">

              {isChord ? (
                <>
                  <ChordButtons layout={currentLayout} />
                </>
              ) : (
                <>
                  <NoteButtons mobileLayout={false} />
                </>
              )}

            </div>
          </div>

        </div>
      )}

      {/* Mobile Layout */}
      {currentLayout === Layout.Mobile && (
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-1/3 space-y-4">

              <div className="flex flex-col items-center space-y-4">
                <br />
                <MiniKeyboard />
                <Configuration />
              </div>

            </div>
            <div className="h-2/3 flex flex-col items-center">

              {isChord ? (
                <ChordButtons layout={currentLayout} />
              ) : (
                <NoteButtons mobileLayout={true} />
              )}

            </div>

          </div>
        </div>
      )}

      {/* Mobile Landscape Layout */}
      {currentLayout === Layout.MobileLandscape && (
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-1/2 space-y-2">

              <div className="flex flex-col items-center">
                <br />
                <MiniKeyboard />
                <Configuration />
              </div>

            </div>

            <div className="h-1/2 flex justify-center">

              {isChord ? (
                <ChordButtons layout={currentLayout} />
              ) : (
                <NoteButtons mobileLayout={false} />
              )}
            </div>

          </div>
        </div>
      )}

      <ConfigModal layout={currentLayout} />

      {/* Render audio elements to be triggered by components */}
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
