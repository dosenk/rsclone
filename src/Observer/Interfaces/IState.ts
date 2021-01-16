import IDraw from './IDraw';
import Game from '../../Components/Game/index.Game';

interface IState {
  game: Game;
  loading: boolean;
  langData: Object;
  role: string;
  name: string;
  users: { painter: Object; guesser: Array<Object> };
  draw: IDraw | null;
  drawThickness: number;
  drawColor: string;
}

export default IState;
