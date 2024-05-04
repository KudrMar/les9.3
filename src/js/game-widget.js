"use strict";

export default class GameWidget {
    constructor(element, size) {
        this._element = element;
        this.size = size
        for (let i = 0; i < size * size; i++) {
            const item = document.createElement('div');
            item.classList.add('cell-item');
            element.appendChild(item);
        }

        this.onItemClick = this.onItemClick.bind(this);
        this._element.addEventListener('click', this.onItemClick);
        this.gameInit();
    }

    moveGoblin() {

        if (!this.successfulHit) {
            this.lostPoints++;
        }

        this.successfulHit = false;

        this.setHeader('points', this.points + ' : ' + this.lostPoints);

        if (this.lostPoints === 5) {
            this.gameOver();
            return;
        }

        let position = -1;
        do {
            position = Math.floor(Math.random() * this.size * this.size);
        } while (position === this.goblinFace);

        this.cells[this.goblinFace].classList.remove('goblinFace');
        this.cells[position].classList.add('goblinFace');
        this.goblinFace = position;
    }

    onItemClick(el) {

        if (this.state === 'game') {
            if (el.target.classList.contains("goblinFace")) {
                this.points++;
                this.successfulHit = true;
            }
        } else if (this.state === 'gameOver') {
            this.gameInit();
        }
    }

    gameInit() {
        this.points = 0;
        this.lostPoints = 0;
        this.successfulHit = false;

        this.setHeader('gameOver', '');
        this.setHeader('info', '');
        this.setHeader('points', this.points + ' : ' + this.lostPoints);

        const position = Math.floor(Math.random() * this.size * this.size);
        this.cells = document.querySelectorAll('.cell-item');
        this.cells[position].classList.add('goblinFace');
        this.goblinFace = position;

        this.intervalId = setInterval(() => {
            this.moveGoblin()
        }, 1000);
        this.state = "game";
    }

    gameOver() {
        this.setHeader('gameOver', 'GAME OVER');
        this.setHeader('info', 'click any field to start');

        clearInterval(this.intervalId);
        this.cells[this.goblinFace].classList.remove('goblinFace');
        this.goblinFace = -1;
        this.state = "gameOver";
    }

    setHeader(requiredClass, requiredText) {
        const points = document.querySelector('.' + requiredClass);
        points.textContent = requiredText;        
    }
}