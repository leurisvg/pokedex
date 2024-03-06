import { useEffect, useRef, useState } from 'react';
import { getEvolutionDescription, getFormattedPokemonName, typesColors, typesIcons } from '../helpers/index.ts';
import { useMousePosition } from '../hooks/useMousePosition.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IPokemonBasicInfo } from '../interfaces/PokemonBasicInfo.ts';
import { IEvolutionChainData } from '../interfaces/PokemonEvolution.ts';
import { PokemonImg } from './PokemonImg.tsx';

type Props = {
  pokemon?: IPokemonBasicInfo | null;
  evolutionChain?: IEvolutionChainData[] | null;
  chain?: IEvolutionChainData | null;
}

export const PokemonItemCard = ({ pokemon, evolutionChain = null, chain = null }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { selectedPokemonId, selectedPokemonIdHandler } = usePokemon();
  const [id, setId] = useState<number>(0);
  const [types, setTypes] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  useMousePosition(cardRef, pokemon ? pokemon.id : null);
  
  useEffect(() => {
    setId(pokemon ? pokemon.id : chain!.id);
    setTypes(pokemon ? pokemon.types : chain!.types);
    setName(pokemon ? pokemon.name : chain!.name);
  }, [pokemon]);
  
  let color = '';
  
  if (types.length === 1) {
    color = typesColors.opacityBg[types[0]];
  } else {
    color = `bg-gradient-to-br ${ typesColors.from[types[0]] } ${ typesColors.to[types[1]] }`;
  }
  
  const evolutionMethods = () => {
    if (chain!.evolutionDetails.length > 1) {
      return (
        <ul className="list-disc list-inside pointer-events-none">
          { chain!.evolutionDetails.map((details, i) => (
            <li
              className="pointer-events-none text-secondary-500/50 text-xs"
              key={ `${ id }_${ i }` }
            >
              { getEvolutionDescription(evolutionChain!, chain!, details) }
            </li>
          )) }
        </ul>
      );
    } else {
      return (
        chain!.evolutionDetails.map((details, i) => (
          <p
            className="pointer-events-none text-secondary-500/50 text-xs"
            key={ `${ id }_${ i }` }
          >
            { getEvolutionDescription(evolutionChain!, chain!, details) }
          </p>
        ))
      );
    }
  };
  
  return (
    <div
      className={ `h-full rounded-3xl cursor-pointer shadow-md ${ color }` }
      onClick={ () => selectedPokemonIdHandler(id) }
    >
      <div
        className={ `h-full rounded-[22px] p-3 ${ chain ? 'relative card-background' : id === selectedPokemonId ? '' : 'card-background' }` }
        ref={ cardRef }
      >
        
        <div className="flex justify-between pointer-events-none">
          <div className="flex justify-center w-2/6">
            <PokemonImg
              id={ id }
              name={ name }
            />
          </div>
          
          <div className="flex flex-col grow w-2/6 justify-center pointer-events-none">
            <p className="text-secondary-500/50">{ chain ? chain.stage : id.toString().padStart(4, '0') }</p>
            <h4>{ getFormattedPokemonName(name) }</h4>
          </div>
          
          <div
            className={ `flex pointer-events-none items-end gap-x-2 justify-end w-fit ${ chain && 'absolute top-2 right-2' }` }
          >
            { types.map(type => (
              <img
                className={ `${ chain ? 'w-5' : 'w-6' }` }
                src={ typesIcons[type] }
                alt={ type }
                key={ `${ name }_${ type }_${ id }` }
              />
            )) }
          </div>
        </div>
        
        <div className="mt-2 pointer-events-none">
          { chain && evolutionMethods() }
        </div>
      
      </div>
    
    </div>
  );
};
