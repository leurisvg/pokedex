import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPokemonDetails, getPokemonEvolution, getPokemonList, getPokemonSpecies, getPokemonTypes } from '../api/PokemonAPI.tsx';
import { Loading } from '../components/Loading.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { PokemonDescription } from '../components/PokemonDescription.tsx';
import { PokemonInformation } from '../components/PokemonInformation.tsx';
import { PokemonStats } from '../components/PokemonStats.tsx';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IPokemonDetails, IResource } from '../interfaces/pokemonDetails.ts';
import { IChain, IEvolutionChainData, IPokemonEvolution } from '../interfaces/PokemonEvolution.ts';
import { IPokemonSpecies } from '../interfaces/PokemonSpecies.ts';
import { IPokemonTypeDamageRelation } from '../interfaces/PokemonTypes.ts';

export const Pokemon = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    selectedPokemonId,
    isLoading,
    pokemon,
    pokemonForm,
    selectedPokemonIdHandler,
    isLoadingHandler,
    pokemonColorHandler,
    pokemonHandler,
    storedMovesHandler,
  } = usePokemon();
  
  let id = Number(location.pathname.split('/')[2]);
  id = isNaN(id) ? 1 : id;
  
  useEffect(() => {
    if (isNaN(id)) {
      navigate('/pokemon/1');
      return;
    }
    
    selectedPokemonIdHandler(id);
  }, []);
  
  useEffect(() => {
    if (selectedPokemonId === 0 || isNaN(id)) return;
    
    (async() => {
      let evolution!: IPokemonEvolution;
      isLoadingHandler(true);
      
      const promises = [
        getPokemonDetails(pokemonForm ? pokemonForm : selectedPokemonId),
        pokemonForm ? [] : getPokemonSpecies(selectedPokemonId),
      ];
      
      const [details, species] = await Promise.all(promises);
      
      if (!pokemonForm) {
        evolution = await getPokemonEvolution((species as IPokemonSpecies).evolution_chain.url);
      }
      
      const typesPromises = (details as IPokemonDetails).types.map(resource => getPokemonTypes(resource.type.url));
      
      const typesRelations = await Promise.all(typesPromises);
      
      const damageRelations = typesRelations.map(typeRelation => {
        if (!typeRelation) return;
        const { damage_relations, name } = typeRelation;
        const extractNames = (types: IResource[]) => types.map(type => type.name);
        return {
          doubleDamageFrom: extractNames(damage_relations.double_damage_from),
          doubleDamageTo: extractNames(damage_relations.double_damage_to),
          halfDamageFrom: extractNames(damage_relations.half_damage_from),
          halfDamageTo: extractNames(damage_relations.half_damage_to),
          noDamageFrom: extractNames(damage_relations.no_damage_from),
          noDamageTo: extractNames(damage_relations.no_damage_to),
          name: name,
        };
      });
      
      pokemonHandler({
        details: details as IPokemonDetails,
        species: pokemonForm ? pokemon!.species : species as IPokemonSpecies,
        evolutionChain: pokemonForm ? pokemon!.evolutionChain : getEvolutionData(evolution),
        damageRelations: damageRelations as IPokemonTypeDamageRelation[],
      });
      
      if ((details as IPokemonDetails).moves.length > 0) {
        storedMovesHandler((details as IPokemonDetails).moves);
      }
      
      isLoadingHandler(false);
    })();
  }, [selectedPokemonId, pokemonForm]);
  
  useEffect(() => {
    if (!pokemon) return;
    pokemonColorHandler(pokemon.species.color.name);
  }, [pokemon]);
  
  const getEvolutionData = (evolution: IPokemonEvolution): IEvolutionChainData[] => {
    const { chain } = evolution;
    const result: IEvolutionChainData[] = [];
    
    extractEvolutionData(chain, 0, result);
    
    return result;
  };
  
  const getEvolutionStage = (chain: IChain, stageNumber: number): string => {
    if (chain.is_baby) return 'Baby Stage';
    if (stageNumber > 0) return `Stage ${ stageNumber }`;
    return 'Base Stage';
  };
  
  const extractEvolutionData = (chain: IChain, stageNumber: number, result: IEvolutionChainData[]): void => {
    if (!chain.species) return;
    
    const evolutionData: IEvolutionChainData = {
      name: chain.species.name,
      id: Number(chain.species.url.split('/')[6]),
      types: getPokemonList().find(pokemon => pokemon.name.includes(chain.species.name.toLowerCase()))!.types,
      stage: getEvolutionStage(chain, stageNumber),
      evolutionDetails: chain.evolution_details,
    };
    
    result.push(evolutionData);
    
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      if (evolutionData.stage === 'Base Stage' || stageNumber > 0) stageNumber++;
      chain.evolves_to.forEach(evolves => extractEvolutionData(evolves, stageNumber, result));
    }
  };
  
  return (
    <>
      { pokemon &&
        <div className="md:pl-3 md:px-0 px-3 2xl:pl-10 xl:pl-6 lg:pr-0 relative h-full">
          <Pagination/>
          
          { !isLoading ?
            <div className="flex flex-col md:flex-row gap-y-4 md:h-[calc(100vh_-_124px)]">
              <div className="flex md:w-[35%]">
                <PokemonDescription/>
              </div>
              
              <div
                className="flex flex-col md:w-[65%] h-full rounded-r-6xl md:rounded-r-none 3xl:rounded-r-6xl rounded-l-6xl backdrop-blur-md custom-shadow
                  bg-primary-500/70 px-4 2xl:px-12 xl:px-6 md:px-8 pt-4 lg:pt-8 md:pt-6 2xl:overflow-hidden xl:overflow-hidden lg:overflow-hidden md:overflow-auto overflow-clip animate-fade-1_5"
              >
                <PokemonStats isShedinja={ pokemon.details.id === 292 }/>
                <PokemonInformation/>
              </div>
            </div> :
            <div className="absolute left-0 right-0 top-[300px] lg:top-0 bottom-0 m-auto h-fit w-fit">
              <Loading/>
            </div> }
        </div> }
    </>
  );
};
