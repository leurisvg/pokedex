import { useEffect, useState } from 'react';
import pokeball from '../assets/icons/pokeball.svg';
import { artworkSprite, capitalizeJoinedStr, dmToFt, getFormattedPokemonName, htToLb, shinyArtworkSprite } from '../helpers/index.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IResource } from '../interfaces/pokemonDetails.ts';
import { Sparkle } from './Sparkle.tsx';
import { TypeBadge } from './TypeBadge.tsx';

export const PokemonDescription = () => {
  const { selectedPokemonId, pokemon, pokemonFormHandler } = usePokemon();
  const { details, species, evolutionChain } = pokemon!;
  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const [shinyImgError, setShinyImgError] = useState<boolean>(false);
  const [shouldShowShinyImg, setShouldShowShinyImg] = useState<boolean>(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  
  const getLevelEvolution = () => {
    const i = evolutionChain.findIndex(data => data.name === details.name);
    const levelEvolution = evolutionChain[i + 1]?.evolutionDetails[0]?.min_level ?? null;
    setLevel(levelEvolution);
  };
  
  useEffect(() => {
    setShinyImgError(false);
    getSummary();
    getLevelEvolution();
  }, [selectedPokemonId]);
  
  const getSummary = () => {
    const enDesc = species.flavor_text_entries.filter(entry => entry.language.name === 'en');
    const desc = enDesc.find(entry => entry.version.name === 'ultra-sun');
    const summary = desc?.flavor_text ?? enDesc[enDesc.length - 1]?.flavor_text;
    setSummary(summary);
  };
  
  const toggleImgToShow = () => {
    setShouldShowShinyImg(!shouldShowShinyImg);
  };
  
  const changeForm = (variety: IResource) => {
    pokemonFormHandler(variety.name === species.name ? species!.id : Number(variety.url.split('/')[6]));
  };
  
  return (
    <div className="flex flex-col grow gap-y-2.5 2xl:pr-10 xl:pr-6">
      
      <div className="pokemon-img-container">
        <img
          className="pokemon-img"
          src={ shouldShowShinyImg ? shinyArtworkSprite(details.id) : artworkSprite(details.id) }
          alt={ details.name }
          onLoad={ ({ target }: any) => {
            setImgWidth(target.offsetWidth);
          } }
          onError={ ({ target }: any) => {
            target.src = pokeball;
            target.onerror = null;
          } }
        />
        
        <div className="miniature-img-container">
          <div className="miniature-shiny-img-container">
            { !shinyImgError &&
              <img
                className="w-[60px] object-contain z-40"
                src={ shouldShowShinyImg ? artworkSprite(details.id) : shinyArtworkSprite(details.id) }
                alt={ details.name }
                onClick={ toggleImgToShow }
                onError={ () => setShinyImgError(true) }
              /> }
            
            <div className="sparkles-container">
              { !shouldShowShinyImg &&
                <>
                  <div className="sparkle-1-container">
                    <div className="sparkle-1 sparkle">
                      <Sparkle size={ 50 }/>
                    </div>
                  </div>

                  <div className="sparkle-2-container">
                    <div className="sparkle-2 sparkle">
                      <Sparkle size={ 50 }/>
                    </div>
                  </div>
                </> }
            </div>
          </div>
        
        </div>
        
        { imgWidth && <div
          className="pokemon-shadow"
          style={ { width: imgWidth * 0.08 } }
        ></div> }
      </div>
      
      <h2 className="pt-5 lg:pt-8">
        { species.id.toString().padStart(4, '0') }
        <span className="font-bold ml-3 capitalize inline-block">
          { getFormattedPokemonName(details.name) }
        </span>
      </h2>
      
      <div className="flex flex-col gap-y-2.5 overflow-y-auto">
        <div className="flex items-center gap-3 mt-3">
          <p className="font-bold">Type:</p>
          { details.types.map(type => (<TypeBadge
            key={ type.slot }
            type={ type.type.name }
          />)) }
        </div>
        
        <p className="font-bold">
          Abilities:
          { details.abilities.map(ability => (
            <span
              key={ ability.ability.name }
              className="font-medium ml-3"
            >
              { capitalizeJoinedStr(ability.ability.name) }
            </span>
          )) }
        </p>
        
        <p className="font-bold">
          Height:
          <span className="font-medium ml-3">
          { dmToFt(details.height) }
        </span>
        </p>
        
        <p className="font-bold">
          Weight:
          <span className="font-medium ml-3 lowercase">
          { `${ htToLb(details.weight) } lbs` }
        </span>
        </p>
        
        { level &&
          <p className="font-bold">
            Evolve:
            <span className="font-medium ml-3">
          { `Level ${ level }` }
        </span>
          </p> }
        
        { summary &&
          <p className="font-bold">
            Summary:
            <span className="font-medium ml-3">
          { summary }
        </span>
          </p>
        }
        
        { (species.varieties.length > 1) &&
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <p className="font-bold">Forms:</p>
            
            { species.varieties.map(variety => (
              <p
                className={ `text-primary-500 py-1 px-2.5 rounded-full cursor-pointer transition hover:bg-secondary-500 ${ pokemon?.details.name === variety.pokemon.name ? 'bg-secondary-500' : 'bg-secondary-400' }` }
                key={ `variety_${ variety.pokemon.name }` }
                onClick={ () => changeForm(variety.pokemon) }
              >
                { getFormattedPokemonName(variety.pokemon.name) }
              </p>
            )) }
          </div>
        }
      </div>
    
    </div>
  );
};
