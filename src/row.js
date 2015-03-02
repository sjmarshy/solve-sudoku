"use strict";

function get(board, row) {
    return board.cells[row];
}

function has(row, value) {

    let res = false;

    row.forEach(function(cell) {
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
