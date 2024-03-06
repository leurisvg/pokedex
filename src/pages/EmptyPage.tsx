import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import pokeball_bw from '../assets/icons/pokeball_bw.svg';

export const EmptyPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/pokemon/1');
  }, []);
  
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <ReactSVG
          src={ pokeball_bw }
          beforeInjection={ svg => {
            svg.classList.add('fill-secondary-400/70');
            svg.classList.add('w-64');
          } }
        />
      </div>
    </>
  );
};
