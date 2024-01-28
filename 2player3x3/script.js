var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell');
var currentPlayer = document.getElementById('curPlyr');

var player = "x";
var stat = {
    'x': 0,
    'o': 0,
    'd': 0
}
var winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

closeErrorPopup();
closePopup();

for(var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (var i = 0; i< cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}

function cellClick() {
    var data = [];

    var isActive = this.classList.contains('active');

    if (!this.innerHTML) {
        if (player === 'x') {
            this.classList.remove('zero');
            this.classList.add('cross');
        } else if (player === 'o') {
            this.classList.remove('cross');
            this.classList.add('zero');
        }
        this.innerHTML = player;

        if (!isActive) {
            this.classList.add('active');
        }
    } else {
        var errorPopup = document.getElementById('error-popup');
        var errorMessage = errorPopup.querySelector('.message');
        errorMessage.innerHTML = 'Ячейка занята';
        errorPopup.style.display = 'block';
        return;
    }

    for(var i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWin(data)) {
        stat[player] += 1;
        restart("Выйграл: " + player);
    }else {
        var draw = true;
        for(var i in cell) {
            if(cell[i].innerHTML == '') draw = false;
        }
        if(draw) {
            stat.d += 1;
            restart("Ничья");
        }
    }

    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
    currentPlayer.className = "player-" + player;
}

function checkWin(data) {
    for(var i in winIndex) {
        var win = true;
        for(var j in winIndex[i]) {
            var id = winIndex[i][j];
            var ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) return true;
    }
    return false;
}

function restart(text) {
    var popup = document.getElementById('popup');
    var message = popup.querySelector('.message');
    message.innerHTML = text;
    popup.style.display = 'block';
}

function resetCells() {
    for(var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
        cell[i].classList.remove('active');
        cell[i].classList.remove('cross');
        cell[i].classList.remove('zero');
    }
}

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
    resetCells();
    updateStat();
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
}

function closeErrorPopup() {
    var errorPopup = document.getElementById('error-popup');
    errorPopup.style.display = 'none';
}