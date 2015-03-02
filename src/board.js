"use strict";

var c = require("./cell");
var col = require("./column");
var row = require("./row");
var ninth = require("./ninth");
var deepcopy = require("deepcopy");

function create(raw) {
    return {
        cells: raw.map(function(rw) {
            return rw.map(function(value) {
                return c.makeCell(value);
            });
        })
    };
}

function addNotes(b) {

    let board = deepcopy(b);
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    board.cells.forEach(function(rw, y) {
        rw.forEach(function(cell, x) {

            let cl = col.get(board, y);
            let r = row.get(board, x);
            let n = ninth.get(board, x, y);

            let possibilities = [];
            numbers.forEach(function(val) {

                if (!col.has(cl, val) &&
                    !row.has(r, val) &&
                    !ninth.has(n, val)) {

                    possibilities.push(val);

                }
            });
            let newc = c.setPossible(cell, possibilities);
            board.cells[y][x] = newc;

        });
    });

    console.log("finally");
    console.dir(board, {
        depth: null
    });

    return board;
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
    addNotes: addNotes,
    create: create,
    steps: null,
    run: null,
    solve: solve,
    isSolved: null,
    isValid: null
};
