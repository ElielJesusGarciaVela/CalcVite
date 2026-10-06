export class Clock{
    
    private container: HTMLElement;
    constructor(mountPoint: HTMLElement){
        this.container = document.createElement('hora');
        this.container.className = 'reloj';
        mountPoint.appendChild(this.container);

        this.render();
    }

    private render(): void{
        this.container.innerHTML=`
        <p id="hora">
        `
    }
}