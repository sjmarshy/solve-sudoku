"use strict";

var deepcopy = require("deepcopy");

function isValueValid(act) {

    if (!act) {
        return false;
    }

    let str = act.toString();

    return str.length === 1 &&
        str !== "0" &&
        str.search(/\d/) !== -1;
}

function isCellValid(cell) {
    return cell.hasOwnProperty("value") &&
        cell.hasOwnProperty("possible");
}

function initPossible(cell) {

    let ps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let newCell = deepcopy(cell);

    newCell.possible = {};

    ps.forEach(function(p) {
        newCell.possible[p] = false;
    });

    return newCell;
}

function setPossible(cell, possible, value) {

    if (value === undefined) {
        value = true;
    }

    let newCell = deepcopy(cell);

    if (!newCell.hasOwnProperty("possible")) {
        newCell = initPossible(newCell);
    }

    if (Array.isArray(possible)) {

        possible.forEach(function(p) {
            if (isValueValid(p)) {
                newCell.possible[p] = value;
            }
        });

    } else {
        newCell.possible[possible.toString()] = value;
    }

    return newCell;

}

function togglePossible(cell, possible) {

    let newCell = deepcopy(cell);

    if (Array.isArray(possible)) {
        possible.forEach(function(p) {
            newCell.possible[p] = !newCell.possible[p];
        });
    } else {
        newCell.possible[possible] = !newCell.possible[possible];
    }

    return newCell;
}

function isPossible(cell, possible) {
    return cell.possible[possible];
}

function setValue(cell, value) {

    let newCell = deepcopy(cell);

    if (isValueValid(value) && isCellValid(newCell)) {
        newCell.value = value;
    }

    return newCell;
}

function makeCell(value, possible) {

    let baseCell = {
        value: isValueValid(value) ? value : null
    };

    let fullCell = setPossible(baseCell, possible);

    return fullCell;
}


module.exports = {
    makeCell: makeCell,
    setPossible: setPossible,
    setValue: setValue,
    togglePossible: togglePossible,
    isPossible: isPossible
};
