import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPokemonBasicInfo } from '../interfaces/PokemonBasicInfo.ts';
import { IMove } from '../interfaces/pokemonDetails.ts';
import { IPokemonInfo } from '../interfaces/PokemonInfo.ts';
import { PokemonContext } from './PokemonContext.tsx';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export const PokemonProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<IPokemonBasicInfo[]>([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>(0);
  const [pokemon, setPokemon] = useState<IPokemonInfo | null>(null);
  const [pokemonColor, setPokemonColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonForm, setPokemonForm] = useState<number>(0);
  const [storedMoves, setStoredMoves] = useState<IMove[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const pokemonDataHandler = (data: IPokemonBasicInfo[]): void => {
    setPokemonData([...data]);
  };
  
  const selectedPokemonIdHandler = (id: number): void => {
    pokemonFormHandler(0);
    setSelectedPokemonId(id);
    navigate(`pokemon/${ id }`);
  };
  
  const pokemonColorHandler = (color: string): void => {
    setPokemonColor(color);
  };
  
  const isLoadingHandler = (value: boolean): void => {
    setIsLoading(value);
  };
  
  const pokemonHandler = (pokemon: IPokemonInfo) => {
    setPokemon({ ...pokemon });
  };
  
  const pokemonFormHandler = (id: number) => {
    setPokemonForm(id);
  };
  
  const storedMovesHandler = (moves: IMove[]) => {
    setStoredMoves(moves);
  };
  
  const windowWidthHandler = (value: number) => {
    setWindowWidth(value);
  };
  
  return (
    <PokemonContext.Provider
      value={ {
        pokemonData,
        selectedPokemonId,
        pokemonColor,
        isLoading,
        pokemon,
        pokemonForm,
        storedMoves,
        windowWidth,
        pokemonDataHandler,
        selectedPokemonIdHandler,
        pokemonColorHandler,
        isLoadingHandler,
        pokemonHandler,
        pokemonFormHandler,
        storedMovesHandler,
        windowWidthHandler,
      } }
    >
      { children }
    </PokemonContext.Provider>
  );
};
