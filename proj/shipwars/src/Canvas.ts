import {CanvasElement} from './CanvasElement'

// отвечает за <canvas /> и работу с ним
export class Canvas {
    constructor(){
        this.onresize(null)
        
        $(window).resize((event)=>{this.onresize(event)})
    }
    
    private canvas: any = $('#canvas')
    private context: any = this.canvas.get(0).getContext('2d')
    private elements: Array<CanvasElement> = []
    
    public getCanvas:
    ()=> any =
    function(){
        return this.canvas.get(0)
    }
    
    // реализация метода draw() из CanvasElementParentInterface
    public draw:
    ()=> void =
    function(){
        for(let element of this.elements){
            this.context.fillStyle = element.getColor()
            this.context.fillRect(element.getX(), element.getY(), element.getWidth(), element.getHeight())
        }
    }
    
    // создает новый CanvasElement
    public createElement: (
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    zIndex?: number,
    color?: string | number)=> CanvasElement =
    function(name, x, y, width, height, zIndex, color){
        let element = new CanvasElement(name, x, y, width, height, zIndex, color)
        
        this.elements.push(element)
        this.elements.sort((a, b)=>{
           return a.zIndex - b.zIndex
        });
        
        this.draw()
        
        return element
    }
    
    // изменяет размер <canvas /> при изменении размеров окна
    private onresize:
    (event: Event)=> void =
    function(event){
        this.canvas.get(0).width = window.innerWidth
        this.canvas.get(0).height = window.innerHeight
        this.draw()
    }
}