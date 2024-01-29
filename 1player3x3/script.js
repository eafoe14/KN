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

for (var i = 0; i < cell.length; i++) {
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

        if (!checkGameEnd()) {
            player = player === 'x' ? 'o' : 'x';
            currentPlayer.innerHTML = 'Сейчас ходит: ' + (player === 'x' ? 'X' : 'O');
            currentPlayer.className = 'player-' + player;

            if (player === 'o') {
                makeComputerMove();
            }
        }
    } else {
        var errorPopup = document.getElementById('error-popup');
        var errorMessage = errorPopup.querySelector('.message');
        errorMessage.innerHTML = 'Ячейка занята';
        errorPopup.style.display = 'block';
    }
}

function makeComputerMove() {
    var emptyCells = Array.from(cell).filter((c) => !c.innerHTML);
    if (emptyCells.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptyCells.length);
        var computerCell = emptyCells[randomIndex];
        computerCell.click();
    }
}

function checkGameEnd() {
    var data = [];
    for (var i = 0; i < cell.length; i++) {
        data.push(cell[i].innerHTML);
    }

    if (checkWin(data)) {
        stat[player] += 1;
        restart("Выйграл: " + (player === 'x' ? 'X' : 'O'));
        return true;
    }

    var isDraw = true;
    for (var i = 0; i < cell.length; i++) {
        if (cell[i].innerHTML === '') {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        stat.d += 1;
        restart("Ничья");
        return true;
    }

    return false;
}

function checkWin(data) {
    for (var i = 0; i < winIndex.length; i++) {
        var win = true;
        for (var j = 0; j < winIndex[i].length; j++) {
            var id = winIndex[i][j];
            if (data[id - 1] !== player) {
                win = false;
                break;
            }
        }

        if (win) {
            return true;
        }
    }

    return false;
}

function restart(text) {
    var popup = document.getElementById('popup');
    var message = popup.querySelector('.message');
    message.innerHTML = text;
    popup.style.display = 'block';
    updateStat();

    player = 'x';
    currentPlayer.innerHTML = 'Сейчас ходит: X';
    currentPlayer.className = 'player-x';
}

function resetCells() {
    for (var i = 0; i < cell.length; i++) {
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