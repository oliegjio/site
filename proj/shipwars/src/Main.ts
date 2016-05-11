/// <reference path='./../deftyped/jquery/jquery.d.ts' />
import {Board} from './Board';
import {Player} from './Player';
import {Ship} from './Ship';
import {HTMLControl} from './HTMLControl';
import * as Var from './Var';

class Main {
    constructor(){
        requestAnimationFrame(<any>this.update);
        this.onresize();
    }
    private HTMLController: HTMLControl = new HTMLControl();
    private turn: boolean;
    private board: Board = new Board()
    private player1: Player = new Player()
    private player2: Player = new Player()
    private onresize: ()=> void = function(){
        window.onresize = function(event){
            Var.forUpdate.canvasHeight = window.innerHeight;
            Var.forUpdate.canvasWidth = window.innerHeight;
        }
    }
    private update: ()=> void = function(){
        console.clear();
        console.log('lol');
    }
}

let game: Main = new Main();

let canvas: any = $('#canvas')
    .css({
        'border': Var.canvasBorderWidth + 'px ' + Var.canvasBorderStyle + ' ' + Var.canvasBorderColor,
        'height': window.innerHeight - Var.canvasBorderWidth * 3 + 'px',
        'width': Var.forUpdate.canvasWidth
    });
let context: any = canvas.get(0).getContext('2d');

