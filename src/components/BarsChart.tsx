import { motion } from 'framer-motion';
import { useState } from 'react';
import { IStatsProps } from '../interfaces/PokemonStats.ts';
import { PokemonStat } from './PokemonStat.tsx';

export const BarsChart = ({ stats }: IStatsProps) => {
  const [showMinStats, setShowMinStats] = useState(false);
  const { base, min, max } = stats;
  
  const toggleShowMinStats = () => {
    setShowMinStats(!showMinStats);
  };
  
  return (
    <>
      <div className="flex flex-col lg:flex-row 2xl:gap-x-16 xl:gap-x-6 lg:gap-x-5">
        <div className="md:w-full lg:w-5/12">
          <div className="pb-2 lg:pb-4">
            <h2 className="font-bold">Base Stats</h2>
            <p>Total ({ base.hp + base.spAttack + base.attack + base.spDefense + base.defense + base.speed })</p>
          </div>
          
          <div className="flex flex-col gap-y-2">
            { Object.entries(base).map(([key, value]) => (
              <PokemonStat
                key={ key }
                stat={ key }
                value={ Number(value) }
                maxValue={ 255 }
              />
            )) }
          </div>
        </div>
        
        <div className="md:w-full lg:w-7/12 mt-4 lg:mt-0">
          { showMinStats ?
            <motion.div className="pb-4 transition">
              <div className="flex items-end gap-x-2">
                <h2 className="font-bold">Min Stats</h2>
                <p
                  className="mb-1 text-secondary-500/70 hover:text-secondary-500 transition cursor-pointer"
                >
                  (<span
                  className="underline"
                  onClick={ toggleShowMinStats }
                >
                  See Max Stats
                </span>)
                </p>
              </div>
              <p>Hindering Nature (0 EVs, 0 IVs)</p>
            </motion.div> :
            <div className="pb-2 lg:pb-4 transition">
              <div className="flex items-end gap-x-2">
                <h2 className="font-bold">Max Stats</h2>
                <p
                  className="mb-1 text-secondary-500/70 hover:text-secondary-500 transition cursor-pointer"
                >
                  (<span
                  className="underline"
                  onClick={ toggleShowMinStats }
                >
                  See Min Stats
                </span>)
                </p>
              </div>
              <p>Beneficial Nature (Level 100, 252 EVs, 31 IVs)</p>
            </div>
          }
          
          <div className="flex flex-col gap-y-2">
            { showMinStats ?
              Object.entries(min).map(([key, value]) => (
                <motion.div>
                  <PokemonStat
                    key={ key }
                    stat={ key }
                    value={ Number(value) }
                    maxValue={ 700 }
                  />
                </motion.div>
              )) :
              Object.entries(max).map(([key, value]) => (
                <PokemonStat
                  key={ key }
                  stat={ key }
                  value={ Number(value) }
                  maxValue={ 700 }
                />
              )) }
          </div>
        </div>
      </div>
    </>
  );
};
