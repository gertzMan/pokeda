import { useState } from 'react';
import { Modal } from '../modal/modal';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { PokemonThumbnail } from '../pokemon-thumbnail/pokemon-thumbnail';
import './pokedex.css';

export const Pokedex = ({
    pokemons,
    toggleFromFavorites,
    favoritePokemons,
}) => {
    const [selectedPokemon, setSelectedPokemon] = useState();

    return (
        <div id='pokedex'>
            <header>
                <img
                    src='https://user-images.githubusercontent.com/69367907/105195232-72462e00-5b08-11eb-9bd0-dfa95f8e7e9a.png'
                    alt='logo'
                />
            </header>
            <div className='pokemon-grid'>
                {pokemons.map((pokemon, index) => {
                    return (
                        <PokemonThumbnail
                            key={index}
                            pokemonName={pokemon.name}
                            setSelectedPokemon={setSelectedPokemon}
                        />
                    );
                })}
            </div>
            {selectedPokemon ? (
                <Modal setOpen={setSelectedPokemon}>
                    <PokemonCard
                        pokemon={selectedPokemon}
                        toggleFromFavorites={toggleFromFavorites}
                        favoritePokemons={favoritePokemons}
                    />
                </Modal>
            ) : null}
        </div>
    );
};
