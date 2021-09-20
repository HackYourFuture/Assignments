const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');
const _ = require('lodash');

const gridTemplate = [
  [
    { x: 0, y: 0, alive: false, lifeTime: 0 },
    { x: 1, y: 0, alive: false, lifeTime: 0 },
    { x: 2, y: 0, alive: false, lifeTime: 0 },
  ],
  [
    { x: 0, y: 1, alive: false, lifeTime: 0 },
    { x: 1, y: 1, alive: false, lifeTime: 0 },
    { x: 2, y: 1, alive: false, lifeTime: 0 },
  ],
  [
    { x: 0, y: 2, alive: false, lifeTime: 0 },
    { x: 1, y: 2, alive: false, lifeTime: 0 },
    { x: 2, y: 2, alive: false, lifeTime: 0 },
  ],
];

describe('Game Of Life:', () => {
  let exported, createGame;

  beforeAll(async () => {
    ({ exported } = beforeAllHelper(__filename));
    createGame = exported;
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('a living cell with zero living neighbors should die and have its life time reset to zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    const midCell = grid[1][1];
    midCell.alive = true;
    midCell.lifeTime = 1;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });

  test('a living cell with one living neighbor should die and have its life time reset to zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[1][0].alive = true;
    const midCell = grid[1][1];
    midCell.alive = true;
    midCell.lifeTime = 1;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });

  test('a living cell with two living neighbors should survive and have its life time incremented by one', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[1][0].alive = true;
    grid[1][2].alive = true;
    const midCell = grid[1][1];
    midCell.alive = true;
    midCell.lifeTime = 1;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(true);
    expect(midCell.lifeTime).toBe(2);
  });

  test('a living cell with three living neighbors should survive and have its life time incremented by one', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[1][0].alive = true;
    grid[1][2].alive = true;
    grid[0][0].alive = true;
    const midCell = grid[1][1];
    midCell.alive = true;
    midCell.lifeTime = 1;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(true);
    expect(midCell.lifeTime).toBe(2);
  });

  test('a living cell with four living neighbors should die and have its life time reset to zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[1][0].alive = true;
    grid[1][2].alive = true;
    grid[0][0].alive = true;
    grid[0][1].alive = true;
    const midCell = grid[1][1];
    midCell.alive = true;
    midCell.lifeTime = 1;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });

  test('a dead cell with zero living neighbors should remain dead and have a life time of zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    const midCell = grid[1][1];
    midCell.alive = false;
    midCell.lifeTime = 0;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });

  test('a dead cell with one living neighbor should remain dead and have a life time of zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[1][0].alive = true;
    const midCell = grid[1][1];
    midCell.alive = false;
    midCell.lifeTime = 0;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });

  test('a dead cell with two living neighbors should remain dead and have a life time of zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[1][0].alive = true;
    grid[1][2].alive = true;
    const midCell = grid[1][1];
    midCell.alive = false;
    midCell.lifeTime = 0;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });

  test('a dead cell with three living neighbors should come alive and have its lifeTime reset to one', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[0][0].alive = true;
    grid[1][0].alive = true;
    grid[1][2].alive = true;
    const midCell = grid[1][1];
    midCell.alive = false;
    midCell.lifeTime = 0;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(true);
    expect(midCell.lifeTime).toBe(1);
  });

  test('a dead cell with four living neighbors should remain dead and have a life time of zero', () => {
    const grid = _.cloneDeep(gridTemplate);
    grid[0][0].alive = true;
    grid[0][1].alive = true;
    grid[1][0].alive = true;
    grid[1][2].alive = true;
    const midCell = grid[1][1];
    midCell.alive = false;
    midCell.lifeTime = 0;

    const context = {
      fillStyle: null,
      fillRect: jest.fn(),
    };

    const game = createGame(context, 3, 3);
    game.grid.splice(0, 0, ...grid);

    game.updateGrid();

    expect(midCell.alive).toBe(false);
    expect(midCell.lifeTime).toBe(0);
  });
});
