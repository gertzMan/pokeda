import { useEffect, useState } from 'react';
import { PokeApi } from '../../api/pokeapi';
import './pokemon-thumbnail.css';

export const PokemonThumbnail = ({ pokemonName, setSelectedPokemon }) => {
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const pokemon = await PokeApi.getPokemonByName(pokemonName);
                setPokemon(pokemon);
            } catch (err) {
                console.error(err);
            }
        };

        getPokemon();
    }, [pokemonName]);

    return (
        <div>
            {pokemon ? (
                <div
                    onClick={() => setSelectedPokemon(pokemon)}
                    className='pokemon-thumbnail'
                >
                    <div className='img-container'>
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemonName}
                        />
                        <div className='pokemon-name'>{pokemonName}</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
