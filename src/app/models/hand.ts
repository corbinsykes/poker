import { Card } from './card';
import { Deck } from './deck';

export class Hand {
    player: number;
    cards: Array<Card>;
    straight: Array<Card> = [];

    constructor(player: number) {
        this.player = player;
        this.cards = [];
    }

    display() {
        for (const card of this.cards) {
            card.display();
        }
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    sortBySuit() {
        this.cards.sort(
            (a, b) => {
                return a.id - b.id;
            }
        );
    }

    sortByValue() {
        this.cards.sort(
            (a, b) => {
                return a.value.value - b.value.value || a.id - b.id;
            }
        )
    }
}