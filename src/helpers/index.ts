import bug from '../assets/types-icons/bug.svg';
import dark from '../assets/types-icons/dark.svg';
import dragon from '../assets/types-icons/dragon.svg';
import electric from '../assets/types-icons/electric.svg';
import fairy from '../assets/types-icons/fairy.svg';
import fighting from '../assets/types-icons/fighting.svg';
import fire from '../assets/types-icons/fire.svg';
import flying from '../assets/types-icons/flying.svg';
import ghost from '../assets/types-icons/ghost.svg';
import grass from '../assets/types-icons/grass.svg';
import ground from '../assets/types-icons/ground.svg';
import ice from '../assets/types-icons/ice.svg';
import normal from '../assets/types-icons/normal.svg';
import poison from '../assets/types-icons/poison.svg';
import psychic from '../assets/types-icons/psychic.svg';
import rock from '../assets/types-icons/rock.svg';
import steel from '../assets/types-icons/steel.svg';
import water from '../assets/types-icons/water.svg';
import { IGame } from '../interfaces/pokemonDetails.ts';
import { IEvolutionChainData, IEvolutionDetail } from '../interfaces/PokemonEvolution.ts';

export const gifSprite = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${ id }.gif`;
};

export const sprite = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ id }.png`;
};

export const artworkSprite = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`;
};

export const shinyArtworkSprite = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${ id }.png`;
};

export const itemSprite = (item: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${ item }.png`;
};

export const dmToFt = (dm: number): string => {
  const feet = dm / 3.048;
  let floorFeet = Math.floor(dm / 3.048);
  let inches = Math.round((feet - floorFeet) * 12);
  
  if (inches === 12) {
    floorFeet++;
    inches = 0;
  }
  
  return `${ floorFeet }' ${ inches }"`;
};

export const htToLb = (ht: number): string => {
  return (ht / 4.536).toFixed(1);
};

export const stringSimilarity = (stringOne: string, stringTwo: string) => {
  const config = Object.assign({ trimByString: /\s/g, caseSensitive: false });
  
  stringOne = stringOne.replace(config.trimByString, '');
  stringTwo = stringTwo.replace(config.trimByString, '');
  
  if (!config.caseSensitive) {
    stringOne = stringOne.toLowerCase();
    stringTwo = stringTwo.toLowerCase();
  }
  
  if (!stringOne.length && !stringTwo.length) return 1;
  if (!stringOne.length || !stringTwo.length) return 0;
  if (stringOne === stringTwo) return 1;
  if (stringOne.length === 1 && stringTwo.length === 1) return 0;
  if (stringOne.length < 2 || stringTwo.length < 2) return 0;
  
  const firstBigrams = new Map();
  for (let i = 0; i < stringOne.length - 1; i++) {
    const bigram = stringOne.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    
    firstBigrams.set(bigram, count);
  }
  
  let intersectionSize = 0;
  for (let i = 0; i < stringTwo.length - 1; i++) {
    const bigram = stringTwo.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
    
    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }
  
  return (2.0 * intersectionSize) / (stringOne.length + stringTwo.length - 2);
};

export const getEvolutionDescription = (evolutionChain: IEvolutionChainData[], chain: IEvolutionChainData, details: IEvolutionDetail) => {
  let desc = '';
  const name = capitalizeJoinedStr(getEvolutionChainPokemonName(evolutionChain, chain.stage!));
  const gender = details.gender === 2 ? 'Male ' : details.gender === 1 ? 'Female ' : '';
  
  const statComparison: { [key: string]: string } = {
    '1': 'with Attack greater than Defense',
    '-1': 'with Defense greater than Attack',
    '0': 'with equal Attack and Defense',
  };
  
  switch (details.trigger.name) {
    case 'level-up':
      if (details.min_level) {
        desc = `${ gender }${ name } reaches level ${ details.min_level }`;
      } else {
        desc = `Level up ${ name }`;
      }
      if (details.held_item) {
        desc = `${ desc } holding ${ capitalizeJoinedStr(details.held_item.name) }`;
      }
      if (details.known_move) {
        desc = `${ desc } knowing ${ capitalizeJoinedStr(details.known_move.name) } move`;
      }
      if (details.known_move_type) {
        desc = `${ desc } knowing a ${ capitalizeJoinedStr(details.known_move_type.name) } move`;
      }
      if (details.min_affection) {
        desc = `${ desc } with high Affection (${ details.min_affection }+)`;
      }
      if (details.min_beauty) {
        desc = `${ desc } with high Beauty (${ details.min_beauty }+)`;
      }
      if (details.min_happiness) {
        desc = `${ desc } with high Happiness (${ details.min_happiness }+)`;
      }
      if (details.relative_physical_stats !== null) {
        desc = `${ desc } ${ statComparison[details.relative_physical_stats!.toString()] }`;
      }
      if (details.party_species) {
        desc = `${ desc } with a ${ capitalizeStr(details.party_species.name) } in your party`;
      }
      if (details.party_type) {
        desc = `${ desc } with a ${ capitalizeStr(details.party_type.name) } type Pokemon in your party`;
      }
      if (details.location) {
        desc = `${ desc } at ${ capitalizeJoinedStr(details.location.name) } location`;
      }
      if (details.needs_overworld_rain) {
        desc = `${ desc } while it is raining`;
      }
      if (details.time_of_day) {
        desc = `${ desc } in the ${ details.time_of_day }`;
      }
      if (details.turn_upside_down) {
        desc = `${ desc } while the 3DS or Switch console is held upside down`;
      }
      break;
    
    case 'trade':
      desc = `Trade ${ gender }${ name }`;
      if (details.held_item) {
        desc = `${ desc } holding ${ capitalizeJoinedStr(details.held_item.name) }`;
      }
      if (details.trade_species) {
        desc = `${ desc } with ${ capitalizeJoinedStr(details.trade_species.name) }`;
      }
      break;
    
    case 'use-item':
      desc = 'Use';
      if (details.item) {
        desc = `${ desc } ${ capitalizeJoinedStr(details.item.name) } on ${ gender }${ name }`;
      }
      break;
    
    case 'shed':
      desc = `${ name } reaches level 20, empty spot in party and Pokéball in bag`;
      break;
    
    case 'spin':
      desc = `Spin around while having a ${ name } in your team and holding a Sweet`;
      break;
    
    case 'tower-of-darkness':
      desc = `In ${ capitalizeJoinedStr(details.trigger.name) }`;
      break;
    
    case 'tower-of-waters':
      desc = `In ${ capitalizeJoinedStr(details.trigger.name) }`;
      break;
    
    case 'three-critical-hits':
      desc = `Achieve 3 critical hits with ${ name } in one battle`;
      break;
    
    case 'take-damage':
      desc = `Travel under the large rock arch in Dusty Bowl after ${ name } has taken at least 49 HP in damage (even if healed) without fainting`;
      break;
    
    case 'other':
      desc = rareEvolutions(chain, name);
      break;
  }
  
  return desc;
};

const rareEvolutions = (chain: IEvolutionChainData, name: string): string => {
  switch (chain.name) {
    case 'pawmot':
      return `Walk 1,000 steps with ${ name } in Let's Go mode`;
    case 'maushold':
      return `${ name } reaches level 25`;
    case 'brambleghast':
      return `Walk 1,000 steps with ${ name } in Let's Go mode`;
    case 'rabsca':
      return `Walk 1,000 steps with ${ name } in Let's Go mode`;
    case 'palafin':
      return `${ name } reaches level 38 while in multiplayer`;
    case 'annihilape':
      return `Use Rage Fist 20 times with ${ name }`;
    case 'kingambit':
      return `Defeat 3 Bisharp that are holding Leader's Crest`;
    case 'gholdengo':
      return `Collect 999 Coins from Roaming Form`;
    default:
      return '';
  }
};

const getEvolutionChainPokemonName = (chain: IEvolutionChainData[], stage: string): string => {
  const hasBabyStage = chain[0].stage === 'Baby Stage';
  if (hasBabyStage && stage === 'Base Stage') return capitalizeStr(chain[0].name);
  
  const stageNumber = Number(stage.split(' ')[1]);
  const targetStage = stageNumber === 1 ? 'Base Stage' : `Stage ${ stageNumber - 1 }`;
  const name = chain.find(c => c.stage === targetStage)?.name || '';
  return capitalizeStr(name);
};

export const getFormattedPokemonName = (name: string) => {
  const splitName = name.split('-');
  
  if (splitName.length === 1) {
    return capitalizeStr(splitName[0]);
  }
  
  if (splitName.includes('gmax')) {
    return `Gigantamax ${ capitalizeStr(splitName[0]) }`;
  }
  
  if (splitName.includes('mega')) {
    return `Mega ${ capitalizeStr(splitName[0]) }` + (splitName.length === 3 ? ` ${ capitalizeStr(splitName[2]) }` : '');
  }
  
  if (splitName.includes('galar')) {
    return `Galarian ${ splitName.length === 2 ? `${ capitalizeStr(splitName[0]) }` : `${ capitalizeStr(splitName[2]) } ${ capitalizeStr(splitName[0]) }` }`;
  }
  
  if (splitName.includes('alola')) {
    return `${ capitalizeStr(splitName[1]) } ${ capitalizeStr(splitName[0]) }`;
  }
  
  if (splitName.length > 2) {
    return capitalizeJoinedStr(name);
  }
  
  return capitalizeJoinedStr(name);
};

export const capitalizeJoinedStr = (str: string): string => {
  return str
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
};

export const capitalizeStr = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const typesIcons: { [key: string]: string } = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

export const pokemonColors: { [key: string]: string } = {
  black: 'bg-[#676767]',
  blue: 'bg-[#CAE3FF]',
  brown: 'bg-[#CAA36F]',
  gray: 'bg-[#E0E0E0]',
  green: 'bg-[#E3FFCA]',
  pink: 'bg-[#FFCAE3]',
  purple: 'bg-[#CAA3FF]',
  red: 'bg-[#FFB8B1]',
  white: 'bg-[#F8F8FF]',
  yellow: 'bg-[#FDFDBC]',
};

export const statName = (name: string) => {
  switch (name) {
    case 'hp':
      return 'HP';
    case 'spAttack':
      return 'Special Attack';
    case 'spDefense':
      return 'Special Defense';
    default:
      return capitalizeStr(name);
  }
};

export const typesColors: {
  bg: { [key: string]: string },
  shadow: { [key: string]: string },
  opacityBg: { [key: string]: string },
  from: { [key: string]: string },
  to: { [key: string]: string }
} = {
  bg: {
    normal: 'bg-[#A8A77A]',
    fire: 'bg-[#EE8130]',
    water: 'bg-[#6390F0]',
    electric: 'bg-[#F7D02C]',
    grass: 'bg-[#7AC74C]',
    ice: 'bg-[#96D9D6]',
    fighting: 'bg-[#C22E28]',
    poison: 'bg-[#A33EA1]',
    ground: 'bg-[#E2BF65]',
    flying: 'bg-[#A98FF3]',
    psychic: 'bg-[#F95587]',
    bug: 'bg-[#A6B91A]',
    rock: 'bg-[#B6A136]',
    ghost: 'bg-[#735797]',
    dragon: 'bg-[#6F35FC]',
    dark: 'bg-[#705746]',
    steel: 'bg-[#B7B7CE]',
    fairy: 'bg-[#D685AD]',
  },
  shadow: {
    normal: 'shadow-[#A8A77A]/[.45]',
    fire: 'shadow-[#EE8130]/[.45]',
    water: 'shadow-[#6390F0]/[.45]',
    electric: 'shadow-[#F7D02C]/[.45]',
    grass: 'shadow-[#7AC74C]/[.45]',
    ice: 'shadow-[#96D9D6]/[.45]',
    fighting: 'shadow-[#C22E28]/[.45]',
    poison: 'shadow-[#A33EA1]/[.45]',
    ground: 'shadow-[#E2BF65]/[.45]',
    flying: 'shadow-[#A98FF3]/[.45]',
    psychic: 'shadow-[#F95587]/[.45]',
    bug: 'shadow-[#A6B91A]/[.45]',
    rock: 'shadow-[#B6A136]/[.45]',
    ghost: 'shadow-[#735797]/[.45]',
    dragon: 'shadow-[#6F35FC]/[.45]',
    dark: 'shadow-[#705746]/[.45]',
    steel: 'shadow-[#B7B7CE]/[.45]',
    fairy: 'shadow-[#D685AD]/[.45]',
  },
  opacityBg: {
    normal: 'bg-[#A8A77A]/[.45]',
    fire: 'bg-[#EE8130]/[.45]',
    water: 'bg-[#6390F0]/[.45]',
    electric: 'bg-[#F7D02C]/[.45]',
    grass: 'bg-[#7AC74C]/[.45]',
    ice: 'bg-[#96D9D6]/[.45]',
    fighting: 'bg-[#C22E28]/[.45]',
    poison: 'bg-[#A33EA1]/[.45]',
    ground: 'bg-[#E2BF65]/[.45]',
    flying: 'bg-[#A98FF3]/[.45]',
    psychic: 'bg-[#F95587]/[.45]',
    bug: 'bg-[#A6B91A]/[.45]',
    rock: 'bg-[#B6A136]/[.45]',
    ghost: 'bg-[#735797]/[.45]',
    dragon: 'bg-[#6F35FC]/[.45]',
    dark: 'bg-[#705746]/[.45]',
    steel: 'bg-[#B7B7CE]/[.45]',
    fairy: 'bg-[#D685AD]/[.45]',
  },
  from: {
    normal: 'from-[#A8A77A]/[.45]',
    fire: 'from-[#EE8130]/[.45]',
    water: 'from-[#6390F0]/[.45]',
    electric: 'from-[#F7D02C]/[.45]',
    grass: 'from-[#7AC74C]/[.45]',
    ice: 'from-[#96D9D6]/[.45]',
    fighting: 'from-[#C22E28]/[.45]',
    poison: 'from-[#A33EA1]/[.45]',
    ground: 'from-[#E2BF65]/[.45]',
    flying: 'from-[#A98FF3]/[.45]',
    psychic: 'from-[#F95587]/[.45]',
    bug: 'from-[#A6B91A]/[.45]',
    rock: 'from-[#B6A136]/[.45]',
    ghost: 'from-[#735797]/[.45]',
    dragon: 'from-[#6F35FC]/[.45]',
    dark: 'from-[#705746]/[.45]',
    steel: 'from-[#B7B7CE]/[.45]',
    fairy: 'from-[#D685AD]/[.45]',
  },
  to: {
    normal: 'to-[#A8A77A]/[.45]',
    fire: 'to-[#EE8130]/[.45]',
    water: 'to-[#6390F0]/[.45]',
    electric: 'to-[#F7D02C]/[.45]',
    grass: 'to-[#7AC74C]/[.45]',
    ice: 'to-[#96D9D6]/[.45]',
    fighting: 'to-[#C22E28]/[.45]',
    poison: 'to-[#A33EA1]/[.45]',
    ground: 'to-[#E2BF65]/[.45]',
    flying: 'to-[#A98FF3]/[.45]',
    psychic: 'to-[#F95587]/[.45]',
    bug: 'to-[#A6B91A]/[.45]',
    rock: 'to-[#B6A136]/[.45]',
    ghost: 'to-[#735797]/[.45]',
    dragon: 'to-[#6F35FC]/[.45]',
    dark: 'to-[#705746]/[.45]',
    steel: 'to-[#B7B7CE]/[.45]',
    fairy: 'to-[#D685AD]/[.45]',
  },
};

export const games: IGame[] = [
  { name: 'red', versionGroup: 1, generation: 'generation-i' },
  { name: 'blue', versionGroup: 1, generation: 'generation-i' },
  { name: 'yellow', versionGroup: 2, generation: 'generation-i' },
  { name: 'gold', versionGroup: 3, generation: 'generation-ii' },
  { name: 'silver', versionGroup: 3, generation: 'generation-ii' },
  { name: 'crystal', versionGroup: 4, generation: 'generation-ii' },
  { name: 'ruby', versionGroup: 5, generation: 'generation-iii' },
  { name: 'sapphire', versionGroup: 5, generation: 'generation-iii' },
  { name: 'emerald', versionGroup: 6, generation: 'generation-iii' },
  { name: 'firered', versionGroup: 7, generation: 'generation-iii' },
  { name: 'leafgreen', versionGroup: 7, generation: 'generation-iii' },
  { name: 'diamond', versionGroup: 8, generation: 'generation-iv' },
  { name: 'pearl', versionGroup: 8, generation: 'generation-iv' },
  { name: 'platinum', versionGroup: 9, generation: 'generation-iv' },
  { name: 'heartgold', versionGroup: 10, generation: 'generation-iv' },
  { name: 'soulsilver', versionGroup: 10, generation: 'generation-iv' },
  { name: 'black', versionGroup: 11, generation: 'generation-v' },
  { name: 'white', versionGroup: 11, generation: 'generation-v' },
  { name: 'colosseum', versionGroup: 12, generation: 'generation-iii' },
  { name: 'xd', versionGroup: 13, generation: 'generation-iii' },
  { name: 'black-2', versionGroup: 14, generation: 'generation-v' },
  { name: 'white-2', versionGroup: 14, generation: 'generation-v' },
  { name: 'x', versionGroup: 15, generation: 'generation-vi' },
  { name: 'y', versionGroup: 15, generation: 'generation-vi' },
  { name: 'omega-ruby', versionGroup: 16, generation: 'generation-vi' },
  { name: 'alpha-sapphire', versionGroup: 16, generation: 'generation-vi' },
  { name: 'sun', versionGroup: 17, generation: 'generation-vii' },
  { name: 'moon', versionGroup: 17, generation: 'generation-vii' },
  { name: 'ultra-sun', versionGroup: 18, generation: 'generation-vii' },
  { name: 'ultra-moon', versionGroup: 18, generation: 'generation-vii' },
  { name: 'lets-go-pikachu', versionGroup: 19, generation: 'generation-vii' },
  { name: 'lets-go-eevee', versionGroup: 19, generation: 'generation-vii' },
  { name: 'sword', versionGroup: 20, generation: 'generation-viii' },
  { name: 'shield', versionGroup: 20, generation: 'generation-viii' },
  { name: 'the-isle-of-armor', versionGroup: 21, generation: 'generation-viii' },
  { name: 'the-crown-tundra', versionGroup: 22, generation: 'generation-viii' },
  { name: 'brilliant-diamond', versionGroup: 23, generation: 'generation-viii' },
  { name: 'shining-pearl', versionGroup: 23, generation: 'generation-viii' },
  { name: 'legends-arceus', versionGroup: 24, generation: 'generation-viii' },
  { name: 'scarlet', versionGroup: 25, generation: 'generation-ix' },
  { name: 'violet', versionGroup: 25, generation: 'generation-ix' },
  { name: 'the-teal-mask', versionGroup: 26, generation: 'generation-ix' },
  { name: 'the-indigo-disk', versionGroup: 27, generation: 'generation-ix' },
];

export const gameNameToVersionGroup = (games: IGame[], game: string) => {
  const foundGame = games.find(g => g.name === game);
  const versionGame = games
  .filter(g => g.versionGroup === foundGame?.versionGroup)
  .map(g => g.name);
  
  if (versionGame.includes('brilliant-diamond') || versionGame.includes('shining-pearl')) {
    return versionGame.join('-and-');
  }
  
  return versionGame.join('-');
};
