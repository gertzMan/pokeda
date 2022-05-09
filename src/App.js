import { useEffect, useState } from 'react';
import { TopBar } from './components/top-bar/top-bar';
import { Favorites } from './components/favorites/favorites';
import { Pokedex } from './components/pokedex/pokedex';
import { PokeApi } from './api/pokeapi';

const localStorageKey = 'favorites';
const storedPokemons = JSON.parse(
    localStorage.getItem(localStorageKey) ?? '[]'
);

function App() {
    const [page, setPage] =
        useState(
            'home'
        ); /* hook that is responsible for state. Instead of routing i'm using 
  state management for the different "pages" in the app. the use State function accepts as a parameter the default 
  page. */

    const [pokemons, setPokemons] = useState([]);
    const [favoritePokemons, setFavoritePokemons] = useState(storedPokemons);

    // add to favorites function that updates the favoritePokemon
    const toggleFromFavorites = (pokemon) => {
        setFavoritePokemons((prevFavoritePokemon) => {
            if (prevFavoritePokemon.some((p) => p.id === pokemon.id)) {
                return prevFavoritePokemon.filter((p) => p.id !== pokemon.id);
            }
            const newFavorites = [...prevFavoritePokemon, pokemon].slice(-6);
            localStorage.setItem(localStorageKey, JSON.stringify(newFavorites));
            return newFavorites;
        });
    };
    /*useEffect hook that allows us to connect to the components life cycle */
    useEffect(() => {
        const getPokemons = async () => {
            try {
                const firstGenPokemons = await PokeApi.getGeneration('1');
                setPokemons(firstGenPokemons.pokemon_species);
            } catch (err) {
                console.error(err);
            }
        };

        getPokemons();
    }, []);

    return (
        <div className='App'>
            <TopBar setPage={setPage} />
            {/*we "call" the TopBar component so that it is inserted in our app */}
            <div className='main'>
                {page === 'home' ? (
                    <Pokedex
                        pokemons={pokemons}
                        toggleFromFavorites={toggleFromFavorites}
                        favoritePokemons={favoritePokemons}
                    />
                ) : null}
                {/* decide what to show under the top bar if the state is set to home we will show the pokedx component, 
        else if it is set to favorites will show the favoritePokemons component */}
                {page === 'favorites' ? (
                    <Favorites favoritePokemons={favoritePokemons} />
                ) : null}
            </div>
        </div>
    );
}

export default App;
