import React from "react";

const PokemonCard = ({ pokemon }) => {
  const addToFavorites = () => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existingFavorites.some((fav) => fav.id === pokemon.id)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...existingFavorites, pokemon])
      );
      alert(`${pokemon.name} has been added to your favorites!`);
    } else {
      alert(`${pokemon.name} is already in your favorites.`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mb-4"
      />
      <h2 className="text-xl font-bold capitalize mb-2">{pokemon.name}</h2>
      <p className="text-gray-700">
        Type: {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <p className="text-gray-700">Height: {pokemon.height}</p>
      <p className="text-gray-700">Weight: {pokemon.weight}</p>
      <button
        onClick={addToFavorites}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default PokemonCard;

