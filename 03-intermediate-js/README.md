# Intro to JS: Programming Fundamentals

## Overview

This lecture (and set of notes) is supposed to be a primer into Javascript for developers with experience in another imperative language (e.g. C++, Java, Python, etc.). At UCLA, CS (and related) majors typically start with C++, so we'll draw some comparisons with it there - however, we don't make any assumptions of what your previous language is.

Here's what we plan to cover in this workshop:

* Types in Javascript
* Variables & Scope
* Some Basic Data Structures (List, Object, ...)
* Functions (and functional programming!)
* Loops and Conditional Flow
* Interacting with the DOM

By the end of this lesson, you'll know enough Javascript to make simple interactions on a website, and more importantly, have a strong-enough of a foundation to start exploring it on your own, if you'd like.

Let's get started!

## Table of Contents

## What is Javascript?

In a one-liner, Javascript is a programming language that we use to add interactivity to websites. Interactivity is a very broad term here: it could involve clicking a button to show some text, get data from an external source, or involve rendering a video game on a website!

Today, we'll talk about the core application of Javascript (in the browser, manipulating the DOM); later, we'll discuss things like React and Node and how they're relevant.

But first, we need to get a solid understanding of the language itself.

What do our friends at the MDN say?

> Javascript is a lightweight, interpreted, or just-in-time compiled language with first-class functions.
>
> ...
>
> [It] is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.
>
> ([*mozilla developer network*](https://developer.mozilla.org/en-US/docs/Web/JavaScript))

Wow, that is a lot of words. **A lot.** Today, we'll unpack some of them, and understand how they'd affect us in day-to-day Javascript programming.

In particular, we'll try to emphasize where Javascript is like other programming languages, or different from other languages; in general, we feel that this is a good approach to take when learning languages.

## Hello World

First, how can we even run Javascript? For now, we're going to restrict ourselves to our browser.

Let's open up an HTML file:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>we're going to learn JS!</title>
    </head>
    <body>
        <p>I'm so excited to learn Javascript!</p>
    </body>
</html>
```

We can add Javascript by using the `<script>` tag:

```html

```html
<!DOCTYPE html>
<html>
    <head>
        <title>we're going to learn JS!</title>
    </head>
    <body>
        <p>I'm so excited to learn Javascript!</p>
        <script>
            // some Javascript can go here!!
        </script>
    </body>
</html>
```

Cool! We haven't rendered anything to the page yet, but we have learned our first piece of Javascript: you can use `//` to comment (and as you might expect, `/* */` to block comment).

This is pretty inconvenient though, because we're going to have all of our HTML and JS in this one mega-file. Let's modularize a bit:

```html
<!-- sample.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>we're going to learn JS!</title>
    </head>
    <body>
        <p>I'm so excited to learn Javascript!</p>
        <script src="sample.js"></script>
    </body>
</html>
```

Now, let's make our `sample.js` file, and do our customary hello world.

```js
// sample.js
console.log("Hello World!");
```

Wow, so exciting! Let's go to our page:

TODO: screenshot of page

Oh no, it looks like nothing has happened. But, we need to look a little closer. Go to your browser's console (usually from the Dev Tools, or "Inspect Element"):

TODO: screesnhot of console

Would you look at that! We did it!

But first, exactly *what* did we do? Let's break down our code a little bit, and learn some more about JS.

```js
// sample.js
console.log("Hello World!");
```

There are actually quite a few details we can learn about the language:

* `"Hello World!"` is a string, so Javascript supports strings!
* `console.log()` looks like a function, and the `.` implies some sort of object-based properties
* there are semicolons! (it turns out, these are optional. maybe more on that in a bit)
* Javascript seems imperative and sequential! if you don't know what that means, no worries.

If you've programmed in languages like C++, Java, or Python, this will all sound familiar to you. And that's great! Many of the basic syntax rules that Javascript has are very C-like.

One other thing: you'll note that we didn't have to do any compiling. That's because Javascript is *interpreted*. More on that later.

## Variables and Types in Javascript

First, how do variables work in Javascript? It turns out, that's a more complicated question than you might think. Here's a basic hello world, with variables:

```js
// sample.js
let helloStr = "Hello World!";
console.log(helloStr);
```

That wasn't too hard! `let` is the default variable keyword that we're going to use. This is inspired from Lisp, if you were wondering.

But hold on. We didn't say anything about the type of helloStr. If your background is in statically-typed languages, this should ring an alarm. How does the interpreter know what type `helloStr` is?

The answer is that Javascript is **dynamically typed**. In other words, the type of a variable, an expression, or the return value of a function, all of these things are **evaluated at runtime**. If your interpreted background is Python, this is the same behaviour you'd expect; if your favourite interpreted language is OCaml, you're probably pretty sad.

However, a language being dynamically typed is not the same thing as saying that it has no types. Javascript still has types, and in fact, a good understanding of these types is very important!

### Primitive Types

Javascript has 7 "primitive" types, which technically means that they are **immutable**. More on that in a bit.

The primitive types are:

* `Boolean` (`true` or `false`)
* `Number` (spec'd as a 64-bit float)
* `String` (uncommon to languages)
* `BigInt` (arbitrary-precision number)
* `Undefined` (special)
* `Null` (special)
* `Symbol` (new, and out-of-scope of this lecture)

Here are some examples:

```js
console.log(true);
console.log(false);
console.log(42);
console.log("owo");
console.log(12342942374982342342342323423423423234234234234234223423423423423423423423423423);
console.log(undefined);
console.log(null);
// Symbol is out of scope :(
```

Some of these are familar: almost every language has `Boolean` (except C, I'm looking at you). It's convenient that Javascript supports strings out of the box (C, I'm looking at you again).

But, this list is actually pretty strange compared to other programming languages. Note that it doesn't include integers, characters, pointers, arrays, or objects.

...

immutable

### Everything is an Object

### let, var, and const

## Some Other Quirks

optional semicolons?

interpreted? JIT?