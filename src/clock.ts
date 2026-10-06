import { interval, type Subscription } from 'rxjs';

export class Clock {

    private subscription: Subscription | null = null;
    private display: HTMLParagraphElement;
    private button: HTMLButtonElement;

    constructor(display: HTMLParagraphElement, button: HTMLButtonElement) {
        this.display = display;
        this.button = button;

        this.button.addEventListener('click', () => this.toggle());
    }

    private updateClock(): void {
        const now = new Date();

        const time = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const date = now.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        this.display.textContent = `${time} a ${date}`;
    }

    private toggle(): void {
        if (this.subscription === null) {
            this.updateClock();
            this.subscription = interval(1000).subscribe(() => this.updateClock());
            this.button.textContent = '¡Pulsa aquí para ocultar la hora!';
        } else {
            this.subscription.unsubscribe();
            this.subscription = null;
            this.display.textContent = '';
            this.button.textContent = '¡Pulsa aquí para mostrar la hora!';
        }
    }
}