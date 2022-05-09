import { useEffect, useState } from 'react';
import { PokeApi } from '../../api/pokeapi';
import './pokemon-card.css';

export const PokemonCard = ({
    pokemon,
    toggleFromFavorites,
    favoritePokemons,
}) => {
    console.log('pokemon', pokemon);
    const [locations, setLocations] = useState([]);
    const [evolutions, setEvolutions] = useState([]);

    useEffect(() => {
        const getLocation = async () => {
            const locations = await PokeApi.getPokemonLocation(pokemon.id);
            setLocations(locations);
        };
        const getEvolutions = async () => {
            const evolutions = await PokeApi.getEvolutionChainByName(
                pokemon.name
            );
            setEvolutions(evolutions);
        };
        getLocation();
        getEvolutions();
    }, [pokemon.name, pokemon.id]);

    return (
        <div>
            <h2>{pokemon.name}</h2>
            <div>
                {Object.entries(pokemon.sprites).map(([imgName, url]) => {
                    if (typeof url === 'string') {
                        return <img src={url} alt={imgName} />;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>
                Types: {pokemon.types.map(({ type }) => type.name).join(', ')}
            </div>
            <div className='moves'>
                Moves:{' '}
                {pokemon.moves
                    .map(({ move }) => move.name)
                    .slice(-5)
                    .join(', ')}
            </div>
            <div className='locations'>
                Location:{' '}
                {locations
                    .map(({ location_area }) => location_area.name)
                    .slice(-4)
                    .join(', ')}
            </div>
            <div className='evolutions'>
                Evolutions:{' '}
                {evolutions.map((pokemonName, i) => (
                    <span key={i}>
                        <span
                            className={
                                pokemonName === pokemon.name ? 'current' : ''
                            }
                        >
                            {pokemonName}
                        </span>
                        <span> &#8594; </span>
                    </span>
                ))}
            </div>
            <button
                className='button'
                onClick={() => toggleFromFavorites(pokemon)}
            >
                {favoritePokemons.some((p) => p.id === pokemon.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'}
            </button>
        </div>
    );
};
