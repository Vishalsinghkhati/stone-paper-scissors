import { useState, useEffect } from "react";
import axios from "axios";
import { Lock, Trophy } from "lucide-react";

export default function Game({ player1, player2 }) {
  const [round, setRound] = useState(1);

  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);

  const [p1Locked, setP1Locked] = useState(false);
  const [p2Locked, setP2Locked] = useState(false);

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [roundWinner, setRoundWinner] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (p1Locked && p2Locked) {
      setTimeout(resolveRound, 700);
    }
  }, [p1Locked, p2Locked]);

  const getWinner = (p1, p2) => {
    if (p1 === p2) return "Tie";

    if (
      (p1 === "stone" && p2 === "scissors") ||
      (p1 === "scissors" && p2 === "paper") ||
      (p1 === "paper" && p2 === "stone")
    ) {
      return player1;
    }

    return player2;
  };

  const resolveRound = async () => {
    const winner = getWinner(p1Choice, p2Choice);

    let newS1 = score1;
    let newS2 = score2;

    if (winner === player1) newS1++;
    if (winner === player2) newS2++;

    setScore1(newS1);
    setScore2(newS2);
    setRoundWinner(winner);

    const newEntry = {
      round,
      p1Choice,
      p2Choice,
      winner,
    };

    setHistory((prev) => [...prev, newEntry]);

    if (round === 6) {
      const finalWinner =
        newS1 > newS2 ? player1 : newS2 > newS1 ? player2 : "Tie";

      try {
        await axios.post("https://sps-backend-cmzm.onrender.com/api/games", {
          player1,
          player2,
          score: `${newS1}-${newS2}`,
          winner: finalWinner,
        });

        alert("Game Saved Successfully");
      } catch (err) {
        console.log(err);
      }

      setTimeout(() => restartGame(), 2500);
      return;
    }

    setTimeout(() => {
      setRound((r) => r + 1);
      resetRound();
    }, 1500);
  };

  const resetRound = () => {
    setP1Choice(null);
    setP2Choice(null);
    setP1Locked(false);
    setP2Locked(false);
    setRoundWinner(null);
  };

  const restartGame = () => {
    setRound(1);
    setScore1(0);
    setScore2(0);
    setHistory([]);
    resetRound();
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
          setChoice={setP1Choice}
          locked={p1Locked}
          setLocked={setP1Locked}
        />

        <PlayerCard
          name={player2}
          choice={p2Choice}
          setChoice={setP2Choice}
          locked={p2Locked}
          setLocked={setP2Locked}
        />
      </div>

      {/* RESULT */}
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
            Round {h.round}: {h.winner}
          </div>
        ))}
      </div>
    </div>
  );
}

/* PLAYER CARD */
function PlayerCard({ name, choice, setChoice, locked, setLocked }) {
  const options = ["stone", "paper", "scissors"];

  return (
    <div className="bg-[#0b0f2a] p-4 sm:p-5 rounded-xl">

      <h2 className="mb-3 sm:mb-4 font-bold text-sm sm:text-base">{name}</h2>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {options.map((o) => (
          <button
            key={o}
            disabled={locked}
            onClick={() => setChoice(o)}
            className={`p-2 sm:p-3 text-xs sm:text-sm rounded border transition ${
              choice === o ? "border-yellow-400" : "border-gray-600"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <button
        onClick={() => setLocked(true)}
        disabled={!choice || locked}
        className="mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 border p-2 rounded text-xs sm:text-sm"
      >
        <Lock size={14} />
        {locked ? "Locked" : "Lock In"}
      </button>
    </div>
  );
}