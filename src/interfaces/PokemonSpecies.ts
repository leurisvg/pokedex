import { IResource } from './pokemonDetails.ts';

export interface IPokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: IResource;
  egg_groups: IResource[];
  evolution_chain: IEvolutionChain;
  evolves_from_species: null;
  flavor_text_entries: IFlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: IGenus[];
  generation: IResource;
  growth_rate: IResource;
  habitat: IResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: IName[];
  order: number;
  pal_park_encounters: IPalParkEncounter[];
  pokedex_numbers: IPokedexNumber[];
  shape: IResource;
  varieties: IVariety[];
}

export interface IEvolutionChain {
  url: string;
}

export interface IFlavorTextEntry {
  flavor_text: string;
  language: IResource;
  version: IResource;
}

export interface IGenus {
  genus: string;
  language: IResource;
}

export interface IName {
  language: IResource;
  name: string;
}

export interface IPalParkEncounter {
  area: IResource;
  base_score: number;
  rate: number;
}

export interface IPokedexNumber {
  entry_number: number;
  pokedex: IResource;
}

export interface IVariety {
  is_default: boolean;
  pokemon: IResource;
}
