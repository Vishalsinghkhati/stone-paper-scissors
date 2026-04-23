import { useState } from "react";

function PlayerForm({ setPlayers }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStart = () => {
    if (!player1 || !player2) return;
    setPlayers({ player1, player2 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#050816] text-white">

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest leading-tight">
        <span className="text-gray-300">STONE</span>
        <br />
        <span className="text-yellow-400">PAPER</span>
        <br />
        <span className="text-gray-300">SCISSORS</span>
      </h1>

      <p className="text-gray-400 mt-3 text-xs sm:text-sm">
        6 ROUNDS • BEST SCORE WINS
      </p>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-10 sm:mt-16 w-full max-w-3xl">

        {/* PLAYER 1 */}
        <div className="flex-1">
          <p className="text-red-400 mb-2 text-sm">PLAYER 1</p>

          <input
            type="text"
            placeholder="Enter name..."
            className="w-full bg-[#0b0f2a] border border-gray-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </div>

        {/* PLAYER 2 */}
        <div className="flex-1">
          <p className="text-blue-400 mb-2 text-sm">PLAYER 2</p>

          <input
            type="text"
            placeholder="Enter name..."
            className="w-full bg-[#0b0f2a] border border-gray-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </div>

      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="mt-10 sm:mt-14 w-full max-w-xs bg-yellow-500 text-black px-6 sm:px-14 py-3 sm:py-4 rounded-xl font-bold tracking-widest text-sm sm:text-base hover:scale-105 transition"
      >
        START GAME
      </button>

    </div>
  );
}

export default PlayerForm;