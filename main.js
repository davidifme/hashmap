import { HashMap } from "./hashmap.js";

  // Test HashMap
  const test = HashMap();
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  
  // Overwrite some nodes
  test.set('apple', 'green');
  test.set('banana', 'green');
  
  // Add node to trigger resize
  test.set('moon', 'silver');
  
  // Test other methods
  console.log(test.get('apple')); // green
  console.log(test.has('banana')); // true
  console.log(test.remove('carrot')); // true
  console.log(test.length()); // 12
  console.log(test.keys()); // ['apple', 'banana', 'dog', ...]
  console.log(test.values()); // ['green', 'green', 'brown', ...]
  console.log(test.entries()); // [['apple', 'green'], ['banana', 'green'], ...]