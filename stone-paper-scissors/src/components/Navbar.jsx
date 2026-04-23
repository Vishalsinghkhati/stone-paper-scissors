import { useState } from "react";

function Navbar() {
  const [active, setActive] = useState("game");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-800 bg-[#050816] text-white">

      {/* Logo */}
      <h1 className="text-lg sm:text-xl font-bold text-yellow-400 tracking-wide">
        SPS ✂️
      </h1>

      {/* Buttons */}
      <div className="flex w-full sm:w-auto gap-3 sm:gap-4">

        <button
          onClick={() => setActive("game")}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
            active === "game"
              ? "bg-yellow-400 text-black"
              : "border border-gray-700 text-gray-400"
          }`}
        >
          Game
        </button>

        <button
          onClick={() => setActive("history")}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base transition ${
            active === "history"
              ? "bg-yellow-400 text-black"
              : "border border-gray-700 text-gray-400"
          }`}
        >
          History (0)
        </button>

      </div>

    </div>
  );
}

export default Navbar;