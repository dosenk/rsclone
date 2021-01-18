import Observer from '../../Observer/index.Observer';

export default class Panel {
  private panel: HTMLElement = document.createElement('div');

  private panelColors: HTMLElement = document.createElement('div');

  private panelTools: HTMLElement = document.createElement('div');

  private panelToolsPencil: HTMLElement = document.createElement('div');

  private panelToolsTool: HTMLElement = document.createElement('div');

  private button: any;

  private board: any;

  observer: Observer;

  parentElement: HTMLElement;

  private arrayElements: Array<any> = [];

  private color: any;

  private line: any;

  constructor(parentElement: HTMLElement, board: any, observer: Observer) {
    this.board = board;
    this.parentElement = parentElement;
    this.render();
    this.listener();
    this.observer = observer;
  }

  private listener() {
    this.panelColors.addEventListener('click', (event) => {
      const colorButton: HTMLButtonElement = (event.target as unknown) as HTMLButtonElement;
      this.deleteActiveClass(this.panelColors);
      colorButton.classList.add('active');
      this.color = colorButton.value;
      this.board.setColor(this.color);
      this.observer.actions.setDrawColor(this.color);
    });
    this.panelToolsPencil.addEventListener('click', (event) => {
      const pencilSize: HTMLButtonElement = (event.target as unknown) as HTMLButtonElement;
      this.deleteActiveClass(this.panelToolsPencil);
      pencilSize.classList.add('active');
      this.line = pencilSize.value;
      this.board.setLineThickness(+this.line);
      this.observer.actions.setDrawThickness(+this.line);
    });
    this.panelToolsTool.addEventListener('click', (event) => {
      const tool: HTMLButtonElement = (event.target as unknown) as HTMLButtonElement;
      this.deleteActiveClass(this.panelToolsTool);
      tool.closest('.panel__tools_tool-item')?.classList.add('active');
      if (tool.closest('.pencil')) {
        this.board.setLineThickness(+this.line);
        this.board.setColor(this.color);
        this.observer.actions.setDrawColor(this.color);
        this.observer.actions.setDrawThickness(+this.line);
      }
      if (tool.closest('.eraser')) {
        this.board.setLineThickness(8);
        this.board.setColor('white');
        this.observer.actions.setDrawColor('white');
        this.observer.actions.setDrawThickness(8);
      }
      if (tool.closest('.clear')) {
        this.board.clearBoard();
        this.observer.actions.clearBoard();
      }
    });
  }

  private deleteActiveClass(element: HTMLElement) {
    this.arrayElements = [...element.children];
    this.arrayElements.forEach((block) => {
      block.classList.remove('active');
    });
  }

  private render() {
    this.panel.classList.add('panel');
    this.createPanelColors();
    this.createPanelTools();
  }

  private createPanelColors() {
    this.panelColors.classList.add('panel__colors');
    const colorBlack = this.createButton(
      'panel__colors-color',
      'black',
      'black'
    );
    colorBlack.classList.add('active');
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
    one.classList.add('active');
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
    pencil.classList.add('active');
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

  public displayPanel() {
    this.parentElement.append(this.panel);
  }

  public hidePanel() {
    this.panel.remove();
  }
}
