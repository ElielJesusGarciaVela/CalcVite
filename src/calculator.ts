export class Calculator {
  private currentInput: string = '0';
  private lastInput: string = '0';
  private operation: string = '';
  private shouldResetInput: boolean = false;

  private container: HTMLElement;

  constructor(mountPoint: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'calculadora';
    mountPoint.appendChild(this.container);

    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="display">
        <input type="text" class="display-input" value="0" disabled />
      </div>
      <div class="teclado">
        <button class="delete span-two">DEL</button>
        <button class="reset">C</button>
        <button class="operation" data-action="sign">+/-</button>
        <button class="operation" data-action="square">x²</button>
        <button class="operation" data-action="sqrt">√x</button>
        <button class="operation" data-action="inverse">1/x</button>
        <button class="operation" data-action="+">+</button>
        <button class="number" data-value="7">7</button>
        <button class="number" data-value="8">8</button>
        <button class="number" data-value="9">9</button>
        <button class="operation" data-action="-">-</button>
        <button class="number" data-value="4">4</button>
        <button class="number" data-value="5">5</button>
        <button class="number" data-value="6">6</button>
        <button class="operation" data-action="*">×</button>
        <button class="number" data-value="1">1</button>
        <button class="number" data-value="2">2</button>
        <button class="number" data-value="3">3</button>
        <button class="operation" data-action="/">÷</button>
        <button class="equals span-two">=</button>
        <button class="number" data-value="0">0</button>
        <button class="decimal">.</button>
      </div>
    `;
  }

  private getDisplay(): HTMLInputElement {
    return this.container.querySelector('.display-input') as HTMLInputElement;
  }

  private updateDisplay(): void {
    this.getDisplay().value = this.currentInput;
  }

  private calculate(): number {
    const num1 = parseFloat(this.lastInput);
    const num2 = parseFloat(this.currentInput);

    switch (this.operation) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num2 !== 0 ? num1 / num2 : 0;
      default:  return num2;
    }
  }

  private executeUnaryOperation(action: string): void {
    const num = parseFloat(this.currentInput);
    let result: number | string;

    switch (action) {
      case 'sign':
        if (this.currentInput !== '0') {
          this.currentInput = this.currentInput.startsWith('-')
            ? this.currentInput.substring(1)
            : '-' + this.currentInput;
          this.updateDisplay();
        }
        return;
      case 'square':
        result = num * num;
        break;
      case 'sqrt':
        result = num >= 0 ? Math.sqrt(num) : 'Error';
        break;
      case 'inverse':
        result = num !== 0 ? 1 / num : 'Error';
        break;
      default:
        return;
    }

    this.currentInput = result.toString();
    this.updateDisplay();
    this.shouldResetInput = true;
  }

  private bindEvents(): void {
    this.container.querySelectorAll<HTMLButtonElement>('.number').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value ?? '0';

        if (this.shouldResetInput) {
          this.currentInput = value;
          this.shouldResetInput = false;
        } else {
          if (this.currentInput === '0' && value === '0') return;
          if (this.currentInput === '0') this.currentInput = '';
          this.currentInput += value;
        }

        this.updateDisplay();
      });
    });

    this.container.querySelector('.reset')?.addEventListener('click', () => {
      this.currentInput = '0';
      this.lastInput = '0';
      this.operation = '';
      this.shouldResetInput = false;
      this.updateDisplay();
    });

    this.container.querySelector('.delete')?.addEventListener('click', () => {
      if (this.currentInput.length === 1) {
        this.currentInput = '0';
      } else {
        this.currentInput = this.currentInput.slice(0, -1);
      }
      this.updateDisplay();
    });

    this.container.querySelector('.decimal')?.addEventListener('click', () => {
      if (this.shouldResetInput) {
        this.currentInput = '0.';
        this.shouldResetInput = false;
      } else if (!this.currentInput.includes('.')) {
        this.currentInput += '.';
      }
      this.updateDisplay();
    });

    this.container.querySelectorAll<HTMLButtonElement>('.operation').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action ?? '';

        // Verificar si es una operación unaria
        if (['sign', 'square', 'sqrt', 'inverse'].includes(action)) {
          this.executeUnaryOperation(action);
          return;
        }

        // Operaciones binarias (+, -, *, /)
        // Si ya hay una operación pendiente y se ha introducido el segundo operando,
        // calcular el resultado antes de establecer la nueva operación
        if (this.operation && !this.shouldResetInput) {
          const result = this.calculate();
          this.currentInput = result.toString();
          this.updateDisplay();
        }

        this.lastInput = this.currentInput;
        this.operation = action;
        this.shouldResetInput = true;
      });
    });

    this.container.querySelector('.equals')?.addEventListener('click', () => {
      if (this.operation) {
        const result = this.calculate();
        this.currentInput = result.toString();
        this.updateDisplay();
        this.lastInput = '0';
        this.operation = '';
        this.shouldResetInput = true;
      }
    });
  }
}
