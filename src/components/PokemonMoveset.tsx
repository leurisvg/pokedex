import { useEffect, useState } from 'react';
import { gameNameToVersionGroup, games } from '../helpers/index.ts';
import { useMoves } from '../hooks/useMoves.ts';
import { IGame, IMoveData } from '../interfaces/pokemonDetails.ts';
import { IMoveDetail } from '../interfaces/PokemonMoves.ts';
import { Loading } from './Loading.tsx';
import { Table } from './Table.tsx';

interface Props {
  moveDetails: IMoveDetail[];
  setMovesDetails: (moves: IMoveDetail[]) => void;
}

export const PokemonMoveset = ({ moveDetails, setMovesDetails }: Props) => {
  const [gamesOfThisPokemon, setGamesOfThisPokemon] = useState<IGame[]>([]);
  const [movesData, setMovesData] = useState<IMoveData[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const { moves, getMoves, loading } = useMoves();
  
  useEffect(() => {
    (async() => {
      const pGames = getGames();
      
      if (moveDetails.length === 0) {
        
        const data = await getMoves();
        
        setMovesDetails(data);
        getMovesByGame(pGames[0].name, pGames, data);
        return;
      }
      
      getMovesByGame(pGames[0].name, pGames);
    })();
  }, []);
  
  const getGames = () => {
    let versionGroups = moves().flatMap(m => {
      return m.version_group_details.map(details => Number(details.version_group.url.split('/')[6]));
    });
    
    versionGroups = [...new Set(versionGroups)];
    
    const pokemonGames = versionGroups
    .flatMap(id => games.filter(game => game.versionGroup === id))
    .sort((g1, g2) => (g1.versionGroup < g2.versionGroup) ? 1 : (g1.versionGroup > g2.versionGroup) ? -1 : 0);
    
    setGamesOfThisPokemon(pokemonGames);
    
    return pokemonGames;
  };
  
  const getMovesByGame = (game: string, pGames: IGame[] | null = null, pDetails: IMoveDetail[] | null = null) => {
    setMovesData([]);
    
    setSelectedGame(game);
    
    moves().forEach(m => {
      const move = m.version_group_details.find(details => details.version_group.name === gameNameToVersionGroup(pGames || gamesOfThisPokemon, game));
      
      if (!move) return;
      
      setMovesData(prev => [
        ...prev,
        {
          learnMethod: move,
          details: (pDetails || moveDetails).find(move => move.name === m.move.name)!,
          generation: [],
        },
      ]);
    });
  };
  
  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex gap-x-1">
          { gamesOfThisPokemon.map(({ name }) => (
            <div
              key={ name }
              className={ `px-1.5 py-1 min-w-fit transition ${ selectedGame === name ? 'bg-secondary-500/50 rounded-md' : '' }` }
            >
              <img
                className="object-contain h-[70px] cursor-pointer hover:scale-110 transition"
                src={ `../../pokedex/games-logos/${ name }.png` }
                alt={ name }
                onClick={ () => getMovesByGame(name) }
              />
            </div>
          )) }
        </div>
      </div>
      
      { loading ?
        <div className="flex w-full justify-center items-center mt-10">
          <Loading/>
        </div> :
        <div className="mt-2 pb-2">
          <Table moves={ movesData.filter(m => m.learnMethod.move_learn_method.name !== 'egg') }/>
        </div>
      }
    </>
  );
};
