import { interval, type Subscription } from "rxjs";

export class Cronometer {
  private subscription: Subscription | null = null;
  private estaPausado: boolean = false;
  private tiempo: number = 60;

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
    this.resumeButton = resumeButton;
    this.resetButton = resetButton;

    this.playButton.addEventListener("click", () => this.toggle());
    this.pauseButton.addEventListener("click", () => this.pausarCronometro());
    this.resumeButton.addEventListener("click", () => this.resumirCronometro());
    this.resetButton.addEventListener("click", () => this.restartCronometro());
  }

  private updateCronometro(): void {
    if (this.estaPausado) return;

    const before = new Date();
    const segundosBefore = before.toLocaleTimeString("es-ES", {
      hour: undefined,
      minute: undefined,
      second: "2-digit",
      hour12: false,
    });
    const now = new Date();
    const segundosNow = now.toLocaleTimeString("es-ES", {
      hour: undefined,
      minute: undefined,
      second: "2-digit",
      hour12: false,
    });
    this.display.textContent = `${this.tiempo}s`;
  }

  private pausarCronometro(): void {
    this.estaPausado = true;
  }

  private resumirCronometro(): void {
    this.estaPausado = false;
  }

  private restartCronometro(): void {
    this.subscription!.unsubscribe();
    this.subscription = null;
  }

  private toggle(): void {
    if (this.subscription === null) {
      this.tiempo = 0;
      this.estaPausado = false;
      this.updateCronometro();
      this.subscription = interval(1000).subscribe(() =>
        this.updateCronometro(),
      );
    } else {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
