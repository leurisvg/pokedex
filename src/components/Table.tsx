import { useEffect, useState } from 'react';
import { capitalizeJoinedStr, capitalizeStr, typesColors } from '../helpers/index.ts';
import { IMoveData, IVersionGroupDetail } from '../interfaces/pokemonDetails.ts';

interface Props {
  moves: IMoveData[];
}

export const Table = ({ moves }: Props) => {
  const [sortedMoves, setSortedMoves] = useState<IMoveData[]>([]);
  const [isEggMove, setIsEggMove] = useState<boolean>(false);
  
  useEffect(() => {
    setSortedMoves([
      ...moves.filter(m => m.learnMethod.move_learn_method.name === 'level-up').sort(sortByLevel),
      ...moves.filter(m => m.learnMethod.move_learn_method.name === 'machine'),
      ...moves.filter(m => m.learnMethod.move_learn_method.name === 'tutor'),
      ...moves.filter(m => m.learnMethod.move_learn_method.name === 'egg'),
    ]);
    
    setIsEggMove(moves[0]?.learnMethod?.move_learn_method.name === 'egg');
  }, [moves]);
  
  const sortByLevel = (a: IMoveData, b: IMoveData) => {
    if (a.learnMethod.level_learned_at > b.learnMethod.level_learned_at) {
      return 1;
    } else if (a.learnMethod.level_learned_at < b.learnMethod.level_learned_at) {
      return -1;
    } else {
      return 0;
    }
  };
  
  const getLearnMethodLabel = (method: IVersionGroupDetail) => {
    if (method.move_learn_method.name === 'level-up') {
      return `Level ${ method.level_learned_at === 0 ? 1 : method.level_learned_at }`;
    } else if (method.move_learn_method.name === 'machine') {
      return 'TM/HM';
    } else {
      return capitalizeJoinedStr(method.move_learn_method.name);
    }
  };
  
  return (
    <table className="moves-table">
      <tbody>
      <tr>
        { !isEggMove && <th>Method</th> }
        <th>Move</th>
        <th>Type</th>
        <th>Category</th>
        <th>Power</th>
        <th>Accuracy</th>
        <th>PP</th>
        <th>Priority</th>
        <th>{ isEggMove ? 'Games Generation' : 'Generation' }</th>
      </tr>
      </tbody>
      <tbody className="overflow-y-auto">
      
      { sortedMoves.map(({ details, learnMethod, generation }) => (
        <tr key={ details.id }>
          { !isEggMove && <td>{ getLearnMethodLabel(learnMethod) }</td> }
          <td className="!border-r-0">{ capitalizeJoinedStr(details.name) }</td>
          <td className={ `text-sm font-medium text-white border-none ${ typesColors.bg[details.type.name] }` }>{ capitalizeStr(details.type.name) }</td>
          <td className="!border-l-0">
            
            <img
              className="mx-auto"
              src={ `../../move-category/${ details.damage_class.name }.gif` }
              alt={ details.damage_class.name }
            />
          
          </td>
          <td>{ details.power ?? '-' }</td>
          <td>{ details.accuracy ? `${ details.accuracy }%` : '-' }</td>
          <td>{ details.pp }</td>
          <td>{ details.priority }</td>
          <td>
            
            { isEggMove ?
              
              <div className="flex justify-center flex-wrap gap-1">
                { generation.map(g => (
                  <img
                    key={ g }
                    src={ `../../generations/${ g }.png` }
                    alt={ g }
                  />
                )) }
              </div>
              :
              <img
                className="mx-auto"
                src={ `../../generations/${ details.generation.name }.png` }
                alt={ details.generation.name }
              /> }
          
          </td>
        </tr>
      )) }
      
      </tbody>
    </table>
  );
};
