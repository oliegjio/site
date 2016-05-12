import * as Var from './Var'

enum ShipShape {Single = 1, Double, Triple, Corner, Angular}
enum ShipRotation {OneQuarter = 1, TwoQuarters, ThreeQuarters, FourQuarters}

export abstract class Ship {
    public owner: Var.Owner
    public x: number
    public y: number
    public shape: ShipShape
    public rotation: ShipRotation
}