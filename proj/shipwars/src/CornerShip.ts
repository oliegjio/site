import {Ship} from './Ship.ts'

export class CornerShip extends Ship {
    public structure: boolean[] = [
        true, true,
        true
    ]
}