"use strict";

function get(board, column) {

    let col = [];

    board.cells.forEach(function(row) {
        col.push(row[column]);
    });

    return col;
}

function has(column, val) {

    let res = false;

    column.forEach(function(cell) {
        if (cell.value === val) {
            res = true;
        }
    });

    return res;
}

module.exports = {
    get: get,
    has: has
};
