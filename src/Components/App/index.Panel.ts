import Board from './index.Board';

export default class Panel {
  private panel: HTMLElement = document.createElement('div');

  private panelColors: HTMLElement = document.createElement('div');

  private panelTools: HTMLElement = document.createElement('div');

  private panelToolsPencil: HTMLElement = document.createElement('div');

  private panelToolsTool: HTMLElement = document.createElement('div');

  private button: any;

  private board: Board = new Board();

  constructor() {
    this.board.addHost();
    this.render();
    this.listener();
  }

  private listener() {
    this.panelColors.addEventListener('click', (event) => {
      const colorButton: HTMLButtonElement = (event.target as unknown) as HTMLButtonElement;
      if (colorButton.value === 'black') this.board.setColor('black');
      if (colorButton.value === 'red') this.board.setColor('red');
      if (colorButton.value === 'green') this.board.setColor('green');
      if (colorButton.value === 'blue') this.board.setColor('blue');
    });
    this.panelToolsPencil.addEventListener('click', (event) => {
      const pencilSize: HTMLButtonElement = (event.target as unknown) as HTMLButtonElement;
      if (pencilSize.value === '6') this.board.setLineThickness(6);
      if (pencilSize.value === '3') this.board.setLineThickness(3);
      if (pencilSize.value === '1') this.board.setLineThickness(1);
    });
    this.panelToolsTool.addEventListener('click', (event) => {
      const tool: HTMLButtonElement = (event.target as unknown) as HTMLButtonElement;
      if (tool.closest('.pencil')) {
        this.board.setLineThickness(1);
        this.board.setColor('black');
      }
      if (tool.closest('.eraser')) {
        this.board.setLineThickness(8);
        this.board.setColor('white');
      }
      if (tool.closest('.clear')) this.board.clearBoard();
    });
  }

  private render() {
    this.panel.classList.add('panel');
    this.createPanelColors();
    this.createPanelTools();
    document.body.append(this.panel);
  }

  private createPanelColors() {
    this.panelColors.classList.add('panel__colors');
    const colorBlack = this.createButton(
      'panel__colors-color',
      'black',
      'black'
    );
    const colorRed = this.createButton('panel__colors-color', 'red', 'red');
    const colorGreen = this.createButton(
      'panel__colors-color',
      'green',
      'green'
    );
    const colorBlue = this.createButton('panel__colors-color', 'blue', 'blue');
    this.panelColors.append(colorBlack);
    this.panelColors.append(colorRed);
    this.panelColors.append(colorGreen);
    this.panelColors.append(colorBlue);
    this.panel.append(this.panelColors);
  }

  private createPanelToolsPencil() {
    this.panelToolsPencil.classList.add('panel__tools_pencil');

    const six = this.createButton('panel__tools_pencil-size', 'six', '6');
    const three = this.createButton('panel__tools_pencil-size', 'three', '3');
    const one = this.createButton('panel__tools_pencil-size', 'one', '1');
    this.panelToolsPencil.append(six);
    this.panelToolsPencil.append(three);
    this.panelToolsPencil.append(one);
    this.panelTools.append(this.panelToolsPencil);
  }

  private createPanelToolsTool() {
    this.panelToolsTool.classList.add('panel__tools_tool');
    const pencil = this.createButton(
      'panel__tools_tool-item',
      'pencil',
      'pencil'
    );
    const pencilImg = document.createElement('img');
    pencilImg.src = '/src/assets/images/pencil.png';
    pencilImg.alt = 'pencil';
    pencil.append(pencilImg);
    const eraser = this.createButton(
      'panel__tools_tool-item',
      'eraser',
      'eraser'
    );
    const eraserImg = document.createElement('img');
    eraserImg.src = '/src/assets/images/eraser.png';
    eraserImg.alt = 'pencil';
    eraser.append(eraserImg);
    const clear = this.createButton('panel__tools_tool-item', 'clear', 'clear');
    const clearImg = document.createElement('img');
    clearImg.src = '/src/assets/images/clear.png';
    clearImg.alt = 'clear';
    clear.append(clearImg);
    this.panelToolsTool.append(pencil);
    this.panelToolsTool.append(eraser);
    this.panelToolsTool.append(clear);
    this.panelTools.append(this.panelToolsTool);
  }

  private createPanelTools() {
    this.panelTools.classList.add('panel__tools');
    this.createPanelToolsPencil();
    this.createPanelToolsTool();
    this.panel.append(this.panelTools);
  }

  private createButton(firstClass: string, secondClass: string, value: string) {
    this.button = document.createElement('button');
    this.button.classList.add(firstClass);
    this.button.classList.add(secondClass);
    this.button.value = value;
    return this.button;
  }
}
