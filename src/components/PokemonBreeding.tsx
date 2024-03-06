import { useEffect, useState } from 'react';
import female from '../assets/icons/female.png';
import male from '../assets/icons/male.png';
import { capitalizeJoinedStr, games } from '../helpers/index.ts';
import { useMoves } from '../hooks/useMoves.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IMoveData } from '../interfaces/pokemonDetails.ts';
import { IMoveDetail } from '../interfaces/PokemonMoves.ts';
import { Table } from './Table.tsx';

interface Props {
  moveDetails: IMoveDetail[];
  setMovesDetails: (moves: IMoveDetail[]) => void;
}

export const PokemonBreeding = ({ moveDetails, setMovesDetails }: Props) => {
  const [movesData, setMovesData] = useState<IMoveData[]>([]);
  const [hasEggMoves, setHasEggMoves] = useState<boolean>(false);
  const { pokemon } = usePokemon();
  const { species } = pokemon!;
  const { moves, getMoves } = useMoves();
  
  useEffect(() => {
    (async() => {
      let data: IMoveDetail[];
      
      if (moveDetails.length === 0) {
        data = await getMoves();
        setMovesDetails(data);
      } else {
        data = moveDetails;
      }
      
      getEggMoves(data);
    })();
  }, []);
  
  const getEggMoves = (pDetails: IMoveDetail[]) => {
    setMovesData([]);
    
    const eggMoves = moves().filter(m => m.version_group_details.find(detail => detail.move_learn_method.name === 'egg'));
    
    setHasEggMoves(eggMoves.length > 0);
    
    if (!eggMoves) return;
    
    eggMoves.forEach(m => {
      const eggsVersionGroupDetail = m.version_group_details.filter(vg => vg.move_learn_method.name === 'egg')!;
      const eggsMovesGeneration = eggsVersionGroupDetail.flatMap(detail => games.filter(g => g.versionGroup === Number(detail.version_group.url.split('/')[6])).map(g => g.generation));
      
      setMovesData(prev => [
        ...prev,
        {
          learnMethod: eggsVersionGroupDetail[0],
          details: pDetails.find(move => move.name === m.move.name)!,
          generation: [...new Set(eggsMovesGeneration)],
        },
      ]);
    });
  };
  
  return (
    <>
      <div className={ `flex justify-between lg:justify-normal lg:gap-x-8 ${ hasEggMoves ? '' : 'flex-col gap-y-3' }` }>
        <div>
          <h5 className="font-bold">Egg Groups</h5>
          <div className="flex gap-x-3">
            { species.egg_groups.map(group => (
              <p
                key={ group.name }
                className="capitalize"
              >
                { capitalizeJoinedStr(group.name) }
              </p>
            )) }
          </div>
        </div>
        
        <div className="flex flex-col">
          <h5 className="font-bold">Gender</h5>
          
          { species.gender_rate === -1 ?
            <p>Genderless</p> :
            <div className="flex flex-col lg:flex-row gap-x-3">
              <div className="flex">
                <img
                  className="object-contain"
                  src={ male }
                  alt="male"
                />
                <p className="text-[#0070F8]">{ species.gender_rate * 12.5 }%</p>
              </div>
              <div className="flex">
                <img
                  className="object-contain"
                  src={ female }
                  alt="female"
                />
                <p className="text-[#E62111]">{ (8 - species.gender_rate) * 12.5 }%</p>
              </div>
            </div> }
        </div>
        
        <div>
          <h5 className="font-bold">Egg Cycles</h5>
          <div className="flex flex-col lg:flex-row gap-x-1">
            <p>{ species.hatch_counter }</p>
            <p>({ 256 * (species.hatch_counter) } steps)</p>
          </div>
        </div>
      </div>
      
      { hasEggMoves &&
        <div className="pt-2">
          <h5 className="font-bold">Egg Moves</h5>
          <Table moves={ movesData }/>
        </div> }
    
    </>
  );
};
