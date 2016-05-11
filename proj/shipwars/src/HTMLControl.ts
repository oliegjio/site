import * as Var from './Var.ts'

export class HTMLControl {
    constructor(){
        window.onresize = this.onresize(event);
    }
    public onresize: (event)=> any = function(){
        Var.forUpdate.canvasHeight = window.innerHeight;
        Var.forUpdate.canvasWidth = window.innerHeight;
    }
}