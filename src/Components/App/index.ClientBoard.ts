export default class ClientBoard {
  private board: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private draw: boolean = false;

  constructor() {
    this.render();
  }

  private render() {
    const body: Element = document.body;
    this.board = document.createElement("canvas");
    this.board.classList.add("board1");
    this.board.style.cursor = "url(/src/assets/images/cursor1.png), auto";
    body.append(this.board);
    this.context = this.board.getContext("2d");
    this.context.lineWidth = 1;
  }

  public mosedown(x, y) {
    this.draw = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }

  public mosemove(x, y) {
    if (this.draw === true) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  public moseup(x, y) {
    this.context.lineTo(x, y);
    this.context.stroke();
    this.context.closePath();
    this.draw = false;
  }

  public clearBoard() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
  }

  public setColor(color) {
    this.context.strokeStyle = `${color}`;
  }

  public setLineThickness(number) {
    this.context.lineWidth = number;
  }
}
