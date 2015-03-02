"use strict";
var expect = require("chai").expect;
var c = require("../src/cell.js");

function mapMakeCell(n) {
    return c.makeCell(n);
}

describe("cell", function() {

    it("should accept a digit between 1..9", function() {

        let valid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let invalid = [0, 10, "b"];

        let validCells = valid.map(mapMakeCell);
        let invalidCells = invalid.map(mapMakeCell);

        validCells.forEach(function(cell, i) {
            expect(cell).to.have.property("value", i + 1);
        });

        invalidCells.forEach(function(inv) {
            expect(inv).to.have.property("value", null);
        });

    });

    it("should allow the marking of possible values with an array of digits", function() {

        let validPossible = c.makeCell(null, [3, 7, 9]);
        let invalidPossible = c.makeCell(null, [10, "r"]);

        let vp = validPossible.possible;
        let ip = invalidPossible.possible;

        for (let prop in vp) {
            switch (prop) {
                case "3":
                case "7":
                case "9":
                    expect(vp[prop]).to.equal(true);
                    break;
                default:
                    expect(vp[prop]).to.equal(false);
            }
        }

        for (let prop in ip) {
            expect(ip[prop]).to.equal(false);
        }

    });

    it("should allow the marking of possibilities with single digits", function() {

        let validPossible = c.makeCell(null, 3);
        let vp = validPossible.possible;

        for (let prop in vp) {
            if (prop === "3") {
                expect(vp[prop]).to.equal(true);
            } else {
                expect(vp[prop]).to.equal(false);
            }
        }

    });

    it("should set a new value without mutating the original", function() {

        let origCell = c.makeCell(7);
        let modCell = c.setValue(origCell, 3);

        expect(origCell).to.have.property("value", 7);
        expect(modCell).to.have.property("value", 3);

    });

    it("should be able to mark possible values with an array", function() {

        const mark = [1, 2, 3];

        let origCell = c.makeCell();
        let markedCell = c.setPossible(origCell, mark);
        let unmarkedCell = c.setPossible(markedCell, mark, false);

        mark.forEach(function(m) {
            expect(origCell.possible[m]).to.equal(false);
            expect(markedCell.possible[m]).to.equal(true);
            expect(unmarkedCell.possible[m]).to.equal(false);
        });
    });

    it("should be able to mark possible values with a number", function() {

        let mark = 4;

        let origCell = c.makeCell();
        let markedCell = c.setPossible(origCell, mark);

        expect(origCell.possible[mark]).to.equal(false);
        expect(markedCell.possible[mark]).to.equal(true);

    });

    it("should be able to toggle possible values with an array of numbers", function() {

        let toggle = [3, 4, 5];

        let origCell = c.makeCell(null, [1, 2, 3]);
        let modCell = c.togglePossible(origCell, toggle);

        let mp = modCell.possible;

        for (let prop in mp) {
            switch (prop) {
                case "1":
                case "2":
                case "4":
                case "5":
                    expect(mp[prop]).to.equal(true);
                    break;
                default:
                    expect(mp[prop]).to.equal(false);
            }
        }
    });

    it("should be able to toggle possible values with a number", function() {

        let origCell = c.makeCell(null, 3);
        let modCell = c.togglePossible(origCell, 3);

        expect(origCell.possible).to.have.property(3, true);
        expect(modCell.possible).to.have.property(3, false);
    });

    it("should have a checker for possible values", function() {

        let origCell = c.makeCell(null, [3, 4, 7]);

        expect(c.isPossible(origCell, 4)).to.equal(true);
        expect(c.isPossible(origCell, 8)).to.equal(false);
    });
});
