import axios from 'axios';

import pokemonData from '../data/pokemonData.json';
import { IPokemonDetails } from '../interfaces/pokemonDetails.ts';
import { IPokemonBasicInfo } from '../interfaces/PokemonBasicInfo.ts';
import { IPokemonEvolution } from '../interfaces/PokemonEvolution.ts';
import { IMoveDetail } from '../interfaces/PokemonMoves.ts';
import { IPokemonSpecies } from '../interfaces/PokemonSpecies.ts';
import { IPokeMonTypes } from '../interfaces/PokemonTypes.ts';

let data: IPokemonBasicInfo[] = [];

const readPokemonData = () => {
  data = JSON.parse(JSON.stringify(pokemonData)) as IPokemonBasicInfo[];
};

export const getPokemonList = (): IPokemonBasicInfo[] => {
  if (data.length === 0) {
    readPokemonData();
  }
  
  return data;
};

export const getPokemonDetails = async(id: number): Promise<IPokemonDetails> => {
  const { data } = await axios.get<IPokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
  return data;
};

export const getPokemonSpecies = async(id: number): Promise<IPokemonSpecies> => {
  const { data } = await axios.get<IPokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${ id }`);
  return data;
};

export const getPokemonEvolution = async (url: string): Promise<IPokemonEvolution> => {
  const { data } = await axios.get<IPokemonEvolution>(url);
  return data;
}

export const getPokemonTypes = async (url: string): Promise<IPokeMonTypes> => {
  const { data } = await axios.get<IPokeMonTypes>(url);
  return data;
}

export const getMoveDetail = async (url: string): Promise<IMoveDetail> => {
  const { data } = await axios.get<IMoveDetail>(url);
  return data;
}
