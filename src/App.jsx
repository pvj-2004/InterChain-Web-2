import { useState } from "react";
import ArtworkCarousel from "./components/ArtworkCarousel";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Exhibitions from "./components/Exhibitions";

export default function App() {
  const [screenContent, setScreenContent] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function changeScreenContent(content) {
    setIsLoading(true);
    setScreenContent(content);
    setTimeout(() => setIsLoading(false), 300); // Simple loading simulation
  }

  function toggleMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`transition-colors duration-500 ${darkMode ? "dark" : "light"}`}>
      <div className="app-container min-h-screen relative" style={{
        background: darkMode 
          ? "linear-gradient(180deg, #000000, #1A0B2E, #2B086C)" 
          : "linear-gradient(180deg, #FF3CAC, #784BA0, #2B86C5)",
        color: darkMode ? "#00FF95" : "#FFFFFF",
      }}>
        <Header verticalAlign="center" onImageClick={changeScreenContent} darkMode={darkMode} />
        <hr className="opacity-10 mx-4" />
        <NavBar onButtonClick={changeScreenContent} />
        <div className="dark-mode-toggle fixed top-4 right-4 z-50">
          <button 
            className={`px-4 py-2 rounded-full shadow-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
              darkMode 
                ? "bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus:ring-fuchsia-400" 
                : "bg-purple-900 text-white hover:bg-purple-800 focus:ring-purple-500"
            }`}
            style={{
              boxShadow: darkMode 
                ? '0 0 20px rgba(255, 0, 255, 0.3)' 
                : '0 0 20px rgba(147, 51, 234, 0.3)'
            }}
            onClick={toggleMode}
          >
            {darkMode ? "🌟 Light" : "✨ Dark"}
          </button>
        </div>
        <div className={`content-container p-4 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {screenContent === "Home" && <Home onExplore={changeScreenContent} darkMode={darkMode} />}
          {screenContent === "About Us" && <About darkMode={darkMode} />}
          {screenContent === "Artwork" && <ArtworkCarousel />}
          {screenContent === "Exhibition" && <Exhibitions />}
        </div>
        <hr className="opacity-10 mx-4 mt-8" />
        <Footer className="mt-4 p-4" />
      </div>
    </div>
  );
}
