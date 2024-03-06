import { createContext } from 'react';
import { IPokemonBasicInfo } from '../interfaces/PokemonBasicInfo.ts';
import { IMove } from '../interfaces/pokemonDetails.ts';
import { IPokemonInfo } from '../interfaces/PokemonInfo.ts';

interface IPokemonContextProps {
  pokemonData: IPokemonBasicInfo[];
  selectedPokemonId: number;
  pokemonColor: string;
  isLoading: boolean;
  pokemon: IPokemonInfo | null;
  pokemonForm: number;
  storedMoves: IMove[];
  windowWidth: number;
  pokemonDataHandler: (data: IPokemonBasicInfo[]) => void;
  selectedPokemonIdHandler: (id: number) => void;
  pokemonColorHandler: (color: string) => void;
  isLoadingHandler: (value: boolean) => void;
  pokemonFormHandler: (id: number) => void;
  pokemonHandler: (pokemon: IPokemonInfo) => void;
  storedMovesHandler: (moves: IMove[]) => void;
  windowWidthHandler: (value: number) => void;
}

export const PokemonContext = createContext<IPokemonContextProps>({} as IPokemonContextProps);
