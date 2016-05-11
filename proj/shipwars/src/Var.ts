export namespace forUpdate {
    export let canvasWidth = window.innerHeight;
    export let canvasHeight = window.innerHeight;
}

export let canvasBorderWidth: number = 5;
export let canvasBorderColor: string | number = 'black';
export let canvasBorderStyle: string = 'solid';

export enum Owner {Player1 = 1, Player2};
export enum ShipShape {Single = 1, Double, Triple, Corner, Angular};
export enum ShipRotation {OneQuarter = 1, TwoQuarters, ThreeQuarters, FourQuarters};