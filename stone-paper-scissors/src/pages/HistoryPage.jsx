import { useReducer, useEffect } from "react";
import axios from "axios";
import { Trophy, RefreshCw } from "lucide-react";

// ─── State shape ─────────────────────────────────────────────────────────────
const initialState = {
  games: [],
  loading: true,
  error: null,
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function historyReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { games: action.payload, loading: false, error: null };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const { games, loading, error } = state;

  const fetchGames = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await axios.get("https://sps-backend-cmzm.onrender.com/api/games");
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Could not load history. Is your backend running?",
      });
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 sm:px-6 py-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h1 className="flex items-center gap-2 text-lg sm:text-2xl font-bold">
          <Trophy className="text-yellow-400" /> All Game History
        </h1>
        <button
          onClick={fetchGames}
          className="flex items-center gap-2 text-xs sm:text-sm border border-gray-600 px-3 py-1.5 rounded hover:border-gray-400 transition"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* STATUS */}
      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && games.length === 0 && (
        <p className="text-gray-500">No games saved yet. Play one!</p>
      )}

      {/* MOBILE: CARDS */}
      <div className="sm:hidden space-y-4">
        {!loading &&
          !error &&
          [...games].map((g, i) => (
            <div
              key={g.id || i}
              className="bg-[#0b0f2a] p-4 rounded-xl border border-white/5"
            >
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Game #{games.length - i}</span>
                <span>{g.score}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-red-400 font-medium">{g.player1}</span>
                <span className="text-blue-400 font-medium">{g.player2}</span>
              </div>
              <div className="text-sm">
                Winner:{" "}
                <span className={g.winner === "Tie" ? "text-gray-400" : "text-yellow-400 font-semibold"}>
                  {g.winner === "Tie" ? "Draw" : `🏆 ${g.winner}`}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* DESKTOP: TABLE */}
      <div className="hidden sm:block">
        {!loading && !error && games.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-700 text-left">
                <th className="py-2">#</th>
                <th className="py-2">Player 1</th>
                <th className="py-2">Player 2</th>
                <th className="py-2">Score</th>
                <th className="py-2">Winner</th>
              </tr>
            </thead>
            <tbody>
              {[...games].map((g, i) => (
                <tr
                  key={g.id || i}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="py-3 text-gray-500">{games.length - i}</td>
                  <td className="py-3 text-red-400 font-medium">{g.player1}</td>
                  <td className="py-3 text-blue-400 font-medium">{g.player2}</td>
                  <td className="py-3">{g.score}</td>
                  <td className={`py-3 font-semibold ${g.winner === "Tie" ? "text-gray-400" : "text-yellow-400"}`}>
                    {g.winner === "Tie" ? "Draw" : `🏆 ${g.winner}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
