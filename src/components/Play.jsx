import React from "react";
import Navbar2 from "./Navbars/Navbar2";
import PlayGame from "./PlayGame";

function Play() {
  return (
    <div className="bg-slate-900 h-screen">
      <Navbar2 />
      <PlayGame scale={Math.sqrt(619)} speed />
    </div>
  );
}

export default Play;
