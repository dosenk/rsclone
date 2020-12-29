import ClientBoard from "./index.ClientBoard";
export default class Board {
  private board: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private mouse = { x: 0, y: 0 };
  private draw: boolean = false;
  private clientBoard: ClientBoard;

  constructor() {
    this.render();
    this.clientBoard = new ClientBoard();
  }

  private render() {
    const body: Element = document.body;
    this.board = document.createElement("canvas");
    this.board.classList.add("board");
    this.board.style.cursor = "url(/src/assets/images/cursor1.png), auto";
    body.append(this.board);
  }

  public start() {
    this.context = this.board.getContext("2d");
    this.listener();
  }

  public clearBoard() {
    this.context.clearRect(0, 0, this.board.width, this.board.height);
  }

  private listener() {
    this.board.addEventListener("mousedown", (event) => {
      this.mouse.x =
        ((event.clientX - this.board.offsetLeft) * this.board.width) /
        this.board.clientWidth;
      this.mouse.y =
        ((event.clientY - this.board.offsetTop) * this.board.height) /
        this.board.clientHeight;
      this.draw = true;
      this.context.beginPath();
      this.context.moveTo(this.mouse.x, this.mouse.y);
      this.clientBoard.mosedown(this.mouse.x, this.mouse.y);
    });

    this.board.addEventListener("mousemove", (event) => {
      if (this.draw) {
        this.mouse.x =
          ((event.clientX - this.board.offsetLeft) * this.board.width) /
          this.board.clientWidth;
        this.mouse.y =
          ((event.clientY - this.board.offsetTop) * this.board.height) /
          this.board.clientHeight;
        this.context.lineTo(this.mouse.x, this.mouse.y);
        this.context.stroke();
        this.clientBoard.mosemove(this.mouse.x, this.mouse.y);
      }
    });

    this.board.addEventListener("mouseout", (event) => {
      if (this.draw) {
        this.draw = false;
      }
    });

    this.board.addEventListener("mouseup", (event) => {
      this.mouse.x =
        ((event.clientX - this.board.offsetLeft) * this.board.width) /
        this.board.clientWidth;
      this.mouse.y =
        ((event.clientY - this.board.offsetTop) * this.board.height) /
        this.board.clientHeight;
      this.context.lineTo(this.mouse.x, this.mouse.y);
      this.context.stroke();
      this.context.closePath();
      this.draw = false;
      this.clientBoard.moseup(this.mouse.x, this.mouse.y);
    });
  }

  public setColor(color) {
    this.context.strokeStyle = `${color}`;
  }

  public setLineThickness(number) {
    this.context.lineWidth = number;
  }
}
