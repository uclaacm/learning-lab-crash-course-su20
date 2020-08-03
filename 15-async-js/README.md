# Asynchronous Programming in JS

## Overview

In this note, we'll go over **asynchronous programming** in Javascript; or in other words, how you can make code run "in parallel" to other code. This is particularly useful for making requests to outside data (e.g. loading an image or file, making an API request, or fetching an external resource), but it also pops up everywhere in modern coding!

For this note, we won't assume you have any experience with other asynchronous programming methods (e.g. multithreading, green threads, unix processes, etc.). However, previous knowledge is always a plus! However, **we do expect that you know basic JS**, and you'll find that **remembering how functions work** will be especially helpful.

## Table of Contents

* [Overview](#overview)
* [Table of Contents](#table-of-contents)
* [What is Async?](#what-is-async)
* [First Steps: Using fetch](#first-steps-using-fetch)
* [async/await and Promises](#asyncawait-and-promises)
  * [async/await](#asyncawait)
  * [Promises](#promises)
  * [then, catch](#then-catch)
* [Working Through Examples](#working-through-examples)
  * [Fetching a Resource](#fetching-a-resource)
  * [async/await with React](#asyncawait-with-react)
  * [POST requests with Fetch](#post-requests-with-fetch)
* [Quick Summary](#quick-summary)
* [Appendix: Callbacks](#appendix-callbacks)
* [Appendix: The JS Event Loop](#appendix-the-js-event-loop)
* [Further Reading](#further-reading)

## What is Async?

## First Steps: Using fetch

Before we really dive deep into asynchronous programming in Javascript, let's start with a quick example

```js
fetch('https://teachla.uclaacm.com/accountability/budget-19-20.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // we do some data processing here
  })
```

Wow, what's going on here? There are a lot of functions everywhere!

Let's make a few guesses

* at first glance, it looks like `.then()` is a function that belongs to whatever `fetch()` returns
* it looks like `.then()` takes in a parameter, **and that parameter is a function!**
* `.then()` must return something that also has another `.then()`, because we've chained them

*If that didn't make sense, we recommend that you take a quick detour to get familiar with JS functions (and specifically, passing functions as parameters and arrow functions - those are both really relevant).*

If that did make sense, then we're on the right track! To uncover the next step here, we can think about the naming of the `.then()` function - it's named quite suggestively! It's almost as if...

* we do the `fetch()`
* once that's done, **then** we run the `response` function
* once that's done, **then** we run the `data` function

And glossing over some details, that's exactly what this piece of code does! It does something that may take a long time (e.g. fetching a resource), **then, after that's done**, we do something with the response. Usually, "doing something with the response" will involve processing the data, and showing the user something. More on that later.

It turns out, this pattern is extremely common. As web developers, you'll get external resources all the time! But, we don't want to make the user **wait for the request to finish**, since it could take a long time. And that's where our knowledge of asynchronous programming will come in handy.

## async/await and Promises

### async/await

Functions in JavaScript are first-class citizens, but they have all sorts of special privileges too. One of them involves the `async` keyword. You can declare any function as `async`:

```js
async function helloThere() { ... };
async function generalKenobi = () => { ... };

class Sand {
  async iDontLike = sand => { console.log("It's coarse, and rough, and irritating, and it gets everywhere.")}
}
```

When you tag a function with `async`, it means you can use the `await` keyword inside of them. I know, I know, I'm throwing in more keywords, but bear with me.

```js
async function helloThere = () => {
  await seeIfThereIsAJedi();
  console.log("General Kenobi.");
}
```

The `await` keyword, well, awaits a response from something. In particular, for whatever thing we're awaiting, **we won't execute any more code until we get what we're waiting for**. In this case, that means that `console.log` is only executed after `seeIfThereIsAJedi()` returns a value, **even if it takes a long time for that to happen**. We call this behaviour "blocking", as in we block execution until `seeIfThereIsAJedi()` returns.

As you can imagine, this is a very useful programming pattern! You only want to update data **after** you receive it, and this is the way to do it.

But wait! How do we define a value for `await`? Well I'll tell you, I promise.

### Promises

When I said I promise, I meant it!

...

### then, catch

## Working Through Examples

### Fetching a Resource

### async/await with React

### POST requests with Fetch

## Quick Summary

## Appendix: Callbacks

## Appendix: The JS Event Loop

## Further Reading

* [Using Fetch (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [async function (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
