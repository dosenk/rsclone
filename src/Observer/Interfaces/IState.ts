import IDraw from './IDraw';
import SocketIOClient from '../../SocketIoClient/index.SocketIoClient';

interface IState {
  socket: SocketIOClient;
  loading: boolean;
  langData: Object;
  role: string;
  name: string;
  users: {
    painter: Object;
    quesser: Array<Object>;
  };
  draw: IDraw | null;
  drawThickness: number;
  drawColor: string;
}

export default IState;
