import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext.tsx';

export const usePokemon = () => {
  return useContext(PokemonContext);
};
