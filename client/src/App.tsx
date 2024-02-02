import { Register } from "./components/pages/register";
import { Result } from "./components/pages/result";
import { Start } from "./components/pages/start";
import { Frame } from "./components/parts/frame";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Frame>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Frame>
  );
}

export default App;
