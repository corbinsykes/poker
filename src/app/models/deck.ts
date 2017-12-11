import { Card } from './card';

export class Deck {
    dealt: Array<Card>;
    notDealt: Array<Card>;
    showAll: boolean = false;

    constructor() {
        this.dealt = [];
        this.notDealt = [];
    }

    dealOne() {
        if (this.notDealt !== []) {
            this.dealt.push(this.notDealt[0]);
            this.notDealt.shift();
        } else {
            console.log(this.notDealt);
            return;
        }
    }

    display() {
        this.notDealt.sort(
            (a, b) => {
                return a.id - b.id;
            }
        );

        this.dealt.sort(
            (a, b) => {
                return a.id - b.id;
            }
        );

        this.showAll = !this.showAll;

        for (const card of this.notDealt) {
            card.shown = this.showAll;
        }

        for (const card of this.dealt) {
            card.shown = this.showAll;
        }
    }

    shuffle() {
        let i = 0;
        let j = 0;
        let temp = null;

        for (i = this.notDealt.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = this.notDealt[i]
            this.notDealt[i] = this.notDealt[j]
            this.notDealt[j] = temp
        }

        for (i = this.dealt.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = this.dealt[i]
            this.dealt[i] = this.dealt[j]
            this.dealt[j] = temp
        }
    }
}