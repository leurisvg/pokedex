import { createRef, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { usePokemon } from '../hooks/usePokemon.ts';
import { SelectedTab } from './PokemonInformation.tsx';

interface BarProps {
  position: number;
  width: number;
}

interface TabProps {
  name: string;
  value: number;
}

interface Props {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<SelectedTab>>;
}

export const Tabs = ({ selectedTab, setSelectedTab }: Props) => {
  const { pokemon, windowWidth } = usePokemon();
  const [barValues, setBarValues] = useState<BarProps>({} as BarProps);
  const [tabs, setTabs] = useState<TabProps[]>([
    { name: 'Evolution Chain', value: 0 },
    { name: 'Breeding', value: 1 },
    { name: 'Defense', value: 2 },
    { name: 'Moveset', value: 3 },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  
  const tabsRefs = useMemo(
    () => tabs.map(() => createRef<HTMLDivElement>()),
    [tabs.join(',')],
  );
  
  useEffect(() => {
    if (pokemon!.evolutionChain.length <= 1) {
      setTabs(tabs.filter(tab => tab.value !== 0));
    }
    
    setTimeout(() => selectTab(0), 100);
  }, [tabsRefs]);
  
  const selectTab = (i: number) => {
    const clickedTab = tabsRefs[i];
    const containerPos = containerRef.current?.getBoundingClientRect();
    const tabPos = clickedTab.current?.getBoundingClientRect();
    
    if (!containerPos || !tabPos) return;
    
    const relativePosLeft = tabPos.left - containerPos.left;
    
    setBarValues({
      position: relativePosLeft,
      width: tabPos.width,
    });
    
    setSelectedTab(prev => ({
      prev: prev.current,
      current: tabs[i].value,
    }));
  };
  
  return (
    <div
      className="tabs-wrapper"
      ref={ containerRef }
    >
      { (windowWidth > 768) &&
        <div
          ref={ barRef }
          className="selected-bar"
          style={ {
            width: `${ barValues.width }px`,
            left: `${ barValues.position }px`,
          } }
        ></div> }
      { tabs.map((tab, i) => (
        <h4
          ref={ tabsRefs[i] }
          key={ tab.name }
          className={ `tab ${ selectedTab === tab.value ? 'active' : 'inactive' }` }
          onClick={ () => selectTab(i) }
        >
          { tab.name }
        </h4>
      )) }
    </div>
  );
};
