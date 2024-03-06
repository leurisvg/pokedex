import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { List } from 'react-virtualized';
import { getPokemonList } from '../api/PokemonAPI.tsx';
import bx_menu from '../assets/icons/bx_menu.svg';
import pokeball_bw from '../assets/icons/pokeball_bw.svg';
import { usePokemon } from '../hooks/usePokemon.ts';
import { PokemonItemCard } from './PokemonItemCard.tsx';
import { Search } from './Search.tsx';

export const PokemonList = () => {
  const { pokemonData, selectedPokemonId, windowWidth, pokemonDataHandler } = usePokemon();
  const [hideSidebar, setHideSidebar] = useState<boolean>(true);
  
  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    setHideSidebar(true);
  }, [selectedPokemonId]);
  
  const getData = () => {
    const data = getPokemonList();
    pokemonDataHandler([...data]);
  };
  
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  const render = ({ key, index, style }: any) => {
    return (
      <div
        className=" pl-3 pr-1 py-1.5"
        key={ key }
        style={ style }
      >
        <PokemonItemCard
          pokemon={ pokemonData[index] }
        />
      </div>
    );
  };
  
  return (
    <>
      <aside className={ `pokemon-list-container ${ hideSidebar ? 'hide' : '' }` }>
        
        <div className="pokemon-list">
          <div className="search-container">
            <Search/>
          </div>
          
          { pokemonData.length > 0 ?
            
            <List
              className="pt-[110px] -z-10"
              rowCount={ pokemonData.length }
              height={ window.innerHeight }
              rowHeight={ 116 }
              rowRenderer={ render }
              width={ 353 }
              scrollToIndex={ selectedPokemonId }
            /> :
            <div className="flex flex-col justify-center items-center w-full h-full bg-white-500">
              <ReactSVG
                src={ pokeball_bw }
                beforeInjection={ svg => {
                  svg.classList.add('fill-secondary-400/70');
                  svg.classList.add('w-28');
                } }
              />
              <h4 className="text-secondary-400/70 font-bold mt-3">Pokemon not found</h4>
            </div> }
        </div>
      
      </aside>
      
      { (windowWidth < 1280) &&
        <ReactSVG
          className="absolute top-4 left-4 z-10 cursor-pointer"
          onClick={ toggleSidebar }
          src={ bx_menu }
          beforeInjection={ svg => {
            svg.classList.add('fill-secondary-500');
            svg.classList.add('w-6');
          } }
        />
      }
    </>
  );
};
