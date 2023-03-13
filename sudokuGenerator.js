import { GRID_SIZE, BOX_SIZE } from "./utilities.js";


export function generateSudoku() {
    const sudoku = createEmptyGrid();
    resolveSudoku(sudoku);
    return removeCells(sudoku);
}

function createEmptyGrid() {
    return new Array(GRID_SIZE).fill().map(() => new Array(GRID_SIZE).fill(null));
}

function resolveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true;

    const numbers = getRandomNumbers();

    for (let i = 0; i < numbers.length; i++) {
        if (!validate(grid, emptyCell.row, emptyCell.column, numbers[i])) continue;

        grid[emptyCell.row][emptyCell.column] = numbers[i];

        if (resolveSudoku(grid)) return true;

        grid[emptyCell.row][emptyCell.column] = null;
    }
}

export function findEmptyCell(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let column = 0; column < GRID_SIZE; column++) {
            if (grid[row][column] === null) return { row, column };
        }
    }
    return null;
}

function getRandomNumbers() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = numbers.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }

    return numbers;
}

function validate(grid, row, column, value) {
    return validateColumn(grid, row, column, value)
        && validateRow(grid, row, column, value)
        && validateBox(grid, row, column, value);
}

function validateColumn(grid, row, column, value) {
    for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
        if (grid[iRow][column] === value && iRow !== row) return false;
    }
    return true;
}

function validateRow(grid, row, column, value) {
    for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
        if (grid[row][iColumn] === value && iColumn !== column) return false;
    }
    return true;
}

function validateBox(grid, row, column, value) {
    const firstRowInBox = row - row % BOX_SIZE;
    const firstColumnInBox = column - column % BOX_SIZE;

    for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
        for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + BOX_SIZE; iColumn++) {
            if (grid[iRow][iColumn] === value && iRow !== row && iColumn !== column) return false;
        }
    }
    return true;
}

function removeCells(grid) {
    const DIFFICULTY = 30;
    const resultGrid = [...grid].map(row => [...row]);

    let i = 0;
    while (i < DIFFICULTY) {
        let row = Math.floor(Math.random() * GRID_SIZE);
        let column = Math.floor(Math.random() * GRID_SIZE);
        if (resultGrid[row][column] !== null) {
            resultGrid[row][column] = null;
            i++;
        }
    }

    return resultGrid;
}