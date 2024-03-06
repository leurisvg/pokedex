import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IPokemonStats, IStats } from '../interfaces/PokemonStats.ts';
import { BarsChart } from './BarsChart.tsx';
import { RadarChart } from './RadarChart.tsx';

interface Props {
  isShedinja: boolean;
}

export const PokemonStats = ({ isShedinja }: Props) => {
  const [showRadialChart, setShowRadialChart] = useState<boolean>(false);
  const { pokemon } = usePokemon();
  const [stats, setStats] = useState<IPokemonStats | null>(null);
  const { details } = pokemon!;
  
  useEffect(() => {
    baseStats();
  }, []);
  
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 40,
  };
  
  const variants = {
    enter: (showRadialChart: boolean) => {
      return {
        x: showRadialChart ? -1000 : 1000,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (showRadialChart: boolean) => {
      return {
        zIndex: 0,
        x: showRadialChart ? 1000 : -1000,
      };
    },
  };
  
  const toggleSwitch = () => setShowRadialChart(!showRadialChart);
  
  const setStatsHandler = (statType: 'base' | 'min' | 'max', obj: IStats) => {
    setStats(prev => {
      return {
        ...prev ?? {},
        [statType]: {
          ...prev?.[statType],
          ...obj,
        },
      } as IPokemonStats;
    });
  };
  
  const baseStats = () => {
    let obj = {} as IStats;
    
    details.stats.forEach(s => {
      let statName = s.stat.name;
      
      if (statName === 'special-attack') {
        statName = 'spAttack';
      } else if (statName === 'special-defense') {
        statName = 'spDefense';
      }
      
      if (statName !== 'special-attack' && statName !== 'special-defense') {
        obj = {
          ...obj,
          [statName]: s.base_stat,
        };
      }
    });
    setStatsHandler('base', obj);
    minStats(obj);
    maxStats(obj);
  };
  
  const minStats = (baseStats: IStats) => {
    let obj = {} as IStats;
    const hp = isShedinja ? 1 : Math.floor((2 * baseStats.hp) * 100 / 100 + 100 + 10);
    const keys = Object.keys(baseStats).slice(0);
    
    keys.forEach(k => {
      obj = {
        ...obj,
        [k]: Math.floor(Math.floor(Math.floor((2 * (baseStats as any)[k]) * 100 / 100 + 5) * 0.9)),
      } as unknown as IStats;
    });
    
    setStatsHandler('min', { ...obj, hp });
  };
  
  const maxStats = (baseStats: IStats) => {
    let obj = {} as IStats;
    const hp = isShedinja ? 1 : Math.floor((2 * baseStats.hp + 31 + 63) * 100 / 100 + 100 + 10);
    const keys = Object.keys(baseStats).slice(0);
    
    keys.forEach(k => {
      obj = {
        ...obj,
        [k]: Math.floor(Math.floor((2 * (baseStats as any)[k] + 31 + 63) * 100 / 100 + 5) * 1.1),
      } as unknown as IStats;
    });
    
    setStatsHandler('max', { ...obj, hp });
  };
  
  return (
    <>
      { stats &&
        <div className={ `lg:min-h-[450px] ${ showRadialChart ? 'min-h-[425px]' : 'min-h-[855px]' }` }>
          <div className="flex justify-center w-full mb-4">
            <div
              className="switch"
              onClick={ toggleSwitch }
            >
              <motion.div
                className={ `handle ${ showRadialChart ? 'right-2' : 'left-2' }` }
                layout
                transition={ spring }
              />

              <div className="flex justify-center ml-2 w-[105px]">
                <p className={ `z-10 transition ${ showRadialChart ? 'text-secondary-500/70' : 'text-primary-500' }` }>Bar Chart</p>
              </div>

              <div className="flex transition justify-center mr-2 w-[105px]">
                <p className={ `z-10 ${ showRadialChart ? 'text-primary-500' : 'text-secondary-500/70' }` }>Radar Chart</p>
              </div>

            </div>
          </div>

          <div className="relative">
            <AnimatePresence
              initial={ false }
              custom={ showRadialChart }
            >
              <motion.div
                className="absolute w-full left-0 top-0"
                key={ showRadialChart ? 0 : 1 }
                initial="enter"
                animate="center"
                variants={ variants }
                exit="exit"
                transition={ { duration: 0.3 } }
                custom={ showRadialChart }
              >
                
                { showRadialChart ?
                  <RadarChart stats={ stats }/> :
                  <BarsChart stats={ stats }/>
                }
              </motion.div>
            </AnimatePresence>
          </div>

        </div> }
    </>
  );
};
