const restart = document.querySelector('.play');
const wrapper = document.querySelector('.wrapper');
const winColor = document.querySelector('.win-color');
const length = document.querySelector('.length');
const index = document.querySelector('.index');
const easy = document.querySelector('.easyGame');
const hard = document.querySelector('.hardGame');

let colors = [];
let elements = [];
let easyGame;
let hardGame;

class Game  {
    constructor(index) {
        this.index = index;
        this.mainColor = this.generateColor();
        
    }
    clearColor() {//////////////////////////////////////////////////////////
        colors.splice(0, this.index);
    }
    clearElements() {///////////////////////////////////////////////////////
        elements.splice(0, this.index);
        wrapper.innerHTML = '';
    }
    generateColor () {////////////////////////////////////////////////////// 
        this.clearElements();
        for(let i = 0; i < this.index; i++) {
            const elem = document.createElement('div'); 
            elem.classList.add('box');
            wrapper.appendChild(elem);
            elements.push(elem);
        }
        elements.forEach(item => {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let colorRandom = `rgb(${r}, ${g}, ${b})`;
            colors.push(item.style.backgroundColor = colorRandom);
            item.style.opacity = 1;
        });
        let id = Math.floor(Math.random() * this.index);
        let color = colors[id];
        winColor.innerHTML = `Найдите цвет ${color}`;
        length.innerHTML = `length = ${colors.length}`;
        index.innerHTML = `index = ${this.index}`;
        this.clearColor();
        return color;
    }
    analysisColor () {//////////////////////////////////////////////////////
        elements.forEach(item => {
            item.addEventListener('click', (e)=> {
                if (this.mainColor == e.target.style.backgroundColor) {
                    this.allColor();
                    winColor.innerHTML = 'Ты победил!';
                } else {
                    console.log('no');
                    e.target.style.zIndex = -100;
                    e.target.style.opacity = 0;
                }
            });
        });
    }
    allColor() {/////////////////////////////////////////////////////////////
        elements.forEach(item => {
            item.style.backgroundColor = this.mainColor;
            item.style.opacity = 1; 
            item.style.zIndex = 0;
        });
    }
    regenerateColor() {//////////////////////////////////////////////////////
        this.analysisColor();
    }
}

easy.addEventListener('click', ()=> {
    hard.classList.remove('game_active');
    easy.classList.add('game_active');
    colors = [];
    elements = [];
    easyGame = new Game(3).regenerateColor();
    restart.style.display = 'block';
    restart.addEventListener('click', ()=> {
        colors = [];
        elements = [];
        easyGame = new Game(3).regenerateColor();
    });
});

hard.addEventListener('click', ()=> {
    easy.classList.remove('game_active');
    hard.classList.add('game_active');
    colors = [];
    elements = [];
    hardGame = new Game(6).regenerateColor();
    restart.style.display = 'block';
    restart.addEventListener('click', ()=> {
        colors = [];
        elements = [];
        hardGame = new Game(6).regenerateColor();
    });
});







        