import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  return (
    <>
      <nav className="bg-zinc-800 text-white p-4 flex justify-center gap-6 shadow-md">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-cyan-400 pb-1 text-white font-semibold"
              : "hover:text-cyan-300 transition-colors duration-200"

          }
        >
          Home
        </NavLink>
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-cyan-400 pb-1 text-white font-semibold"
              : "hover:text-cyan-300 transition-colors duration-200"
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-cyan-400 pb-1 text-white font-semibold"
              : "hover:text-cyan-300 transition-colors duration-200"
          }
        >
          Favorites
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
