import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar1() {
  const navigator = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between h-12 px-5 w-full">
        <h1 className="text-white uppercase font-mono text-lg cursor-pointer">
          snakers
        </h1>
        <div className="space-x-8 flex">
          <h1
            className="text-white uppercase font-mono cursor-pointer hover:text-green-400"
            onClick={() => {
              navigator("/play");
            }}
          >
            play now
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar1;
