import ProgressBar from '@ramonak/react-progress-bar';
import { statName } from '../helpers/index.ts';

interface Props {
  stat: string;
  value: number;
  maxValue: number;
}

export const PokemonStat = ({ stat, value, maxValue }: Props) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex justify-between">
        <p className="capitalize">{ statName(stat) }</p>
        <div>
          <p className="font-bold">{ value }</p>
        </div>
      </div>
      
      <ProgressBar
        completed={ value }
        maxCompleted={ maxValue }
        baseBgColor="#DADADA"
        bgColor="#191F38"
        isLabelVisible={ false }
        animateOnRender
      />
    </div>
  );
};
