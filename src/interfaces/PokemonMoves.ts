import { IResource } from './pokemonDetails.ts';

export interface IMoveDetail {
  accuracy: number | null;
  contest_combos: null;
  contest_effect: ContestEffect | null;
  contest_type: IResource | null;
  damage_class: IResource;
  effect_chance: null;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: IResource;
  id: number;
  learned_by_pokemon: IResource[];
  machines: Machine[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: PastValue[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: ContestEffect;
  target: IResource;
  type: IResource;
}

export interface ContestEffect {
  url: string;
}

export interface EffectEntry {
  effect: string;
  language: IResource;
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: IResource;
  version_group: IResource;
}

export interface Machine {
  machine: ContestEffect;
  version_group: IResource;
}

export interface Meta {
  ailment: IResource;
  ailment_chance: number;
  category: IResource;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: null;
  max_turns: null;
  min_hits: null;
  min_turns: null;
  stat_chance: number;
}

export interface Name {
  language: IResource;
  name: string;
}

export interface PastValue {
  accuracy: number;
  effect_chance: null;
  effect_entries: any[];
  power: null;
  pp: null;
  type: null;
  version_group: IResource;
}
