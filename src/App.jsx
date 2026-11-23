// // oRf2MmnaYaWOvJMj 
import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Foods from "./pages/Foods";
import Cooking from "./pages/Cooking";
import Recipe from "./pages/Recipe";
import Intro from "./components/Intro";
import Singin from "./login/Singin";
import Profile from "./pages/Profile";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
      {!introDone && (
        <Intro onComplete={handleIntroComplete} />
      )}

      {introDone && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/signin" element={<Singin />} />
          <Route path="/signup" element={<Singin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      )}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
