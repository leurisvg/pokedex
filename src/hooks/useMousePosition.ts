import React, { useEffect } from 'react';
import { usePokemon } from './usePokemon.ts';

export const useMousePosition = (ref: React.RefObject<HTMLElement>, id: number | null) => {
  const { selectedPokemonId } = usePokemon();
  
  useEffect(() => {
    const currentRef = ref.current;
    
    const mouseLeave = () => {
      if (!currentRef || id === selectedPokemonId) return;
      
      currentRef.classList.add('card-background');
      currentRef.classList.remove('gradient');
    };
    
    const updateMousePosition = (ev: MouseEvent) => {
      const { offsetX, offsetY } = ev;
      if (!currentRef || id === selectedPokemonId) return;
      
      currentRef.classList.add('gradient');
      currentRef.classList.remove('card-background');
      
      currentRef.style.setProperty('--x', `${ offsetX }px`);
      currentRef.style.setProperty('--y', `${ offsetY }px`);
    };
    
    const addListeners = (ref: HTMLElement | null) => {
      ref?.addEventListener('mouseleave', mouseLeave);
      ref?.addEventListener('mousemove', updateMousePosition);
    };
    
    addListeners(currentRef);
    
    return () => {
      currentRef?.removeEventListener('mouseleave', mouseLeave);
      currentRef?.removeEventListener('mousemove', updateMousePosition);
    };
  }, [selectedPokemonId, id]);
  
};
