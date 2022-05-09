import { Pokedex } from '../pokedex/pokedex';

export const Favorites = ({ favoritePokemons }) => {
    console.log('favoritePokemons', favoritePokemons);
    return (
        <>
            <Pokedex pokemons={favoritePokemons} addToFavorites={() => {}} />
        </>
    );
};
