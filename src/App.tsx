import { Main } from './components/Main.tsx';
import { PokemonProvider } from './context/PokemonProvider.tsx';

export const App = () => {
  return (
    <PokemonProvider>
      <Main />
    </PokemonProvider>
  )
}
