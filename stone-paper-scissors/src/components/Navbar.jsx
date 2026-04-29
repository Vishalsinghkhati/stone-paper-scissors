import { useReducer } from "react";

// ─── Reducer ─────────────────────────────────────────────────────────────────
function navReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE":
      return { ...state, active: action.payload };
    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
function Navbar() {
  const [state, dispatch] = useReducer(navReducer, { active: "game" });
  const { active } = state;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-800 bg-[#050816] text-white">

      <h1 className="text-lg sm:text-xl font-bold text-yellow-400 tracking-wide">
        SPS ✂️
      </h1>

      <div className="flex w-full sm:w-auto gap-3 sm:gap-4">
        {["game", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch({ type: "SET_ACTIVE", payload: tab })}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition capitalize ${
              active === tab
                ? "bg-yellow-400 text-black"
                : "border border-gray-700 text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
