import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import PokemonCard from "../components/PokemonCard";

// IDs of the first 100 famous Pokémon
const famousPokemonIds = Array.from({ length: 100 }, (_, i) => i + 1); // IDs 1-100

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]); // Full Pokémon list
  const [filteredList, setFilteredList] = useState([]); // Filtered Pokémon
  const [selectedType, setSelectedType] = useState(""); // Current type filter

  // Fetch and display 100 famous Pokémon on load
  useEffect(() => {
    const fetchFamousPokemon = async () => {
      try {
        const promises = famousPokemonIds.map((id) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );
        const responses = await Promise.all(promises);
        setPokemonList(responses.map((res) => res.data));
        setFilteredList(responses.map((res) => res.data)); // Default filtered list
      } catch (err) {
        console.error("Error fetching famous Pokémon:", err);
      }
    };

    fetchFamousPokemon();
  }, []);

  // Search Pokémon by name
  const handleSearch = async (query) => {
    if (!query) {
      setFilteredList(pokemonList);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      const searchedPokemon = response.data;
      setFilteredList([searchedPokemon]); // Only show the searched Pokémon
    } catch (err) {
      console.error("Error searching Pokémon:", err);
      setFilteredList([]); // Clear the list if search fails
    }
  };

  // Filter Pokémon by type
  const handleTypeChange = async (type) => {
    setSelectedType(type);

    if (!type) {
      setFilteredList(pokemonList);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      const typePokemonNames = response.data.pokemon.map((p) => p.pokemon.name);

      // Filter both displayed and searched Pokémon
      const filtered = pokemonList.filter((poke) =>
        typePokemonNames.includes(poke.name)
      );
      setFilteredList(filtered);
    } catch (err) {
      console.error("Error filtering Pokémon by type:", err);
      setFilteredList([]);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-yellow-400 text-gray-800 p-8 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Pokémon Card App!
        </h1>
        <p className="text-lg">
          Explore top-rated Pokémon, filter by type, or search for your
          favorites!
        </p>
      </section>

      {/* Filter Header */}
      <div className="bg-gray-100 p-4 flex flex-wrap items-center justify-between">
        {/* Search Bar */}
        <SearchForm onSearch={handleSearch} />

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 ml-4"
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>

      {/* Pokémon Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredList.length > 0 ? (
          filteredList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No Pokémon found. Try searching or changing the filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;

