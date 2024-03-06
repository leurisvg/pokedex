import { typesColors } from '../helpers/index.ts';

interface Props {
  type: string;
}

export const TypeBadge = ({ type }: Props) => {
  return (
    <div className={ `relative h-9 w-[95px] rounded-full shadow-md ${ typesColors.shadow[type] } ${ typesColors.bg[type] }` }>
      <p className="absolute left-0 right-0 top-0 bottom-0 m-auto h-fit w-fit text-white font-bold text-xs capitalize">{ type }</p>
    </div>
  );
};
