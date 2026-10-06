import './style.css';
import { Calculator } from './calculator';
import { interval } from 'rxjs';

// un cronometro que puedas iniciar, pausar, parar y reiniciar
// y un reloj que puedas mostrar y ocultar que refresca cada segundo la hora


document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  app.innerHTML = `
    <h1>Calculadoras</h1>
    <p id="hora"></p>
    <div id="calculadoras-grid"></div>
  `;

  const hora = document.getElementById('hora');

  const source = interval(1000);
  const subscription = source.pipe().subscribe(() => {
    const now = new Date();
    console.log('Valor:', now);
    hora!.textContent = now.toISOString();
  });


  const grid = document.getElementById('calculadoras-grid')!;

  for (let i = 0; i < 7; i++) {
    new Calculator(grid);
  }
});
