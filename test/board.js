"use strict";

var expect = require("chai").expect;
var b = require("../src/board.js");

var testBoard = [
    [null, 2, null, null, 5, null, null, null, 4],
    [null, 3, null, null, 9, null, null, 1, null],
    [1, null, null, 6, null, null, null, 9, null],
    [null, null, 4, null, null, 2, 8, null, null],
    [null, 7, null, 9, null, 1, null, 3, null],
    [null, null, null, null, null, null, null, null, 9],
    [3, null, 1, null, null, null, 7, null, 5],
    [5, null, null, 4, 7, null, null, null, null],
    [null, null, null, null, null, null, null, null, 3]
];

describe("Sudoku Board", function() {

    let board;

    before(function() {
        board = b.create(testBoard);
    });

    it("should give us a board object", function() {

        return expect(board).to.exist &&
            expect(board).to.have.property("cells");

    });

    it("should give us steps to solve", function() {

        let steps = b.steps(board);

        return expect(Array.isArray(steps)).to.be.true;
    });

    it("should be able to perform given steps to the given board", function() {

        let steps = b.steps(board);
        let solved = b.run(board, steps);

        return expect(b.isSolved(solved)).to.be.true;

    });

    it("should solve any given board", function() {

        let solved = b.solve(board);

        return expect(solved).to.exist;
    });

    it("shouldn't affect the loaded board, but return a new one", function() {

        expect(b.isSolved(board)).to.be.false;

        b.solve(board);

        return expect(b.isSolved(board)).to.be.false;

    });

    it("should provide a validator", function() {

        let solved = b.solve(board);

        return expect(b.isValid(solved)).to.be.true;
    });

    it("should provide a checker", function() {

        let solved = b.solve(board);

        return expect(b.isSolved(solved)).to.be.true &&
            expect(b.isSolved(board)).to.be.false;

    });

});
