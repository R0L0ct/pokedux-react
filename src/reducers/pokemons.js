import { fromJS } from "immutable";
import { SET_FAVORITE, SET_POKEMONS } from "../actions/types";

const initialState = fromJS({
  pokemons: [],
});

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      // return { ...state, pokemons: action.payload };
      return state.setIn(["pokemons"], fromJS(action.payload));
    case SET_FAVORITE:
      // const newPokemonsList = [...state.pokemons];
      const currentPokemonIndex = state.get("pokemons").findIndex((pokemon) => {
        return pokemon.get("id") === action.payload.pokemonId;
      });
      if (currentPokemonIndex === -1) {
        return state;
      }

      const isFavorite = state.getIn([
        "pokemons",
        currentPokemonIndex,
        "favorite",
      ]);
      // newPokemonsList[currentPokemonIndex].favorite = !newPokemonsList[currentPokemonIndex].favorite;

      // return { ...state, pokemons: newPokemonsList };
      return state.setIn(
        ["pokemons", currentPokemonIndex, "favorite"],
        !isFavorite
      );
    default:
      return state;
  }
};
