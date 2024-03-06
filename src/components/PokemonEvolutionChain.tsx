import { usePokemon } from '../hooks/usePokemon.ts';
import { PokemonItemCard } from './PokemonItemCard.tsx';

export const PokemonEvolutionChain = () => {
  const { pokemon } = usePokemon();
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 lg:py-4">
      { pokemon!.evolutionChain.map(chain => (
        <PokemonItemCard
          key={ chain.name }
          evolutionChain={ pokemon!.evolutionChain }
          chain={ chain }
        />
      )) }
    </div>
  );
};
