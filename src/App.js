import { Col, Spin } from "antd";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { getPokemonsWithDetails } from "./actions";
// import { getPokemons } from "./api";
import "./App.css";
import { PokemonList } from "./components/PokemonList";
import Searcher from "./components/Searcher";
import { fetchPokemonsWithDetails } from "./slices/dataSlice";
import logo from "./statics/logo.svg";

function App() {
  // const pokemons = useSelector((state) =>
  //   state.getIn(["data", "pokemons"], shallowEqual).toJS()
  // );
  // const loading = useSelector((state) => state.getIn(["ui", "loading"]));

  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
  const filteredPokemons = useSelector(
    (state) => state.data.filteredPokemons,
    shallowEqual
  );

  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchPokemons = async () => {
    //   // dispatch(setLoading(true));
    //   const pokemonsRes = await getPokemons();
    //   dispatch(getPokemonsWithDetails(pokemonsRes));
    //   // dispatch(setLoading(false));
    // };

    // fetchPokemons();
    dispatch(fetchPokemonsWithDetails());
  }, []);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt="Pokedux" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? (
        <Col offset={12}>
          <Spin spinning size="large" />
        </Col>
      ) : (
        <PokemonList pokemons={filteredPokemons} />
      )}
    </div>
  );
}

export default App;
