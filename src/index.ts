import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Components/App/index.App';

document.body.onload = async () => {
  const app = new App();
  app.start();
};
