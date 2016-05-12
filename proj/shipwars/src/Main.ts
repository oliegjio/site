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
            1,
            1,
            5,
            5,
            100,
            'pink'
        )
        
        let iterator = 0;
        this.canvas.getCanvas().onclick = (event)=>{
            this.canvas.createElement(
                'ball' + iterator,
                event.clientX - 5,
                event.clientY - 5,
                10,
                10,
                1,
                'blue'
            )
            iterator++
        }
        
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