import IDraw from './IDraw';

interface IState {
  loading: boolean;
  langData: Object;
  role: string;
  name: string;
  users: object;
  draw: IDraw | null;
  drawThickness: number;
  drawColor: string;
}

export default IState;
