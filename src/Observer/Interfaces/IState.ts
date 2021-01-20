import IDraw from './IDraw';
import type Game from '../../Components/Game/index.Game';
import IGameEndInfo from './IGameEndInfo';

interface IState {
  game: Game;
  loading: boolean;
  langData: { [key: string]: string };
  role: string;
  name: string;
  users: { painter: { name: string }; guessers: Array<Object> };
  draw: IDraw | null;
  drawThickness: number;
  drawColor: string;
  wordsToSelect: Array<string>;
  wordToGuess: string;
  gameStatus: string;
  gameEndInfo: IGameEndInfo | null;
}

export default IState;
