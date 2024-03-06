export interface IPokemonStats {
  base: IStats;
  min: IStats;
  max: IStats;
}

export interface IStats {
  hp: number;
  attack: number,
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export interface IStatsProps {
  stats: IPokemonStats;
}
