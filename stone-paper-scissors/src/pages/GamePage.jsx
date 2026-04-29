import { useReducer } from "react";
import Game from "../components/Game";
import HistoryPage from "../pages/HistoryPage";
import { Gamepad2, User } from "lucide-react";

// ─── State shape ─────────────────────────────────────────────────────────────
const initialState = {
  player1: "",
  player2: "",
  started: false,
  page: "game",   // "game" | "history"
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function pageReducer(state, action) {
  switch (action.type) {
    case "SET_PLAYER1":
      return { ...state, player1: action.payload };

    case "SET_PLAYER2":
      return { ...state, player2: action.payload };

    case "START_GAME":
      return { ...state, started: true, page: "game" };

    case "SET_PAGE":
      return { ...state, page: action.payload };

    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GamePage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);
  const { player1, player2, started, page } = state;

  const handleStart = () => {
    if (!player1 || !player2) {
      alert("Enter both player names");
      return;
    }
    dispatch({ type: "START_GAME" });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* NAVBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-black/40 backdrop-blur border-b border-white/10">

        <div
          className="flex items-center gap-2 font-bold text-base sm:text-lg cursor-pointer"
          onClick={() => dispatch({ type: "SET_PAGE", payload: "game" })}
        >
          <Gamepad2 size={18} />
          <span className="hidden sm:inline">Stone Paper Scissors Arena</span>
          <span className="sm:hidden">SPS</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">

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

          <div className="flex w-full sm:w-auto gap-2 text-xs sm:text-sm">
            {["game", "history"].map((p) => (
              <button
                key={p}
                onClick={() => dispatch({ type: "SET_PAGE", payload: p })}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded border transition capitalize ${
                  page === p
                    ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                    : "border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PAGES */}
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

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 w-full max-w-md">
            <input
              className="w-full bg-[#0b0f2a] border border-gray-700 px-4 py-2 rounded text-sm"
              placeholder="Player 1"
              value={player1}
              onChange={(e) =>
                dispatch({ type: "SET_PLAYER1", payload: e.target.value })
              }
            />
            <input
              className="w-full bg-[#0b0f2a] border border-gray-700 px-4 py-2 rounded text-sm"
              placeholder="Player 2"
              value={player2}
              onChange={(e) =>
                dispatch({ type: "SET_PLAYER2", payload: e.target.value })
              }
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
        <Game
          player1={player1}
          player2={player2}
          onNavigateHistory={() => dispatch({ type: "SET_PAGE", payload: "history" })}
        />
      )}
    </div>
  );
}
