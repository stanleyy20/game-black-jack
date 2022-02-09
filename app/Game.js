import {
    Player
} from "./Player.js";

import {
    Deck
} from "./Deck.js";
import {
    Table
} from "./Table.js";
import {
    Message
} from "./Message.js";

class Game {
    constructor({
        hitButton,
        standButton,
        playerPoints,
        dealerPoints,
        player,
        dealer,
        table,
        messageBox
    }) {
        this.hitButton = hitButton;
        this.standButton = standButton;

        this.playerPoints = playerPoints;
        this.dealerPoints = dealerPoints;

        this.player = player;
        this.dealer = dealer;
        this.messageBox = messageBox;

        this.table = table;
        this.deck = new Deck();
        this.deck.shuffle();
    }

    run() {
        this.hitButton.addEventListener('click', (event) => this.hitCard());
        this.standButton.addEventListener('click', (event) => this.dealerPlays())
        this.dealCard()
    }

    hitCard() {
        const card = this.deck.pickOne();
        this.player.hand.addCard(card);
        this.table.showPlayerCard(card);
        this.playerPoints.innerHTML = this.player.calculatePoints();
    }

    dealCard() {
        for (let n = 0; n < 2; n++) {
            let card1 = this.deck.pickOne();
            this.player.hand.addCard(card1);
            this.table.showPlayerCard(card1);

            let card2 = this.deck.pickOne();
            this.dealer.hand.addCard(card2);
            this.table.showDealersCard(card2)
        }

        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }

    dealerPlays() {
        while (this.dealer.points <= this.player.points && this.dealer.points <= 21 && this.player.points <= 21) {
            const card = this.deck.pickOne();
            this.dealer.hand.addCard(card);
            this.table.showDealersCard(card);
            this.dealerPoints.innerHTML = this.dealer.calculatePoints();
        }

        this.endTheGame();
    }

    endTheGame() {
        this.hitButton.removeEventListener('click', (event) => this.hitCard());
        this.standButton.removeEventListener('click', (event) => this.dealerPlays());

        this.hitButton.style.display = 'none';
        this.standButton.style.display = 'none';

        if (this.player.points < 21 && this.playerPoints == this.dealer.points) {
            this.messageBox.setText('Remis').show();

            return;
        }

        if (this.player.points > 21) {
            this.messageBox.setText('Remis').show();

            return;
        }

        if (this.dealer.points > 21) {
            this.messageBox.setText(`Wygrałeś Ty ${this.player.name}`).show();

            return;
        }

        if (this.player.points < this.dealer.points) {
            this.messageBox.setText('Wygrywa Dealer').show();

            return;
        }
    }
}

const player = new Player('Dawid')
const dealer = new Player('Krupier')
const messageBox = new Message(document.getElementById('message'))

const table = new Table(
    document.getElementById('dealersCards'),
    document.getElementById('playersCards'),
);

const game = new Game({
    hitButton: document.getElementById('hit'),
    standButton: document.getElementById('stand'),
    playerPoints: document.getElementById('playerPoints'),
    dealerPoints: document.getElementById('dealerPoints'),
    player,
    dealer,
    table,
    messageBox,
})

game.run();