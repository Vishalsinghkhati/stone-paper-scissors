import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import History from "./pages/HistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
      <Route path="/History" element={<History />} />
    </Routes>
  );
}

export default App;