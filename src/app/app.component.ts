import { Component } from '@angular/core';

import { Suits } from './constants/suits.constant';
import { Values } from './constants/values.constant';

import { Card } from './models/card';
import { Deck } from './models/deck';
import { Hand } from './models/hand';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    deck: Deck;
    players: Array<Hand> = [];
    nextCardIdx: number = 0;
    handsPerGame: number = 2;
    cardsPerHand: number = 5;
    straightLength: number = 3;

    ngOnInit() {
        this.newGame();
    }

    newGame() {
        this.players = [];
        this.deck = new Deck;
        this.nextCardIdx = 0;

        this.build();
        this.play();
    }

    build() {
        Suits.forEach(
            (suit, i) => {
                Values.forEach(
                    (value, j) => {
                        const id = (j + 1 + (Values.length * (i)));
                        const card = new Card(id, suit, value);

                        this.deck.notDealt.push(card);
                    }
                )
            }
        )

        this.deck.shuffle();
    }

    play() {
        for (let i = 0; i < this.handsPerGame; i++) {
            const player = new Hand(i + 1);
            this.players.push(player);
        }

        for (let i = 0; i < this.cardsPerHand * this.players.length; i++) {
            this.deck.dealOne();
            this.players[i % this.players.length].addCard(this.deck.dealt[i]);
        }
    }

    dealNextCard() {
        if (this.nextCardIdx === this.players.length) {
            this.nextCardIdx = 0;
        }

        this.addCardToHand(this.players[this.nextCardIdx]);
        this.nextCardIdx++;
    }

    addCardToHand(hand: Hand) {
        this.deck.dealOne();
        hand.addCard(this.deck.dealt[this.deck.dealt.length - 1]);
    }

    hasStraight(hand, length: number, sameSuit: boolean) {
        let straight = [];

        if (sameSuit) {
            hand.sortBySuit();
        } else {
            hand.sortByValue();
        }

        hand.cards.reduceRight(
            (a, b) => {
                if (straight.length < length) {
                    if (a.value.value - b.value.value === 1) {
                        if (straight.length === length - 1) {
                            straight.push(a, b);
                        } else {
                            straight.push(a);
                        }
                    } else if (a.value.value - b.value.value === 0) {
                    } else {
                        straight = [];
                    }
                }
                return hand[a] > hand[b] ? a : b
            }
        );

        if(straight.length >= length) {
            for (let i = 0; i < length; i++) {
                straight[i].inStraight = true;
            }
        }
    }
}