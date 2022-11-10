const{doubleEvenNumbers, computeEarnings, sanitizeFruitBasket} = require("./../week4-jsCode");
const createObservable = require("./../ex4-observable/ex4-observable");

//ex1 test
test('doubleEvenNumbers should take the even numbers and double them', () => {
    const actual = doubleEvenNumbers([1, 2, 3, 4]);
    const expected = [4, 8];
    expect(actual).toEqual(expected);
});


//ex2 test
describe('computeEarnings', () => {
    test('should take two parameters', () => {
      // The `.length` property indicates the number of parameters expected by
      // the function.
      expect(computeEarnings).toHaveLength(2);
    });
  
    test('should compute the earnings as a formatted Euro amount', () => {
      const mondayTasks = [
        {
          name: 'Daily standup',
          duration: 30, // specified in minutes
        },
        {
          name: 'Feature discussion',
          duration: 120,
        },
        {
          name: 'Development time',
          duration: 240,
        },
        {
          name: 'Talk to different members from the product team',
          duration: 60,
        },
      ];
      const hourlyRate = 25;
      expect(computeEarnings(mondayTasks, hourlyRate)).toEqual('€187.5');
    });
});


//ex3 test
describe('sanitizeFruitBasket', () => {
    test('should take two parameters', () => {
      // TODO replace next line with your code
      expect(sanitizeFruitBasket.length).toBe(2);
    });
  
    test('should not modify the original `fruitBasket` array', () => {
      // Save the original contents of the fruit basket
      const fruitBasket = ['apple', 'lemon', 'grapefruit', 'lemon', 'banana', 'watermelon', 'lemon'];
      const originalFruitBasketContents = [...fruitBasket];
      // TODO replace next line with your code
      expect(originalFruitBasketContents).toStrictEqual(fruitBasket);
    });
  
    test('should return a new array that does not include the unwanted `lemon`', () => {
      const fruitBasket = ['apple', 'lemon', 'grapefruit', 'lemon', 'banana', 'watermelon', 'lemon'];
      const originalFruitBasketContents = [...fruitBasket];
      const takeOut = 'lemon';
      expect(sanitizeFruitBasket(fruitBasket, takeOut)).not.toContain('lemon')
    });
});
  

//ex4 test
describe('createObservable', () => {
    test('should exist and be a function', () => {
      expect(typeof createObservable).toBe('function');
    });
  
    test('should return an object with `subscribe` and a `notify` function properties', () => {
      const observable = createObservable();
      expect(typeof observable).toBe('object');
      expect(typeof observable.subscribe).toBe('function');
      expect(typeof observable.notify).toBe('function');
    });
  
    test('should notify all subscribers of any notification', () => {
      const observable = createObservable();
  
      // Create two mocked listener functions
      const listener1 = jest.fn()
      const listener2 = jest.fn()

      // Subscribe both function to the observable
      observable.subscribe(listener1);
      observable.subscribe(listener2);

      // Notify all subscribers with a Hi! message
      observable.notify('Hi!');

      // Assert that both listeners have been called with the Hi! message
      expect(listener1).toHaveBeenCalledWith('Hi!');
      expect(listener2).toHaveBeenCalledWith('Hi!');
    });
});