"use strict";

function ninthCoord(n) {
    var coord;

    switch (n) {
        case 0:
        case 1:
        case 2:
            coord = [0, 1, 2];
            break;
        case 3:
        case 4:
        case 5:
            coord = [3, 4, 5];
            break;
        default:
            coord = [6, 7, 8];
    }

    return coord;

}

function get(board, row, column) {

    let ninthX = ninthCoord(row),
        ninthY = ninthCoord(column),
        ninth = [];

    ninthY.forEach(function(y) {
        ninthX.forEach(function(x) {
            ninth.push(board.cells[y][x]);
        });
    });

    return ninth;
}

function has(ninth, value) {
    let res = false;

    ninth.forEach(function(cell) {
        if (cell.value === value) {
            res = true;
        }
    });

    return res;
}

module.exports = {
    get: get,
    has: has
};
