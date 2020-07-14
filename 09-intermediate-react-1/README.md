# Intermediate React 1 (Big Brain Energy)

## Overview

With Matt, we'll cover some of the larger conceptual ideas that drive React, and how to "think in React"! We'll cover:

* Good practices and tips on planning your app state
* The React Component Lifecycle and why it's useful
* How to use Events in React
* Passing functions as props and why it's useful
* `this` in React and Javascript

After this workshop, you should have a better understanding of why React is so popular, and what you can do with it! A lot of (if not all of) this content will be relevant to the learning labs.

## `this` in JS (and React)

The `this` keyword is a common source of confusion in Javascript. How do we know exactly what `this` points to?

It turns out, this is quite a tricky question to answer. Unlike most languages, `this` is *not* statically binded - it can be changed at runtime. This means that there's no rule of thumb you can use to figure out exactly what `this` is, but rather to evaluate it in a case by case basis. 

In particular, it is confusing because it behaves differently in [strict and non-strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). Almost all React apps operate in strict mode, so from now on, we'll assume we're in strict mode by default.

Let's start with the simplest case, the "normal" one. Like `var`, `this` is function-binded by default. Well, kinda.

```js
...
```

## Classes

In React, we'll often use the `class` keyword, which in some senses just syntactic sugar over functions (inheritance is still prototypical). You'd want `this` to work with classes like it does in Java or Python (or... almost any OOP language), and sometimes, it does:

```js
class Person {
    constructor (name){
        this.name = name;
    }
    identify() {
        console.log(this.name);
    }
}

let m = new Person("matt");
m.identify(); // "matt"
```

However, there are some hijinks if we peer behind the curtain:

```js
class Person {
    constructor (name){
        this.name = name;
    }
    identify() {
        console.log(this.name);
    }
}

let m = new Person("matt");
m.identify(); // "matt"
identifyHandler = m.identify;
identifyHandler(); // Error: cannot read property 'name' of undefined
```

In this case, since we've just copied the function reference/pointer, it has lost all notion of what `this` is - in some senses, it has been detached from its parent class.

There's a more devious example.

```js
class Person {
  constructor(){
    this.age = 0;
  }
  startGrowing(){
    setInterval(function growUp() {
      this.age++;
      console.log(this.age);
    }, 1000);
  }
}

let p = new Person();
p.startGrowing();
// NaN
// NaN
// NaN
```

We'll get an infinite `NaN` loop. Don't trust me? Run it yourself, and take a look!

Hm, this seems strange. What's going on here?

In this case, when we define the function `growUp`, we're creating a new *lexical function scope*, or in other words, a thing for `this` to attach to. So, when we do `this.age++`, it's searching `growUp` for `this.age` - and since it can't find one, it returns `undefined`. `undefined++ == NaN`, and `NaN ++ == NaN`, so... there we go.

This seems like a critical problem. How can we solve it?

One option is with `this` binding:

```js
class Person {
  constructor(){
    this.age = 0;
  }
  startGrowing(){
    setInterval(function() {
      this.age++;
      console.log(this.age);
    }.bind(this), 1000);
  }
}

let p = new Person();
p.startGrowing();
// 1
// 2
// 3
```

But this is pretty unelegant, and importantly, **developers forget to do it**. So, what can we do?

### Arrow Functions

In React, you'll often use **arrow functions**, which are a way to write anonymous functions:

```js
const greeting = (message) => {
    return "Hello, " + message;
}
greeting("Matt"); // "Hello, Matt"
```

Here, the name of the function is `greeting`, the function takes in one argument, `message`, and the body of the function follows the arrow `=>`. If you have no arguments, you'll leave an empty parentheses set `()`, and if there's only one argument, you can omit the parentheses.

Arrow functions are almost the exact same thing as using the `function` keyword to define a function. However, there is a set of core differences between it and `function`, the most important one to us being how `this` is binded - or rather, that arrow functions **do not have their own `this` scope**.

```js
...
```

Great, so that should give us another way to solve our previous problem!

```js
class Person {
  constructor(){
    this.age = 0;
  }
  startGrowing(){
    setInterval(() => {
      this.age++;
      console.log(this.age);
    }, 1000);
  }
}

let p = new Person();
p.startGrowing();
// 1
// 2
// 3
```

## The (Shallow? Deep?) State

## The React Component Lifecycle

This is a bit of a complicated topic, so we'll cover the more simplified version:

![React Component Lifecycle diagram](images/lifecycle.jpg)

There are three different types of actions

## Events in React

## Functional Programming in React

### Generating Lists of Components

As we've discussed before, the `Array.map()` functions apply a function on every element of an array, to create a new array. This is especially useful to create a *list of React components* from a set of data. As it turns out, this is a very common and popular operation in functional programming.

Let's took at a simple example:

```jsx
const foods = ["apple", "banana", "coconut"];

function ListOfFoods(){
  return (
    <div>
      <p>
        a list of fruits I like:
      </p>
      <ul>
        {foods.map((food)=> {
          return <li key={food}>food</li>;
        })}
      </ul>
    </div>
  );
}

// <p>
//   a list of fruits I like:
// </p>
// <ul>
//   <li>apple</li>
//   <li>banana</li>
//   <li>coconut</li>
// </ul>
```

Note the `key` property: when you generate a list of components, you must create them with unique `key`s. This is because React needs some sort of identifier to distinguish the elements from each other.

You can also use it with much more complicated components, and with ones you've made yourself!

```

```

### Functions-as-props

Often times, you'll pass down functions as props to another component. One common use case is to control a parent component from its child.

```jsx
function Message(props){
  return (
    <div>
      <p>{props.author} says...</p>
      <p>{props.message}</p>
      <p>{props.date}</p>
      <button onClick={props.deleteFunc}>
        remove message
      </button>
    </div>
  );
}

class Dashboard(){
  state = {
    messages: [
      {
        author: "matt",
        content: "owo!",
        date: "July 14"
      },
    ]
  }
  render = () =>{
    return (
      <div>
        {
          this.state.messages.map((message, i)=>{
            return
            (<Message
              key={i}
              author={message.author}
              content={message.content}
              date={message.date}
              deleteFunc={() => this.deleteMessage(i)}
            }/>);
          })
        }
      </div>
    )
  }
}
```

...

### Functional Components and Hooks

## Resources

* [this (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
* [Strict mode (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
* [Classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [class (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class)
* [Arrow function expressions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)