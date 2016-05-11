import * as Var from './Var.ts';

export abstract class Ship {
    public owner: Var.Owner;
    public x: number;
    public y: number;
    public shape: Var.ShipShape;
    public rotation: Var.ShipRotation;
}