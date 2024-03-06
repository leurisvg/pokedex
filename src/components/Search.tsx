import React, { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { getPokemonList } from '../api/PokemonAPI.tsx';
import bx_search from '../assets/icons/bx_search.svg';
import bxs_x_circle from '../assets/icons/bxs_x_circle.svg';
import { stringSimilarity } from '../helpers/index.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IPokemonBasicInfo } from '../interfaces/PokemonBasicInfo.ts';

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  const { pokemonDataHandler } = usePokemon();
  
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 800);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);
  
  useEffect(() => {
    if (inputValue === '') {
      pokemonDataHandler([...getPokemonList()]);
    } else {
      const result = fuzzySearch(inputValue, getPokemonList());
      pokemonDataHandler([...result]);
    }
  }, [debouncedInputValue]);
  
  const focus = () => {
    inputRef?.current?.focus();
  };
  
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
    
    if (ev.target.value === '') {
      pokemonDataHandler([...getPokemonList()]);
    }
  };
  
  const handleKeyDown = ({ code }: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(code === 'Escape')) return;
    clearInput();
  };
  
  const clearInput = () => {
    setInputValue('');
    pokemonDataHandler([...getPokemonList()]);
  };
  
  const fuzzySearch = (str: string, arr: IPokemonBasicInfo[]) => {
    return arr.filter((pokemon) => {
      const value = stringSimilarity(str, pokemon.name);
      return value > 0.6 || pokemon.name.includes(str);
    });
  };
  
  return (
    <div className="search">
      <div className="input-container">
        <input
          ref={ inputRef }
          className="input"
          placeholder="Filter"
          value={ inputValue }
          onChange={ handleInputChange }
          onKeyDown={ handleKeyDown }
        />
        
        <ReactSVG
          src={ bx_search }
          className="search-icon"
          beforeInjection={ svg => svg.classList.add('fill-secondary-500') }
          onClick={ focus }
        />
        
        { inputValue &&
          <ReactSVG
            src={ bxs_x_circle }
            className="clear-icon"
            beforeInjection={ (svg) => {
              svg.classList.add('fill-secondary-400');
              svg.classList.add('hover:fill-secondary-500');
              svg.classList.add('transition');
            } }
            onClick={ clearInput }
          /> }
      </div>
    </div>
  );
};
