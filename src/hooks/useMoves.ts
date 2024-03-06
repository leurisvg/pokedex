import { useState } from 'react';
import { getMoveDetail } from '../api/PokemonAPI.tsx';
import { IMove } from '../interfaces/pokemonDetails.ts';
import { IMoveDetail } from '../interfaces/PokemonMoves.ts';
import { usePokemon } from './usePokemon.ts';

export const useMoves = () => {
  const { pokemon, storedMoves } = usePokemon();
  const [loading, setLoading] = useState<boolean>(false);
  
  const getMoves = async(): Promise<IMoveDetail[]> => {
    setLoading(true);
    const promises = moves().map(move => getMoveDetail(move.move.url));
    const data = await Promise.all(promises);
    setLoading(false);
    return data;
  };
  
  const moves = (): IMove[] => {
    const { details } = pokemon!;
    return details.moves.length > 0 ? details.moves : storedMoves;
  };
  
  return {
    moves,
    getMoves,
    loading,
  };
};
