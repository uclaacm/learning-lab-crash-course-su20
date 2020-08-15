import React, {useState} from 'react';
import './App.css';

function App() {
  const [currentPokemon, setCurrentPokemon] = useState("");
  const [pokemonInformation, setPokemonInformation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onInputChange = e => {
    setCurrentPokemon(e.target.value);
  }

  const onSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPokemonInformation(data.id)
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("There was something wrong with searching your pokemon!");
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <input onChange={onInputChange} value={currentPokemon} />
        <button onClick={onSearch}>
          search
        </button>
        <p>
          your pokemon's id is: {pokemonInformation}
        </p>
        <p>
          {errorMessage}
        </p>
      </header>
    </div>
  );
}

export default App;
