import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { statName } from '../helpers/index.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { IStats, IStatsProps } from '../interfaces/PokemonStats.ts';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const RadarChart = ({ stats }: IStatsProps) => {
  const { windowWidth } = usePokemon();
  const { base, min, max } = stats;
  
  const orderStats = (stats: IStats): IStats => {
    const { hp, attack, defense, spAttack, spDefense, speed } = stats;
    return { hp, attack, defense, speed, spDefense, spAttack };
  };
  
  const data: ChartData<'radar'> = {
    labels: windowWidth < 768 ? ['HP', 'ATK', 'DEF', 'SPEC', 'SPEC DEF', 'SPEC ATK'] : Object.keys(orderStats(base)).map(stat => statName(stat)),
    datasets: [
      {
        label: 'Base Stats',
        data: Object.values(orderStats(base)),
        backgroundColor: 'rgba(91, 192, 235, 0.2)',
        borderColor: 'rgba(91, 192, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Min Stats',
        data: Object.values(orderStats(min)),
        backgroundColor: 'rgba(229, 89, 52, 0.2)',
        borderColor: 'rgba(229, 89, 52, 1)',
        borderWidth: 1,
      },
      {
        label: 'Max Stats',
        data: Object.values(orderStats(max)),
        backgroundColor: 'rgba(155, 197, 61, 0.2)',
        borderColor: 'rgba(155, 197, 61, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        pointLabels: {
          font: {
            family: 'Montserrat',
            size: 12,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            family: 'Montserrat',
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Montserrat',
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Montserrat',
        },
      },
    },
  };
  
  return (
    <>
      <Radar
        className="max-h-[400px]"
        data={ data }
        options={ options }
      />
    </>
  );
};
