import { useReducer, useEffect } from "react";
import axios from "axios";
import { Lock, Trophy } from "lucide-react";

// ─── State shape ─────────────────────────────────────────────────────────────
const initialState = {
  round: 1,
  p1Choice: null,
  p2Choice: null,
  p1Locked: false,
  p2Locked: false,
  score1: 0,
  score2: 0,
  roundWinner: null,
  history: [],
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function gameReducer(state, action) {
  switch (action.type) {
    case "SET_P1_CHOICE":
      return { ...state, p1Choice: action.payload };

    case "SET_P2_CHOICE":
      return { ...state, p2Choice: action.payload };

    case "LOCK_P1":
      return { ...state, p1Locked: true };

    case "LOCK_P2":
      return { ...state, p2Locked: true };

    case "RESOLVE_ROUND": {
      const { winner, newScore1, newScore2 } = action.payload;
      return {
        ...state,
        score1: newScore1,
        score2: newScore2,
        roundWinner: winner,
        history: [
          ...state.history,
          {
            round: state.round,
            p1Choice: state.p1Choice,
            p2Choice: state.p2Choice,
            winner,
          },
        ],
      };
    }

    case "NEXT_ROUND":
      return {
        ...state,
        round: state.round + 1,
        p1Choice: null,
        p2Choice: null,
        p1Locked: false,
        p2Locked: false,
        roundWinner: null,
      };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Game({ player1, player2 }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { round, p1Choice, p2Choice, p1Locked, p2Locked,
          score1, score2, roundWinner, history } = state;

  useEffect(() => {
    if (p1Locked && p2Locked) {
      const timer = setTimeout(() => resolveRound(), 700);
      return () => clearTimeout(timer);
    }
  }, [p1Locked, p2Locked]);

  const getWinner = (p1, p2) => {
    if (p1 === p2) return "Tie";
    const winsAgainst = { stone: "scissors", scissors: "paper", paper: "stone" };
    return winsAgainst[p1] === p2 ? player1 : player2;
  };

  const resolveRound = async () => {
    const winner = getWinner(p1Choice, p2Choice);
    const newScore1 = score1 + (winner === player1 ? 1 : 0);
    const newScore2 = score2 + (winner === player2 ? 1 : 0);

    dispatch({ type: "RESOLVE_ROUND", payload: { winner, newScore1, newScore2 } });

    if (round === 6) {
      const finalWinner =
        newScore1 > newScore2 ? player1 : newScore2 > newScore1 ? player2 : "Tie";

      try {
        await axios.post("http://13.232.198.148:5000/api/games", {
          player1,
          player2,
          score: `${newScore1}-${newScore2}`,
          winner: finalWinner,
        });
        alert("Game Saved Successfully");
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => dispatch({ type: "RESTART" }), 2500);
      return;
    }

    setTimeout(() => dispatch({ type: "NEXT_ROUND" }), 1500);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-3 sm:p-6">

      {/* SCOREBOARD */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 bg-[#0b0f2a] p-3 sm:p-4 rounded-xl text-sm sm:text-base">
        <div>{player1}: {score1}</div>
        <div>ROUND {round}/6</div>
        <div>{player2}: {score2}</div>
      </div>

      {/* PLAY AREA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <PlayerCard
          name={player1}
          choice={p1Choice}
          onChoose={(c) => dispatch({ type: "SET_P1_CHOICE", payload: c })}
          locked={p1Locked}
          onLock={() => dispatch({ type: "LOCK_P1" })}
        />
        <PlayerCard
          name={player2}
          choice={p2Choice}
          onChoose={(c) => dispatch({ type: "SET_P2_CHOICE", payload: c })}
          locked={p2Locked}
          onLock={() => dispatch({ type: "LOCK_P2" })}
        />
      </div>

      {/* ROUND RESULT */}
      {roundWinner && (
        <div className="text-center mt-5 text-green-400 text-lg sm:text-xl">
          Round Winner: {roundWinner}
        </div>
      )}

      {/* HISTORY */}
      <div className="mt-8 sm:mt-10 bg-[#0b0f2a] p-3 sm:p-4 rounded-xl">
        <h2 className="flex items-center gap-2 mb-3 text-sm sm:text-base">
          <Trophy /> History
        </h2>
        {history.map((h, i) => (
          <div key={i} className="text-xs sm:text-sm text-gray-300">
            Round {h.round}: {h.p1Choice} vs {h.p2Choice} — {h.winner}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PlayerCard ───────────────────────────────────────────────────────────────
function PlayerCard({ name, choice, onChoose, locked, onLock }) {
  const options = ["stone", "paper", "scissors"];

  return (
    <div className="bg-[#0b0f2a] p-4 sm:p-5 rounded-xl">
      <h2 className="mb-3 sm:mb-4 font-bold text-sm sm:text-base">{name}</h2>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {options.map((o) => (
          <button
            key={o}
            disabled={locked}
            onClick={() => onChoose(o)}
            className={`p-2 sm:p-3 text-xs sm:text-sm rounded border transition ${
              choice === o ? "border-yellow-400" : "border-gray-600"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <button
        onClick={onLock}
        disabled={!choice || locked}
        className="mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 border p-2 rounded text-xs sm:text-sm"
      >
        <Lock size={14} />
        {locked ? "Locked" : "Lock In"}
      </button>
    </div>
  );
}
