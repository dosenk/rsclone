import "./styles/index.scss";
import App from "./Components/App/index.App";
import Board from "./Components/App/index.Board";

document.body.onload = async () => {
  const app = new App();
  app.start();
  const board = new Board();
  board.start();
};
