import { IPokemonDetails } from './pokemonDetails.ts';
import { IEvolutionChainData } from './PokemonEvolution.ts';
import { IPokemonSpecies } from './PokemonSpecies.ts';
import { IPokemonTypeDamageRelation } from './PokemonTypes.ts';

export interface IPokemonInfo {
  details: IPokemonDetails;
  species: IPokemonSpecies;
  evolutionChain: IEvolutionChainData[];
  damageRelations: IPokemonTypeDamageRelation[];
}
