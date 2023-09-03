import "./../styles/styles.module.css";
import Keyboard from "./../components/Keyboard";

const MobileLandscapeLayout = () => {
    return (
        // <p>This is the Mobile Landscape Layout</p>

        <div className="h-screen flex">
            <div className="w-full">

                <div className="flex h-screen items-center justify-center">
                    <br></br>
                    <Keyboard scaleNotes={[]} />
                </div>
            </div>
        </div>
    )
};

export default MobileLandscapeLayout;