import * as Var from './Var.ts'

export class HTMLControl {
    constructor(){
        window.onresize = this.onresize(event);
        
        this.canvas
            .css({
                'border': Var.canvasBorderWidth + 'px ' + Var.canvasBorderStyle + ' ' + Var.canvasBorderColor,
                'height': window.innerHeight - Var.canvasBorderWidth * 3 + 'px',
                'width': Var.forUpdate.canvasWidth
            });
    }
    
    public canvas: any = $('#canvas');
    public context: any = this.canvas.get(0).getContext('2d');
    
    public onresize: (event)=> any = function(event){
        console.log('resize');
        
        Var.forUpdate.canvasHeight = window.innerHeight;
        Var.forUpdate.canvasWidth = window.innerHeight;
        
        this.canvas
            .css({
                'height': Var.forUpdate.canvasHeight - Var.canvasBorderWidth * 3 + 'px',
                'width': Var.forUpdate.canvasHeight + 'px'
            });
    }
}