const RAM = require('./ram');
const CPU = require('./cpu');
var fs = require('fs');

/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory(cpu,data) {
    // Hardcoded program to print the number 8 on the console
    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < data.length; i++) {
        cpu.poke(i, parseInt(data[i], 2));
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

const argv = process.argv.slice(2);



const filename = argv[0];

// Read file
const regexp = /[0-1]{8}/gi;
const filedata = fs.readFileSync(filename, "utf8").match(regexp)

// console.log('data', filedata)
loadMemory(cpu,filedata);


cpu.startClock();