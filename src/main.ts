import './style.css';
import { Calculator } from './calculator';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  app.innerHTML = `
    <h1>Calculadoras</h1>
    <div id="calculadoras-grid"></div>
  `;

  const grid = document.getElementById('calculadoras-grid')!;

  for (let i = 0; i < 7; i++) {
    new Calculator(grid);
  }
});
