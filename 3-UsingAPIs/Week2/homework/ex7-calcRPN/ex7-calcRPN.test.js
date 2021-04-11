const { executeOperation, executeSequence } = require('./ex7-calcRPN');

describe('RPN Calculator', () => {
  describe('executeOperation', () => {
    describe('math operations', () => {
      it('opcode `+` should add x and y', () => {
        const stack = [1, 2, 0, 0];
        const result = executeOperation(stack, '+');
        expect(result).toEqual([3, 0, 0, 0]);
      });

      it('opcode `chs` change the sign of x', () => {
        const stack = [1, 0, 0, 0];
        const result = executeOperation(stack, 'chs');
        expect(result).toEqual([-1, 0, 0, 0]);
      });
    });
    describe('stack operations', () => {
      it('opcode `swap` should swap x and y on the stack', () => {
        const stack = [1, 2, 3, 0];
        const result = executeOperation(stack, 'swap');
        expect(result).toEqual([2, 1, 3, 0]);
      });
    });
  });

  describe('executeProgram', () => {
    const programs = {
      add: [4, 2, '+'],
      subtract: [4, 2, '-'],
    };

    it('should execute program `add`', () => {
      const result = executeSequence(programs.add);
      expect(result).toEqual([6, 0, 0, 0]);
    });

    it('should execute program `subtract`', () => {
      const result = executeSequence(programs.subtract);
      expect(result).toEqual([2, 0, 0, 0]);
    });
  });
});
