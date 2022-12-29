import React from "react";
import Navbar1 from "./Navbars/Navbar1";
import Typed from "react-typed";

function Home() {
  return (
    <div className="bg-[#060702] h-screen flex flex-col justify-between">
      <Navbar1 />
      <div className=" mx-24 left-[5/6] flex justify-center">
        {/* <h1 className="text-white">asdasdasd</h1> */}
        <Typed
          typeSpeed={40}
          backSpeed={5}
          className="font-mono text-3xl text-white"
          strings={[
            "Every great story seems to begin with a snake.",
            "The snake will always bite back.",
            "Snakes hide in grass, people behind their lies.",
            "Dragons and snakes aren't so different.",
            "Use your enemy's hand to catch a snake.",
            "A snake deserves no pity.",
            "I never seen snakes on a plane",
          ]}
          loop
        ></Typed>
      </div>
      <img src="./snake.jpg" className="bottom-0 w-screen h-f object-contain" />
    </div>
  );
}

export default Home;
