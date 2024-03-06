import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IMoveDetail } from '../interfaces/PokemonMoves.ts';
import { PokemonBreeding } from './PokemonBreeding.tsx';
import { PokemonDefense } from './PokemonDefense.tsx';
import { PokemonEvolutionChain } from './PokemonEvolutionChain.tsx';
import { PokemonMoveset } from './PokemonMoveset.tsx';
import { Tabs } from './Tabs.tsx';

export interface SelectedTab {
  prev: number;
  current: number;
}

export const PokemonInformation = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>({ prev: 0, current: 0 });
  const [movesDetails, setMovesDetails] = useState<IMoveDetail[]>([]);
  
  const movesDetailsHandler = (moves: IMoveDetail[]) => {
    setMovesDetails([...moves]);
  };
  
  const tabPage = () => {
    switch (selectedTab.current) {
      case 0:
        return <PokemonEvolutionChain/>;
      case 1:
        return <PokemonBreeding
          moveDetails={ movesDetails }
          setMovesDetails={ movesDetailsHandler }
        />;
      case 2:
        return <PokemonDefense/>;
      case 3:
        return <PokemonMoveset
          moveDetails={ movesDetails }
          setMovesDetails={ movesDetailsHandler }
        />;
      default:
        return <PokemonDefense/>;
    }
  };
  
  const variants = {
    enter: (tabState: SelectedTab) => {
      return {
        x: tabState.current > tabState.prev ? -1000 : 1000,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (tabState: SelectedTab) => {
      return {
        zIndex: 0,
        x: tabState.current < tabState.prev ? -1000 : 1000,
      };
    },
  };
  
  return (
    <div className="flex flex-col grow mt-11 lg:min-h-fit min-h-[400px]">
      <div className="mb-5">
        <Tabs
          selectedTab={ selectedTab.current }
          setSelectedTab={ setSelectedTab }
        />
      </div>
      
      <div className="grow overflow-y-auto relative">
        <AnimatePresence
          initial={ false }
          custom={ selectedTab }
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            key={ selectedTab.current }
            initial="enter"
            animate="center"
            variants={ variants }
            exit="exit"
            transition={ { duration: 0.3 } }
            custom={ selectedTab }
          >
            { tabPage() }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
