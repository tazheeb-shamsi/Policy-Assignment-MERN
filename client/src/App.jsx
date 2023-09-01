import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PolicyCalculationPage from "./pages/PolicyCalculation";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import IllustrationPage from "./pages/Illustration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/policyCalculator" element={<PolicyCalculationPage />} />
        <Route path="/illustration" element={<IllustrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
