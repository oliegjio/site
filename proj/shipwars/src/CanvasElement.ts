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
    private mouseStyle: string

    
    private parent: Canvas
    private onclick: ()=> void
    public clickable: boolean = false
    public click:
    ()=> void =
    function(){
        this.onclick();
    }
    
    public setOnclick:
    (callback: ()=> void)=> void =
    function(fn){
        if(fn === null){
            this.clickable = false
            return
        }
        this.onclick = fn
        this.clickable = true
    }
    public getOnclick:
    ()=> ()=> void = 
    function(){
        return this.onclick
    }
    
    public setX:
    (x: number)=> void =
    function(x){
        this.x = x
        this.parent.draw()
    }
    public getX: 
    ()=> number = 
    function(){
        return this.x
    }
    
    public setY:
    (y: number)=> void =
    function(y){
        this.y = y;
        this.parent.draw()
    }
    public getY:
    ()=> number =
    function(){
        return this.y
    }
    
    public setWidth:
    (width: number)=> void =
    function(width){
        this.width = width
        this.parent.draw()
    }
    public getWidth:
    ()=> number = 
    function(){
        return this.width
    }
    
    public setHeight:
    (height: number)=> void =
    function(height){
        this.height = height
        this.parent.draw()
    }
    public getHeight:
    ()=> number =
    function(){
        return this.height
    }
    
    public setColor:
    (color: number | string)=> void = 
    function(color){
        this.color = color
        this.parent.draw()
    }
    public getColor:
    ()=> string | number = 
    function(){
        return this.color
    }
}