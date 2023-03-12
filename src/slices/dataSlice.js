import { getPokemonDetails, getPokemons } from "../api";
import { setLoading } from "./uiSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  pokemons: [],
  filteredPokemons: [],
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  "data/fetchPokemonsWithDetails",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemons();
    const pokemonsDetailed = await Promise.all(
      pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
    );
    dispatch(setPokemons(pokemonsDetailed));
    dispatch(setLoading(false));
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.filteredPokemons = action.payload;
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
        return pokemon.id === action.payload.pokemonId;
      });

      const currentFilteredPokemonIndex = state.filteredPokemons.findIndex(
        (pokemon) => {
          return pokemon.id === action.payload.pokemonId;
        }
      );

      if (currentPokemonIndex || currentFilteredPokemonIndex >= 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;

        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
        state.filteredPokemons[currentFilteredPokemonIndex].favorite =
          !isFavorite;
      }
    },

    setFilterByName: (state, action) => {
      const pokemonsFiltered = state.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredPokemons = pokemonsFiltered;
    },
  },
});

export const { setFavorite, setPokemons, setFilterByName } = dataSlice.actions;
export default dataSlice.reducer;
