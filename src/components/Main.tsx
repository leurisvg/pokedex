import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { pokemonColors } from '../helpers/index.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { PokemonList } from './PokemonList.tsx';

export const Main = () => {
  const { pokemonColor, isLoading, windowWidthHandler } = usePokemon();
  
  useEffect(() => {
    const handleWindowResize = () => {
      windowWidthHandler(window.innerWidth);
    };
    
    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  
  return (
    <div className={ `w-full ${ pokemonColors[pokemonColor] ?? 'bg-primary-400' } ${ isLoading ? 'h-screen' : '' } animate-fade` }>
      <div className="flex 3xl:max-w-[1900px] mx-auto">
        <PokemonList/>
        <div className="w-full md:h-screen">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};
