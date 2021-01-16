export default class Preloader {
  private parentElement: HTMLElement;

  private preloader: HTMLElement = document.createElement('div');

  private preloaderText = document.createElement('h3');

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.render();
  }

  public displayPreloader() {
    this.preloader.style.display = 'flex';
  }

  public hidePreloader() {
    this.preloader.style.display = 'none';
  }

  public setText(str: string) {
    this.preloaderText.textContent = str;
  }

  private render() {
    this.preloader.classList.add('preloader');
    const preloadeContainer = document.createElement('div');
    preloadeContainer.classList.add('preloader-container');
    const containerImg = document.createElement('img');
    containerImg.src = 'src/assets/images/giphy.gif';
    containerImg.alt = 'preloader';
    preloadeContainer.append(containerImg);
    this.preloader.append(preloadeContainer);
    this.setText('Ожидание других игроков...');
    this.preloader.append(this.preloaderText);
    this.parentElement.append(this.preloader);
  }
}
