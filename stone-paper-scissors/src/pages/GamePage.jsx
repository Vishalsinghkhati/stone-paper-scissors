import { useState } from "react";
import Game from "../components/Game";
import HistoryPage from "../pages/HistoryPage";
import { Gamepad2, User } from "lucide-react";

export default function GamePage() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("game");

  const handleStart = () => {
    if (!player1 || !player2) {
      alert("Enter both player names");
      return;
    }
    setStarted(true);
    setPage("game");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* NAVBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-black/40 backdrop-blur border-b border-white/10">

        {/* Logo */}
        <div
          className="flex items-center gap-2 font-bold text-base sm:text-lg cursor-pointer"
          onClick={() => setPage("game")}
        >
          <Gamepad2 size={18} />
          <span className="hidden sm:inline">Stone Paper Scissors Arena</span>
          <span className="sm:hidden">SPS</span>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">

          {/* Players */}
          {started && page === "game" && (
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <span className="text-red-400 flex items-center gap-1">
                <User size={14} /> {player1}
              </span>
              <span className="text-blue-400 flex items-center gap-1">
                <User size={14} /> {player2}
              </span>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="flex w-full sm:w-auto gap-2 text-xs sm:text-sm">
            <button
              onClick={() => setPage("game")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded border transition ${
                page === "game"
                  ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                  : "border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
              }`}
            >
              Game
            </button>

            <button
              onClick={() => setPage("history")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded border transition ${
                page === "history"
                  ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                  : "border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
              }`}
            >
              History
            </button>
          </div>
        </div>
      </div>

      {/* HISTORY PAGE */}
      {page === "history" ? (
        <HistoryPage />

      ) : !started ? (
        /* START SCREEN */
        <div className="flex flex-col items-center justify-center mt-16 sm:mt-24 px-4 text-center">

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            <span className="text-gray-300">STONE</span><br />
            <span className="text-yellow-400">PAPER</span><br />
            <span className="text-gray-300">SCISSORS</span>
          </h1>

          <p className="text-gray-400 mt-3 text-xs sm:text-sm">
            6 ROUNDS • BEST SCORE WINS
          </p>

          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 w-full max-w-md">
            <input
              className="w-full bg-[#0b0f2a] border border-gray-700 px-4 py-2 rounded text-sm"
              placeholder="Player 1"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              className="w-full bg-[#0b0f2a] border border-gray-700 px-4 py-2 rounded text-sm"
              placeholder="Player 2"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>

          <button
            onClick={handleStart}
            className="mt-6 sm:mt-8 w-full max-w-xs bg-yellow-500 text-black px-6 py-2 rounded font-bold text-sm hover:scale-105 transition"
          >
            START GAME
          </button>
        </div>

      ) : (
        /* GAME */
        <Game
          player1={player1}
          player2={player2}
          onNavigateHistory={() => setPage("history")}
        />
      )}
    </div>
  );
}