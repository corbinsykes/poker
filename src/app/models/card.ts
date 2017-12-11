import { Suit } from './suit';
import { Value } from './value';


export class Card {
    id: number;
    suit: Suit;
    value: Value;
    dealt: boolean = false;
    shown: boolean = false;
    inStraight: boolean = false;

    constructor(id: number, suit: Suit, value: Value) {
        this.id = id;
        this.suit = suit;
        this.value = value;
    }

    display() {
        this.shown = !this.shown;
    }
}