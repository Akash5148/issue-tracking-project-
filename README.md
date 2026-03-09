##1️⃣ What is the difference between var, let, and const?
#ans:var is function-scoped and can be redeclared and reassigned. It is the older way of declaring variables in JavaScript.
here fuction scoped means  if we declared a variable in side a fuction we can not access it outside of the fuction.

let is block-scoped and it can be reassigned but cannot be redeclared in the same scope.
Block-scoped means if we declare a variable inside a block we cannot access it outside of that block.

const is also block-scoped, but it cannot be reassigned or redeclared after declaration.
It is used for variables whose value should not change.


## - 2️⃣ What is the spread operator (...)?
#ans:The spread operator (...) is used to expand the elements of an array or object.

## 3️⃣ What is the difference between map(), filter(), and forEach()?
#ans:These are array methods of array  that work in JavaScript , but they work differently:

filter() selects only the elements that meet a condition and creates a new array.
The original array is not changed.

filter() selects only the elements that meet a condition and creates a new array.
The original array is not changed.

forEach() performs an action on each element.
It does not return a new array

##4️⃣ What is an arrow function?
#ans:An arrow function is a shorter way to write functions in JavaScript. It is more concise than the normal function keyword and is commonly used in modern JavaScript
forexample:
function add(a, b) {
  return a + b;
}

##5️⃣ What are template literals?
#ans:Template literals are a way to write strings in JavaScript using backticks ` instead of quotes.
They allow you to easily include variables or expressions inside strings.

