export default class ClientBoard {
  private board: HTMLCanvasElement = document.createElement('canvas');

  private context: CanvasRenderingContext2D = (this.board.getContext(
    '2d'
  ) as unknown) as CanvasRenderingContext2D;

  private draw: boolean = false;

  constructor() {
    this.render();
  }

  private render() {
    const { body } = document;
    this.board.classList.add('board');
    this.board.style.cursor = 'url(/src/assets/images/cursor1.png), auto';
    body.append(this.board);
    this.context.lineWidth = 1;
  }

  public mosedown(x: number, y: number) {
    this.draw = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }

  public mosemove(x: number, y: number) {
    if (this.draw === true) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  public moseup(x: number, y: number) {
    this.context.lineTo(x, y);
    this.context.stroke();
    this.context.closePath();
    this.draw = false;
  }

  public clearBoard() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
  }

  public setColor(color: any) {
    this.context.strokeStyle = `${color}`;
  }

  public setLineThickness(number: number) {
    this.context.lineWidth = number;
  }
}
