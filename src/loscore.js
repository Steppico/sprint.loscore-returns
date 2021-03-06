// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      obj["+" + array[i]] = array[i];
    }
    let newArr = Object.keys(obj);
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = Number(+newArr[i]);
    }
    return newArr;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    let newArray = [];
    this.each(collection, (item) => {
      newArray.push(iteratee(item));
    });
    return newArray;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    const result = [];
    this.filter(collection, (value) => {
      if (!test(value)) {
        result.push(value);
      }
    });
    return result;
  }

  reduce(collection, iterator, accumulator = collection[0]) {
    if (accumulator === collection[0]) {
      collection = collection.slice(1);
    }
    this.each(collection, (item) => {
      let previousResult = accumulator;
      accumulator = iterator(accumulator, item);
      if (accumulator === undefined) {
        accumulator = previousResult;
      }
    });
    return accumulator;
  }

  every(collection, test) {
    if (collection.length === 0) return true;
    let booly = true;
    booly = this.reduce(collection, (accumulator, value) => {
      if (accumulator == false) {
        return false;
      }
      return test === undefined ? value : !!test(value);
    });
    return booly;
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */

  extend(mainObj, ...obj) {
    this.each(obj, (item) => {
      for (const key in item) {
        mainObj[key] = item[key];
      }
    });
    return mainObj;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let count = 0;
    return function() {
      if (count === 0) {
        count++;
        func();
      }
    };
  }

  memoize(func) {
    const cache = {};
    return function(...items) {
      if (!cache[JSON.stringify(items)]) {
        return (cache[JSON.stringify(items)] = func(items));
      }
    };
  }

  invoke(collection, functionOrKey) {
    const array = [];
    if (typeof functionOrKey === "function") {
      for (const item of collection) {
        array.push(functionOrKey.apply(item));
      }
    } else {
      for (const item of collection) {
        array.push(item[functionOrKey]());
      }
    }
    return array;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
