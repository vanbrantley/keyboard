import { useContext, useState, useEffect } from 'react';
import Keyboard from "./../components/Keyboard";
import MiniKeyboard from "./../components/MiniKeyboard";
import { NOTES, NOTE_TO_KEY } from './../global/constants';
import { AppStoreContext } from '../context/AppStoreContext';
import { observer } from 'mobx-react-lite';
// import DesktopLayout from '../components/DesktopLayout';
// import MobileLayout from '../components/MobileLayout';
// import MobileLandscapeLayout from '../components/MobileLandscapeLayout';

enum Layout {
  Desktop,
  Mobile,
  MobileLandscape,
}

const Home = observer(() => {

  const store = useContext(AppStoreContext);
  const { isMajor, selectedIndex, scaleNotes, chordNotes,
    getScale, getChords, playChord, handleScaleButtonClick, handleRadioChange } = store;

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

  let chordNames = [];
  let chordFiles: JSX.Element[] = [];
  let scale = "";

  if (selectedIndex !== -1) {

    scale = NOTES[selectedIndex];

    chordNames = isMajor ? [`${scale}I`, `${scale}ii`, `${scale}iii`, `${scale}IV`, `${scale}V`, `${scale}vi`, `${scale}vii°`]
      : [`${scale}mi`, `${scale}mii°`, `${scale}mIII`, `${scale}miv`, `${scale}mv`, `${scale}mVI`, `${scale}mVII`];

    chordFiles = chordNames.map((chord, index) => {
      return (
        <audio key={chord} id={chord} src={`./../../chords/${chord}.mp3`} preload="auto" />
      );
    });

  }

  return (
    <div>
      {currentLayout === Layout.Desktop && (
        // <DesktopLayout />
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-3/5 flex flex-col items-center">
              <br></br>
              <Keyboard scaleNotes={scaleNotes.slice(0, 8)} />

              <br></br>

              <div className="flex space-x-4">
                {NOTES.map((note, index) => (
                  <button
                    key={note}
                    onClick={() => handleScaleButtonClick(index)}
                    className={`${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                      } font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
                  >
                    {note}
                  </button>
                ))}
              </div>

              <br></br>

              <div className="flex space-x-4">
                <label className="text-white">
                  <input
                    type="radio"
                    value="major"
                    checked={isMajor}
                    onChange={handleRadioChange}
                  />
                  Major
                </label>
                <label className="text-white">
                  <input
                    type="radio"
                    value="minor"
                    checked={!isMajor}
                    onChange={handleRadioChange}
                  />
                  Minor
                </label>
              </div>

            </div>

            <div className="h-2/5 flex justify-center">
              {(scaleNotes.length === 0) ?
                null
                :
                <div className="flex flex-grow">
                  {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                    const chordName = isMajor ? `${scale}${chordNumber}` : `${scale}m${chordNumber}`;
                    return (
                      <button
                        key={chordNumber}
                        onClick={() => playChord(chordName, notes)}
                        className="flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        {chordNumber}: {NOTE_TO_KEY[notes[0]]} {NOTE_TO_KEY[notes[1]]} {NOTE_TO_KEY[notes[2]]}
                      </button>
                    );
                  })}
                </div>
              }

            </div>
          </div>

          <div>
            {chordFiles}
          </div>

        </div>
      )}
      {currentLayout === Layout.Mobile && (
        // <MobileLayout />
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-1/5 flex flex-col items-center">
              <br></br>
              <MiniKeyboard scaleNotes={scaleNotes.slice(0, 8)} />
            </div>
            <div className="h-1/5 flex flex-col items-center">
              <br></br>
              <div className="grid grid-cols-6 gap-4">
                {NOTES.map((note, index) => (
                  <button
                    key={note}
                    onClick={() => handleScaleButtonClick(index)}
                    className={`${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                      } font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
                  >
                    {note}
                  </button>
                ))}
              </div>

              <div className="flex space-x-4">
                <label className="text-white">
                  <input
                    type="radio"
                    value="major"
                    checked={isMajor}
                    onChange={handleRadioChange}
                  />
                  Major
                </label>
                <label className="text-white">
                  <input
                    type="radio"
                    value="minor"
                    checked={!isMajor}
                    onChange={handleRadioChange}
                  />
                  Minor
                </label>
              </div>

            </div>
            <div className="h-3/5 flex flex-col items-center">
              <br></br>
              {(scaleNotes.length === 0) ?
                null
                :
                <div className="grid grid-cols-2" style={{ width: "100%", height: "100%" }}>
                  {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                    const chordName = isMajor ? `${scale}${chordNumber}` : `${scale}m${chordNumber}`;
                    return (
                      <button
                        key={chordNumber}
                        onClick={() => playChord(chordName, notes)}
                        className="h-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      >
                        {chordNumber}
                      </button>
                    );
                  })}
                </div>
              }
            </div>

          </div>

          <div>
            {chordFiles}
          </div>

        </div>
      )}
      {currentLayout === Layout.MobileLandscape && (
        // <MobileLandscapeLayout />
        <div className="h-screen flex">
          <div className="w-full">

            <div className="h-2/6 flex flex-col items-center justify-center">
              <MiniKeyboard scaleNotes={scaleNotes.slice(0, 8)} />
            </div>
            <div className="h-2/6 flex flex-col items-center justify-center">
              <br></br>
              <div className="flex space-x-4">
                <label className="text-white">
                  <input
                    type="radio"
                    value="major"
                    checked={isMajor}
                    onChange={handleRadioChange}
                  />
                  Major
                </label>
                <label className="text-white">
                  <input
                    type="radio"
                    value="minor"
                    checked={!isMajor}
                    onChange={handleRadioChange}
                  />
                  Minor
                </label>
              </div>

              <div className="flex space-x-1">
                {NOTES.map((note, index) => (
                  <button
                    key={note}
                    onClick={() => handleScaleButtonClick(index)}
                    className={`${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                      } font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
                  >
                    {note}
                  </button>
                ))}
              </div>
              <br></br>
            </div>
            <div className="h-2/6 flex justify-center">
              {Object.entries(chordNotes).map(([chordNumber, notes]) => {
                const chordName = isMajor ? `${scale}${chordNumber}` : `${scale}m${chordNumber}`;
                return (
                  <button
                    key={chordNumber}
                    onClick={() => playChord(chordName, notes)}
                    className="flex-grow bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    {chordNumber}
                  </button>
                );
              })}
            </div>

          </div>

          <div>
            {chordFiles}
          </div>

        </div>
      )}
    </div>
  );

});

export default Home;
