import {Canvas} from './Canvas'

export class CanvasElement {
    constructor(
        private name: string,
        private x: number,
        private y: number,
        private width: number,
        private height: number,
        private zIndex: number = 1,
        private color: string | number = 'red'
    ){
        
    }
    
    // стиль курсора при наведении на элемент
    private mouseStyle: string = 'default'
    public isMouseStyle: boolean = false
    
    public setMouseStyle: 
    (style: string)=> CanvasElement =
    function(style){
        if(style === 'default'){
            this.mouseStyle = style
            this.isMouseStyle = false
            return this
        }
        this.mouseStyle = style
        this.isMouseStyle = true
        
        return this
    }
    public getMouseStyle:
    ()=> string = 
    function(){
        return this.mouseStyle
    }
    
    private parent: Canvas
    private onclick: ()=> void
    public clickable: boolean = false
    public click:
    ()=> void =
    function(){
        this.onclick();
    }
    
    public setOnclick:
    (callback: ()=> void)=> CanvasElement =
    function(fn){
        if(fn === null){
            this.clickable = false
            return this
        }
        this.onclick = fn
        this.clickable = true
        
        return this
    }
    public getOnclick:
    ()=> ()=> void = 
    function(){
        return this.onclick
    }
    
    public setX:
    (x: number)=> CanvasElement =
    function(x){
        this.x = x
        this.parent.draw()
        
        return this
    }
    public getX: 
    ()=> number = 
    function(){
        return this.x
    }
    
    public setY:
    (y: number)=> CanvasElement =
    function(y){
        this.y = y;
        this.parent.draw()
        
        return this
    }
    public getY:
    ()=> number =
    function(){
        return this.y
    }
    
    public setWidth:
    (width: number)=> CanvasElement =
    function(width){
        this.width = width
        this.parent.draw()
        
        return this
    }
    public getWidth:
    ()=> number = 
    function(){
        return this.width
    }
    
    public setHeight:
    (height: number)=> CanvasElement =
    function(height){
        this.height = height
        this.parent.draw()
        
        return this
    }
    public getHeight:
    ()=> number =
    function(){
        return this.height
    }
    
    public setColor:
    (color: number | string)=> CanvasElement = 
    function(color){
        this.color = color
        this.parent.draw()
        
        return this
    }
    public getColor:
    ()=> string | number = 
    function(){
        return this.color
    }
}