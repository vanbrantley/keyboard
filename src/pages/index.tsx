import "./../styles/styles.module.css";
import Keyboard from "./../components/Keyboard";

const Index = () => {

  return (


    <div className="h-screen flex">
      <div className="w-full">

        <div className="h-1/2 bg-blue-500 flex flex-col items-center">
          <br></br>
          <Keyboard scaleNotes={[]} />
        </div>

        <div className="h-1/2 bg-green-500 flex justify-center">

        </div>
      </div>

    </div>

  );

};

export default Index;