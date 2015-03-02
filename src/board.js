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

    return board;
}

function setUniqueAsActual(board) {

    // check for numbers that aren't possible in any space.

    board.cells.forEach(function(rw, y) {
        rw.forEach(function(cell, x) {

            // exclude the one we're looking at now
            let r = new Set(row.getPossibles(board, y).filter(function(p) {
                return !(p.x === x && p.y === y);
            }).map(function(p) {
                return p.value;
            }));; // TODO

            let cl = new Set(col.getPossibles(board, x).filter(function(p) {
                return !(p.x === x && p.y === y);
            }).map(function(p) {
                return p.value;
            })); // TODO
            let n = new Set(ninth.getPossibles(board, x, y).filter(function(p) {
                return !(p.x === x && p.y === y);
            }).map(function(p) {
                return p.value;
            })); // TODO

            // get the possible numbers for this cell
            let possible = [];
            for (let val in cell.possible) {
                if (cell.possible[val]) {
                    possible.push(val);
                }
            }

            possible.forEach(function(p) {

                if (!r.has(p) &&
                    !cl.has(p) &&
                    !n.has(p)) {

                    c.setValue(cell, p, true);
                }

            });
        });
    });
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
