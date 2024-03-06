import { IResource } from './pokemonDetails.ts';

export interface IPokemonEvolution {
  baby_trigger_item: any;
  chain: IChain;
  id: number;
}

export interface IChain {
  evolution_details: IEvolutionDetail[];
  evolves_to: IChain[];
  is_baby: boolean;
  species: IResource;
}

export interface IEvolutionDetail {
  gender?: number | null;
  held_item?: IEvolutionCondition | null;
  item?: IEvolutionCondition | null;
  known_move?: IEvolutionCondition | null;
  known_move_type?: IEvolutionCondition | null;
  location?: IEvolutionCondition | null;
  min_affection?: number | null;
  min_beauty?: number | null;
  min_happiness?: number | null;
  min_level?: number | null;
  needs_overworld_rain: boolean;
  party_species?: IEvolutionCondition | null;
  party_type?: IEvolutionCondition | null;
  relative_physical_stats?: number | null;
  time_of_day?: 'day' | 'night' | null;
  trade_species?: IEvolutionCondition | null;
  trigger: IResource;
  turn_upside_down: boolean;
}

export interface IEvolutionChainData {
  name: string;
  id: number;
  types: string[];
  stage?: string | null;
  evolutionDetails: IEvolutionDetail[];
}

export interface IEvolutionCondition {
  name: string;
  url: string;
}
