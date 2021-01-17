import IDraw from './IDraw';
import type Game from '../../Components/Game/index.Game';

interface IState {
  game: Game;
  loading: boolean;
  langData: { [key: string]: string };
  role: string;
  name: string;
  users: { painter: Object; guesser: Array<Object> };
  draw: IDraw | null;
  drawThickness: number;
  drawColor: string;
  wordsToSelect: Array<string>;
  wordToGuess: string;
}

export default IState;
