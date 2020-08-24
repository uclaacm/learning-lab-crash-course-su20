# Testing in Javascript (with Jest)

## Overview

Writing tests is an often-neglected part of software development (you'll rarely cover this skill in intro CS classes), but it's an essential part of real-life software development! In this note, we'll go over some very basic concepts of testing, and then delve into how we can write tests using [Jest](https://jestjs.io/) (and [Enzyme](https://enzymejs.github.io/enzyme/)). While it's unlikely that this will be a large focus in your learning labs, we hope that this provides a solid foundation for you to become a rockstar developer in the future!

## Table of Contents

* [Overview](#overview)
* [Table of Contents](#table-of-contents)
* [What is Testing, and Why is it Important?](#what-is-testing-and-why-is-it-important)
  * [Integration vs Unit Tests](#integration-vs-unit-tests)
  * [Test-Driven Development](#test-driven-development)
  * [CI &amp; CD](#ci--cd)
* [Getting Started w/ Jest](#getting-started-w-jest)
  * [The "Hello World"](#the-hello-world)
  * [The React "Hello World" with Enzyme](#the-react-hello-world-with-enzyme)
* [Mocking Browser Interactions](#mocking-browser-interactions)
* [Dependency Injection et al.](#dependency-injection-et-al)
* [And... Writing Test-Friendly Code](#and-writing-test-friendly-code)
* [Further Reading &amp; References](#further-reading--references)

## What is Testing, and Why is it Important?

Don't worry, we're not giving you an exam or anything. In this context, *testing* is a system that we use to make sure that our application code (the thing that powers our app, server, database, etc.) works properly! Testing by itself isn't always writing code: especially with web and mobile development, you'll often do visual testing, or use auditing tools (for things like accessibility, or network performance). In this note, we'll mostly focus on the writing of code that tests other code, but don't limit it to here!

And why is writing tests important? If it was so important, wouldn't we teach it in intro CS classes? Well, to be frank, I think that we should teach test writing! But more importantly, writing tests is important for writing **maintainable** software. It ensures that, as your software becomes more complicated, has more users, implements more features, changes directions, and maybe even changes developers, that the core functionality of your software still works. That's why you probably haven't written tests for homework problems or hackathon projects: you write your code, you submit it, then you never touch it again. This is *not the case* with most code in the real world, and weird things happen in the real world - that's why we write tests.

Specifcally, what are ways that tests help us? When you:

* implement a feature, it makes you think about what your feature *actually* needs to do!
* refactor code, that the end product (i.e. the interface) works as intended - including nasty *edge cases*
* update code (either by adding a new feature or fixing a bug), you make sure that the update *doesn't break existing functionality*.
* update a library, you make sure that the new version *doesn't break existing functionality*
* want to deploy your code, you can make sure that your project works *on the deployment envrionment*
* give your project to another developer, they understand *how your code is supposed to work*

Wow, that was a lot of stuff! And to be honest, writing tests does have a learning curve (and it is quite frustrating at times). At the end of the day though, testing helps you write better software, and catches bugs early - this is the same reason we add other seemingly-annoying things to our development process (e.g. linting, static types, optionals, etc.).

### Integration vs Unit Tests

Often times, you'll hear about two different kinds of tests: **unit tests**, and **integration** tests. Unit tests only test *individual portions* of your code: making sure a function, a class, or a React Component works as intended, *by itself*. Unit testing is relatively easy, and also gives you a high level of confidence in your system: if *every single component* of your system works properly, then the only things you need to test manually are how the components join together.

And, that's what integration tests do: they assume that each individual component works properly, and tests the places where the components are used together. Integration testing is important, but note that it requires unit testing to work properly.

Finally, you'll hear about **end-to-end testing**, which is another testing paradigm (that we won't really go into today): end-to-end testing does exactly what it sounds like, when we test *our entire system*, end-to-end. It's kind of treating the entire system as one giant component that we then unit test!

(and of course, there are lots of other testing paradigms too! this is a non-exhaustive list)

In this note, we'll cover mostly unit testing (since it's the easiest to talk about).

### Test-Driven Development

One very popular development paradigm that rises from testing is **test-driven development**. Here's the basic concept:

1. You want to make a new feature.
2. **Before you write any code**, first, decide on your interface for your feature, and write all the tests for the feature. **These tests should fail.**
3. Then, slowly implement the **minimum amount of code so that your tests pass**.
4. Once your tests pass, your feature is done! But you're not done yet: before you commit, **refactor your code** (now that your test works).
5. Finally, once you think it's ready, **commit your code**. Your feature is done! Bop back to step 1.

Test-driven development has gained a lot of popularity recently, especially as software becomes more and more complex (and automatable). Some languages lend themselves to test-driven development more than others (for example, [test-driven development is particularly popular with Go](https://github.com/quii/learn-go-with-tests)), and Javascript isn't *really* one of those, but that's ok! We'll still give it a shot!

Test-driven development isn't *always* the right solution either (especially for things at hackathons), but it's *particularly* useful when you write libraries, functions, or utilities. We'll mostly focus on TDD with that first, but we'll still also discuss how it could apply to React components.

### CI & CD

## Getting Started w/ Jest

### The "Hello World"

### The React "Hello World" with Enzyme

## Mocking Browser Interactions

## Dependency Injection et al.

## And... Writing Test-Friendly Code

## Further Reading & References
