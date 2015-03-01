"use strict";

var Cell = require("./cell");

function noop() {}

function Board(raw) {

    this.raw = raw;
    this.cells = raw.map(function(row) {
        return row.map(function(cell) {
            return new Cell(cell);
        });
    });
}

function create(raw) {
    return new Board(raw);
}

function solve(board) {

    let solved;

    for (;;) {
        let uniqBoard = setUniqueAsActual(
            addNotes(board)
        );

        if (isSolved(uniqBoard)) {
            solved = uniqBoard;
            break;
        } else {
            board = uniqBoard;
        }
    }

    return solved;
}

module.exports = {
    create: create,
    steps: noop,
    run: noop,
    solve: noop,
    isSolved: noop,
    isValid: noop
};
