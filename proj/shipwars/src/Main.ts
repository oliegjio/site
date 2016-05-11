/// <reference path='./../deftyped/jquery/jquery.d.ts' />
import {Board} from './Board';
import {Player} from './Player';
import {Ship} from './Ship';
import {HTMLControl} from './HTMLControl';
import * as Var from './Var';

class Main {
    constructor(){
        requestAnimationFrame(<any>this.update);
    }
    public HTMLController: HTMLControl = new HTMLControl();
    private numberOfTurns: number = 0;
    private turn: boolean;
    private board: Board = new Board()
    private player1: Player = new Player()
    private player2: Player = new Player()
    private update: ()=> void = function(){
        
    }
}

let game: Main = new Main();