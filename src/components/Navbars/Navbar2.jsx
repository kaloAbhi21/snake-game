import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar2() {
  const navigator = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between h-12 px-5 w-full">
        <h1
          className="text-white uppercase font-mono text-lg cursor-pointer"
          onClick={() => {
            navigator("/");
          }}
        >
          snakers
        </h1>
        {/* <h1
          className="text-white uppercase font-mono text-lg cursor-pointer"
          onClick={() => {
            navigator("/");
          }}
        >
          back
        </h1> */}
      </div>
    </div>
  );
}

export default Navbar2;
