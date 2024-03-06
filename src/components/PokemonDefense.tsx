import { useEffect, useState } from 'react';
import { capitalizeStr } from '../helpers/index.ts';
import { usePokemon } from '../hooks/usePokemon.ts';
import { TypeBadge } from './TypeBadge.tsx';

interface Weaknesses {
  '0': string[];
  '1/4': string[];
  '1/2': string[];
  'x2': string[];
  'x4': string[];
}

export const PokemonDefense = () => {
  const { pokemon } = usePokemon();
  const [weaknesses, setWeaknesses] = useState<Weaknesses | null>(null);
  
  useEffect(() => {
    const damage: { doubleDamage: string[], halfDamage: string[], noDamage: string[] } = {
      doubleDamage: [],
      halfDamage: [],
      noDamage: [],
    };
    
    pokemon!.damageRelations.forEach(damageRelation => {
      damage.doubleDamage.push(...damageRelation.doubleDamageFrom);
      damage.halfDamage.push(...damageRelation.halfDamageFrom);
      damage.noDamage.push(...damageRelation.noDamageFrom);
    });
    
    const doubleDamageSet = new Set(damage.doubleDamage);
    const halfDamageSet = new Set(damage.halfDamage);
    const noDamage = new Set(damage.noDamage);
    
    damage.doubleDamage = damage.doubleDamage.filter(item => !halfDamageSet.has(item));
    damage.halfDamage = damage.halfDamage.filter(item => !doubleDamageSet.has(item));
    damage.doubleDamage = damage.doubleDamage.filter(item => !noDamage.has(item));
    damage.halfDamage = damage.halfDamage.filter(item => !noDamage.has(item));
    
    setWeaknesses({
      ...weaknesses,
      '0': damage.noDamage,
      '1/4': getDuplicatedTypes(damage.halfDamage),
      '1/2': damage.halfDamage.filter(type => !getDuplicatedTypes(damage.halfDamage).includes(type)),
      'x2': damage.doubleDamage.filter(type => !getDuplicatedTypes(damage.doubleDamage).includes(type)),
      'x4': getDuplicatedTypes(damage.doubleDamage),
    });
  }, []);
  
  const getDuplicatedTypes = (types: string[]) => {
    return types.filter((type, i) => types.indexOf(type) !== i);
  };
  
  const getKeyByValue = (value: string) => {
    return Object.keys(weaknesses!).find(key => (weaknesses as any)[key].includes(value));
  };
  
  return (
    <>
      { weaknesses &&
        <div className="py-2 lg:py-4">
          <p className="font-bold">Strong Defense</p>
          { `Types 'not very effective' against ${ capitalizeStr(pokemon!.details.name) }` }

          <div className="flex flex-wrap gap-2.5 mt-3.5">
            { [...weaknesses['1/2'], ...weaknesses['1/4'], ...weaknesses['0']].map((value, i) => (
              <div key={ `${ value }_${ i }` }>
                <p className="text-center font-bold pb-1.5">{ getKeyByValue(value) }</p>
                <TypeBadge type={ value }/>
              </div>
            )) }
          </div>

          <p className="font-bold mt-4 lg:mt-8">Weak Defense</p>
          { `Types 'super effective' against ${ capitalizeStr(pokemon!.details.name) }` }

          <div className="flex flex-wrap gap-2.5 mt-3.5">
            { [...weaknesses['x4'], ...weaknesses['x2']].map((value, i) => (
              <div key={ `${ value }_${ i }` }>
                <p className="text-center font-bold pb-1.5">{ getKeyByValue(value) }</p>
                <TypeBadge type={ value }/>
              </div>
            )) }
          </div>
        </div> }
    </>
  );
};
