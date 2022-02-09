export class Table {
    constructor(dealersCard, playersCard) {
        this.dealersCard = dealersCard;
        this.playersCard = playersCard;
    }

    showPlayerCard(card) {
        this.playersCard.appendChild(card.render());
    }

    showDealersCard(card) {
        this.dealersCard.appendChild(card.render());
    }
}