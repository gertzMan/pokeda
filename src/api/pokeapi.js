/*here will deal with calls to the pokeapi*/
const getUrl = (path) => `https://pokeapi.co/api/v2/${path}`; // save some writing using extrapolation

export class PokeApi {
    /* an asynccrounos static function that fetches the data regarding the specified generation*/
    static async getGeneration(num) {
        const data = await fetch(getUrl(`generation/${num}`), {
            method: 'GET',
        });
        return await data.json(); // transform from json to an object
    }

    static async getPokemonByName(name) {
        const data = await fetch(getUrl(`pokemon/${name}`), {
            method: 'GET',
        });
        return await data.json();
    }

    static async getPokemonLocation(id) {
        const data = await fetch(getUrl(`pokemon/${id}/encounters`), {
            method: 'GET',
        });
        return await data.json();
    }

    static async getEvolutionChain(id) {
        const data = await fetch(getUrl(`evolution-chain/${id}`), {
            method: 'GET',
        });
        const result = await data.json();
        const evolutions = getEvolution(result.chain);
        return evolutions;
    }

    static async getEvolutionChainByName(name) {
        const data = await fetch(getUrl(`pokemon-species/${name}`), {
            method: 'GET',
        });
        const result = await data.json();
        const response = await fetch(result.evolution_chain.url);
        const pokemonSpecie = await response.json();
        const evolutions = getEvolution(pokemonSpecie.chain);
        return evolutions;
    }
}

function getEvolution(chain, result = []) {
    if (chain.species.name) {
        result.push(chain.species.name);
    }
    if (!chain.evolves_to.length) {
        return result;
    }

    if (chain.evolves_to.length) {
        return getEvolution(chain.evolves_to[0], result);
    }
}
