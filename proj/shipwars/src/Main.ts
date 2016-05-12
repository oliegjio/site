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
           200,
           200,
           30
       ).setMouseStyle('pointer').setOnclick(()=>{console.log('lol')});
       this.canvas.createElement(
           'test',
           500,
           100,
           300,
           290,
           30,
           'green'
       ).setMouseStyle('move').setOnclick(()=>{console.log('fuck')});
        
        // обработка правого клика
        $(window).on('contextmenu', (event)=>{
            event.preventDefault()
        })
        
        // обработка левого клика по элементу
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
        
        // обработка движений мышью по экрану
        $(window).mousemove((event)=>{
            let lock: boolean
            for(var element of this.canvas.getElements()){
                if(lock === true) continue
                if(element.isMouseStyle){
                    if(
                    event.clientX >= element.getX() &&
                    event.clientX <= element.getX() + element.getWidth() &&
                    event.clientY >= element.getY() &&
                    event.clientY <= element.getY() + element.getHeight()){
                        lock = true
                        $('body, html').css('cursor', element.getMouseStyle())
                    } else {
                        lock = false
                        $('body, html').css('cursor', 'default')
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