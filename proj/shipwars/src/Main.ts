/// <reference path='./../deftyped/jquery/jquery.d.ts' />
import {Board} from './Board'
import {Player} from './Player'
import {Ship} from './Ship'
import {Canvas} from './Canvas'
import * as Var from './Var'

class Main {
    constructor(){
        this.canvas.createElement(
            'test',
            100,
            100,
            50,
            50,
            100,
            'pink'
        ).setOnclick(()=>{console.log('!!!')})
        
        $(window).on('contextmenu', (event)=>{
            event.preventDefault()
            
            let iterator = 0
            this.canvas.createElement(
                'rect' + iterator,
                event.clientX - 10,
                event.clientY - 10,
                20,
                20,
                100,
                'green'
            ).setOnclick(()=>{
                console.log('!!!')
            })
            iterator++
        })
        
        $(window).click((event)=>{
            for(let element of this.canvas.getElements()){
                if(element.clickable){
                    if(
                    event.clientX >= element.getX() &&
                    event.clientX <= element.getX() + element.getWidth() &&
                    event.clientY >= element.getY() &&
                    event.clientY <= element.getY() + element.getHeight()){
                        element.click()
                    }
                }
            }   
        })
        
        requestAnimationFrame(<any>this.update.bind(this))
    }
    private canvas: Canvas = new Canvas()
    private turn: Var.Owner
    private board: Board = new Board()
    private player1: Player = new Player()
    private player2: Player = new Player()
    
    private update:
    ()=> void =
    function(){
        this.canvas.draw()
    }
}

let game: Main = new Main()