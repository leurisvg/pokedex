import { IResource } from './pokemonDetails.ts';

export interface IPokeMonTypes {
  damage_relations: IDamageRelations;
  game_indices: GameIndex[];
  generation: IResource;
  id: number;
  move_damage_class: IResource;
  moves: IResource[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
}

export interface IDamageRelations {
  double_damage_from: IResource[];
  double_damage_to: IResource[];
  half_damage_from: IResource[];
  half_damage_to: IResource[];
  no_damage_from: IResource[];
  no_damage_to: IResource[];
}

export interface GameIndex {
  game_index: number;
  generation: IResource;
}

export interface Name {
  language: IResource;
  name: string;
}

export interface Pokemon {
  pokemon: IResource;
  slot: number;
}

export interface IPokemonTypeDamageRelation {
  doubleDamageFrom: string[];
  doubleDamageTo: string[];
  halfDamageFrom: string[];
  halfDamageTo: string[];
  noDamageFrom: string[];
  noDamageTo: string[];
  name: string;
}
