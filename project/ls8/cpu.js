/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
const LDI = 0b10011001;
const PRN = 0b01000011;
const MUL = 0b10101010;
const HLT = 0b00000001;
const PUSH = 0b01001101;
const POP = 0b01001100;

class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

        // Special-purpose registers
        this.PC = 0; // Program Counter
        this.SP = 244;
        this.newStack = new Stack;

    }

    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {
            case MUL:
                this.PC += 3;
                let valA = this.reg[regA];
                let valB = this.reg[regB];
                let prod = valA * valB;
                this.reg[regA] = prod;
                break;
            // !!! IMPLEMENT ME
            case LDI:
                this.reg[regA] = regB//10011001;
                this.PC += 3;
                break;
            case PRN:
                this.PC += 2;
                console.log(this.reg[regA]);
                break;
            case PUSH:
                this.PC += 2;
                this.newStack.push(this.reg[regA]);
                break;
            case POP:
                this.PC += 2;
                this.reg[regA] = this.newStack.pop()

                break;
            case HLT:
                this.stopClock()
            // break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        let IR = this.ram.read(this.PC)//.toString(2)//[this.PC];
        let operandA = this.ram.read(this.PC + 1);
        let operandB = this.ram.read(this.PC + 2);
        this.alu(IR, operandA, operandB)


        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the instruction that's about to be executed
        // right now.)

        // !!! IMPLEMENT ME

        // Debugging output
        // console.log(IR)
        // console.log(`${this.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.

        // !!! IMPLEMENT ME

        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec.

        // !!! IMPLEMENT ME

        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.

        // !!! IMPLEMENT ME
    }
}
class Stack {

    // Array is used to implement stack
    constructor() {
        this.items = [];
        this.SP = 244; // Stack program counter

    }

    // Functions to be implemented
    // push(item)
    push(element, i) {
        // push element into the items
        this.items[this.SP - 1] = element;
        this.SP--;
    }
    // pop()
    pop() {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.items.length == 0)
            return "Underflow";
        this.SP++
        return this.items.pop();
    }
    // peek()
    peek() {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    }
    // isEmpty()
    isEmpty() {
        // return true if stack is empty
        return this.items.length == 0;
    }
    // printStack()
    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

module.exports = CPU;
