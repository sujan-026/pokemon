import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-yellow-400 text-gray-800 p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold">
          <Link to="/">Pokémon Card App</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline font-medium">
            Home
          </Link>
          <Link to="/favorites" className="hover:underline font-medium">
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

