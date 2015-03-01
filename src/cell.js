"use strict";

function actualValid(act) {

    if (!act) {
        return false;
    }

    let str = act.toString();

    return str.length === 1 &&
        str !== "0" &&
        str.search(/\d/) !== -1;
}


function Cell(actual, possible) {

    this.possible = {};

    this.setActual(actual);

    let pos = possible ? new Set(possible) : new Set();

    for (let i = 1; i < 10; i++) {
        this.possible[i] = pos.has(i);
    }
}

Cell.prototype.setPossible = function(number, has) {
    this.possible[number] = has;
};

Cell.prototype.setActual = function(actual) {

    let last = this.hasActual() ? this.actual : null;
    this.actual = (actual && actualValid(actual)) ?
        actual :
        last;
};

Cell.prototype.hasActual = function() {

    return !!this.actual;
};

module.exports = Cell;
