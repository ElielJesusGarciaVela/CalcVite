import { interval, type Subscription } from "rxjs";

export class Cronometer {
  private subscription: Subscription | null = null;
  private estaPausado: boolean = false;
  private tiempo: number = 0;
  private startTime: number = 0;
  private tiempoAcumulado: number = 0;

  private display: HTMLParagraphElement;
  private playButton: HTMLButtonElement;
  private pauseButton: HTMLButtonElement;
  private resumeButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;

  constructor(
    display: HTMLParagraphElement,
    playButton: HTMLButtonElement,
    pauseButton: HTMLButtonElement,
    resumeButton: HTMLButtonElement,
    resetButton: HTMLButtonElement,
  ) {
    this.display = display;
    this.playButton = playButton;
    this.pauseButton = pauseButton;

    if (resumeButton.id === "restart" && resetButton.id === "resume") {
      this.resumeButton = resetButton;
      this.resetButton = resumeButton;
    } else {
      this.resumeButton = resumeButton;
      this.resetButton = resetButton;
    }

    this.display.textContent = `${this.tiempo}s`;

    this.playButton.addEventListener("click", () => this.toggle());
    this.pauseButton.addEventListener("click", () => this.pausarCronometro());
    this.resumeButton.addEventListener("click", () => this.resumirCronometro());
    this.resetButton.addEventListener("click", () => this.restartCronometro());
  }

  private updateCronometro(): void {
    if (this.estaPausado) return;

    const tiempoTranscurridoMs = Date.now() - this.startTime + this.tiempoAcumulado;
    this.tiempo = Math.floor(tiempoTranscurridoMs / 1000);
    this.display.textContent = `${this.tiempo}s`;
  }

  private pausarCronometro(): void {
    if (this.subscription !== null && !this.estaPausado) {
      this.estaPausado = true;
      this.tiempoAcumulado += Date.now() - this.startTime;
    }
  }

  private resumirCronometro(): void {
    if (this.subscription !== null && this.estaPausado) {
      this.estaPausado = false;
      this.startTime = Date.now();
      this.updateCronometro();
    }
  }

  private restartCronometro(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.estaPausado = false;
    this.tiempo = 0;
    this.tiempoAcumulado = 0;
    this.startTime = 0;
    this.display.textContent = `${this.tiempo}s`;
  }

  private toggle(): void {
    if (this.subscription === null) {
      this.tiempo = 0;
      this.tiempoAcumulado = 0;
      this.startTime = Date.now();
      this.estaPausado = false;
      this.display.textContent = `${this.tiempo}s`;
      this.subscription = interval(1000).subscribe(() =>
        this.updateCronometro(),
      );
    } else {
      this.subscription.unsubscribe();
      this.subscription = null;
      this.estaPausado = false;
    }
  }
}
