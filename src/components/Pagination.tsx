import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { getPokemonList } from '../api/PokemonAPI.tsx';
import bxs_left_arrow from '../assets/icons/bxs_left_arrow.svg';
import bxs_right_arrow from '../assets/icons/bxs_right_arrow.svg';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IPokemonBasicInfo } from '../interfaces/PokemonBasicInfo.ts';

export const Pagination = () => {
  const { selectedPokemonId, selectedPokemonIdHandler } = usePokemon();
  const [previousPokemon, setPreviousPokemon] = useState<IPokemonBasicInfo | undefined>();
  const [nextPokemon, setNextPokemon] = useState<IPokemonBasicInfo | undefined>();
  
  useEffect(() => {
    getPreviousPokemon();
    getNextPokemon();
  }, [selectedPokemonId]);
  
  const getPreviousPokemon = () => {
    const pokemon = getPokemonList().find(p => p.id === (selectedPokemonId - 1));
    setPreviousPokemon(pokemon);
  };
  
  const getNextPokemon = () => {
    const pokemon = getPokemonList().find(p => p.id === (selectedPokemonId + 1));
    setNextPokemon(pokemon);
  };
  
  return (
    <div className="pt-14 pb-5 md:pb-8 lg:pr-10 md:pr-3 flex justify-between">
      <div className="flex items-center w-1/3">
        { previousPokemon &&
          <div
            className="flex items-center cursor-pointer"
            onClick={ () => selectedPokemonIdHandler(previousPokemon!.id) }
          >
            <ReactSVG
              src={ bxs_left_arrow }
              beforeInjection={ svg => svg.classList.add('fill-secondary-500') }
              className="h-[24px]"
            />

            <div className="flex flex-col md:flex-row gap-x-2 ml-1.5">
              <p className="md:text-lg">{ previousPokemon.id.toString().padStart(4, '0') }</p>
              <p className="md:text-lg font-bold capitalize">{ previousPokemon.name }</p>
            </div>
          </div> }
      </div>
      
      <div className="flex justify-center items-center lg:w-1/3">
        <h2 className="md:text-3xl font-bold">Pokédex</h2>
      </div>
      
      <div className="flex items-center justify-end w-1/3">
        { nextPokemon &&
          <div
            className="flex items-center cursor-pointer"
            onClick={ () => selectedPokemonIdHandler(nextPokemon!.id) }
          >

            <div className="flex flex-col md:flex-row gap-x-2 mr-1.5">
              <p className="md:text-lg ml-auto lg:ml-0">{ nextPokemon.id.toString().padStart(4, '0') }</p>
              <p className="md:text-lg font-bold capitalize">{ nextPokemon.name }</p>
            </div>

            <ReactSVG
              src={ bxs_right_arrow }
              beforeInjection={ svg => svg.classList.add('fill-secondary-500') }
              className="h-[24px]"
            />
          </div> }
      </div>
    </div>
  );
};
