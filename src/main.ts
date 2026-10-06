import "./style.css";
import { Calculator } from "./calculator";
import { Clock } from "./clock";
import { Cronometer } from "./cronometer";

// un cronometro que puedas iniciar, pausar, parar y reiniciar
// y un reloj que puedas mostrar y ocultar que refresca cada segundo la hora

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;

  app.innerHTML = `
    <h1>Calculadoras</h1>
    <button id="show-hora">¡Pulsa aquí para mostrar la hora!</button>
    <p id="hora"></p>
    <div id="cronometer">
      <button id="play">Play</button>
      <button id="pause">Pause</button>
      <button id="restart">Restart</button>
      <button id="resume">Resume</button>
      <p id="time"></p>
    </div>
    <div id="calculadoras-grid"></div>
    
  `;


  /**
   * Clock Class
   */
  const hora = document.querySelector<HTMLParagraphElement>('#hora')!;
  const showHoraButton = document.querySelector<HTMLButtonElement>('#show-hora')!;

  new Clock(hora, showHoraButton);

  /**
   * Cronometer Class
   */

  const cronometer = document.querySelector<HTMLParagraphElement>('#time')!;
  const playButton = document.querySelector<HTMLButtonElement>('#play')!;
  const pauseButton = document.querySelector<HTMLButtonElement>('#pause')!;
  const restartButton = document.querySelector<HTMLButtonElement>('#restart')!;
  const resumeButton = document.querySelector<HTMLButtonElement>('#resume')!;

  new Cronometer(cronometer, playButton, pauseButton, restartButton, resumeButton);

  /**
   * Calculator Class
   */
  const grid = document.getElementById("calculadoras-grid")!;

  for (let i = 0; i < 7; i++) {
    new Calculator(grid);
  }
});
