import { useState } from 'react';
import pokeball from '../assets/icons/pokeball.svg';
import { artworkSprite, gifSprite } from '../helpers/index.ts';

interface Props {
  id: number;
  name: string;
}

export const PokemonImg = ({ id, name }: Props) => {
  const [gifImgError, setGifImgError] = useState(false);
  const [pngImgError, setPngImgError] = useState(false);
  
  const renderImg = () => {
    if (!gifImgError) {
      return (
        <img
          className="h-20 object-contain pointer-events-none"
          src={ gifSprite(id) }
          alt={ name }
          onError={ (e: any) => {
            e.onerror = null;
            setGifImgError(true);
          } }
        />
      );
    } else if (!pngImgError) {
      return (
        <img
          className="h-20 object-contain pointer-events-none"
          src={ artworkSprite(id) }
          alt={ name }
          onError={ (e: any) => {
            e.onerror = null;
            setPngImgError(true);
          } }
        />
      );
    } else {
      return (
        <img
          className="w-14 object-contain pointer-events-none"
          src={ pokeball }
          alt={ name }
        />
      );
    }
  };
  
  return (
    <>
      { renderImg() }
    </>
  );
};
