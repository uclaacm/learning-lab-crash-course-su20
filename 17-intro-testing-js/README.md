# Testing in Javascript (with Jest)

[Link to Video](https://www.youtube.com/watch?v=aPJm91_cDw4).

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

We've previously (briefly) mentioned the concepts of **Continuous Integration** and **Continuous Deployment**, which automates the versioning, dependency management, and deployment of your software. Tests are a big part of that! Often times, deployment services are configured so that they only deploy *if the tests pass*. Writing solid tests are a great part of making sure that you never deploy broken code!

There are also ways you can configure your development workflow to ensure that tests pass before someone commits (called a [commit hook](https://githooks.com/)), or that a certain set of tests pass before a PR can be merged (which can be easily done with [GitHub Actions](https://github.com/features/actions) and required status checks).

## Getting Started w/ Jest

Okay, enough babble. Let's get started.

We're going to use a Javascript library called [Jest](https://jestjs.io/), an open-source Javascript testing library developed by Facebook. For the rest of the workshop, we're going to assume that you have jest installed in your development workspace, which you can do with `npm`:

```
npm install --save-dev jest
# or
yarn add --dev jest
```

### The "Hello World"

*The "example-node" folder contains the final code for the non-React demo.*

Let's start with a very simple function that says "hello" to people:

```js
// hello.js
const hello = (name) => {
  return `hello ${name}!`
}

module.exports = hello
```

Nothing too spicy! The line with `module.exports` just says that we're exporting the `hello` function.

Here's how we'll use jest:

```js
// hello.test.js
const hello = require('./hello')

test('hello works as intended!', () => {
  expect(hello("matt")).toBe("hello matt!")
})
```

Oh wow, a few different things going on here! We import `hello` from our other file, and then we use the `test` function.

`test` is provided by Jest, and takes in two parameters:

1. the name of the test - this should be descriptive
2. a test function, which gets run during the test!

The test function in this case only contains one line, `expect(hello("matt")).toBe("hello matt!")`, but it ccan contain many lines too - it's just a function!

What's `expect` then? It's another function provided by jest that works like `assert` in many languages (something you might've seen in C++ in CS31/32). You pass it the thing you're testing, which in this case, is the output of our `hello` function (when we pass in `"matt"` as a parameter).

Then, we chain it with `.toBe` - a function that takes an argument on what... the return value *should be*, or the "correct answer". If the two things match (the real and expected values), then the test passes - but if they don't, then the test fails.

To run your test, you can run `npm test`:

```
npm test                                                                            master * ] 5:44 PM

> example-node@1.0.0 test /Users/matt/code/learning-lab-crash-course-su20/17-intro-testing-js/example-node
> jest

 PASS  ./hello.test.js
  ✓ hello works as intended! (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.805 s
Ran all test suites.
```

And that's it! You just wrote your very first test!!

### The React "Hello World" with Enzyme

Okay, so testing things with Jest is easy enough, but where things get more complicated is when we want to test things like the user interface -- things that we build with React. Luckily, instead of limiting ourselves to testing our functional components with props and renders dependent on React-specific types on test frameworks we wrote ourselves, we can just make use a great piece of software from AirBnB: [Enzyme](https://airbnb.io/projects/enzyme/) (`npm install --save-dev enzyme`). Likewise, we will need an adapter to ensure that Enzyme will work well with our current version of React. Checking our `package.json`, we are using version 16, so we should `npm install enzyme-adapter-react-16`.

Enzyme lets us write tests for React components by mocking them up with specific props, then exploring their contents as a browser would, or by simulating user interactions!

That sounds super complicated, so let's start from somewhere simple: remember our hello world example with React?

#### The code

Recall the code for the React "hello world" app, something that we have reviewed several times at this point. The only adjustment we will make to it for our purposes is the addition of a single button, which takes an optional onClick function through the component props:

```js
// App.js
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={props.onClick}>Click me!</button>
      </header>
    </div>
  );
}
```

Now, we want to write a basic test using Jest so that our React components can be tested just as easily as our library functions. If we take a look in the CRA example, we'll see there is already a test written for us!

```js
// App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

This is a test written using React's testing library, and will be good practice to review:
* We import the `render()` function from our testing library, which is provided by React.
* Then, we write a test that checks that our component renders a link to the "learn react" page.
* First, we pull out the `getByText` member function of the result of `render(<App />)`.
* Then, we search by regexp (hence the `/.../i`) for the string "learn react".
* Finally, we declare that we expect the resulting element to be in the document.

The `render` function allows us to simulate rendering a component to the page, and returns a wrapper that puts it in a workable form with Jest.

We can run this test, and all other `.test.js` files, with a simple `npm run test` in the terminal, which launches a script provided by CRA that handles Jest.

But Matt, where's Enzyme? Why did we bother installing it? Converting this test will be easier than you think. Using our Jest syntax we are familiar with, we can rewrite our test as follows:

```js
// App.test.js
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders learn react link', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.App-link')).toBe(true);
  });
});
```

This is a far more natural way of describing our component-based tests, in which we can query for document selectors and use them naturally in our Jest tests.

To configure Jest to handle these changes, all we need to do is add some lines to our test setup file, `src/setupTests.js`. This file is configured by CRA to run everytime we need to start testing with Jest, and it's where we will apply our adapter. There will already be some code in there, but we can just append to the file.

```js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: Adapter });
```

Now when we run it, we will see...

```sh
# ...
```

## Mocking Browser Interactions

We can mock browser interactions with our new component in Enzyme with the `simulate` action. This function allows us to emulate any browser event in the context of our particular component.

```js
// App.test.js
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('should react when clicked', () => {
    let i = 0;
    const wrapper = shallow(<App onClick={() => i++)} />);
    wrapper.find('button').simulate('click');
    expect(i).toBe(1);
  });
});
```

We have changed up a few small things to better cater to Enzyme's syntax:
* Instead of `test`, we use `describe` -- we are *describing* a component's expected behavior.
* We use `it` to nest tests within a description.

Here, we use Jest's `describe` to handle the *description* of a particular function or -- in our case -- component. Then, we provide a description of the component -- "it should have one immediate child". Then, we use `shallow()` to perform what is known as a **shallow render** of the component. This simply renders the component without dealing with its complete lifecycle, and returns a wrapper for the component that is workable with Jest.

Then, we write tests as usual! We expect the length of the children to be of length one. Simple!

Here, we simulate a click on the button in our App, then check to see if the click did, in fact, register, by creating an anonymous function that updates a variable in the test scope.

There are a lot more things that one can do with Enzyme tests, which you can check out [on their docs](https://enzymejs.github.io/enzyme/docs/api/).

## Dependency Injection et al.

Sometimes in testing, we want to mock up more complicated objects that may be produced during execution, or to emulate specific situations.

For example, if an object used in our library takes another object meeting a particular interface, we can mock it up. Here's an example:

```js
class MyClass {
  constructor(log) {
    this.logger = log ? log : new ConsoleLogger();
  }
}
```

We have exposed an explicit class dependency in our class to the developer in the form of a constructor parameter. Now, when we go to create an instance of our `MyClass`, we can declare it like `new MyClass()` or `new MyClass(new MyConsoleLogger)`. Why might we want to use the latter? Think for a moment...

The answer is that it makes testing easier, of course! If we want to track the input and output of something, we can just extend `ConsoleLogger`, adjust its `log` functions, then pass it down to our class. Then, we are in control of all the input and output of the logger for that class instance. This is **dependency injection**. Usually it is used for things like services that will persist throughout the lifetime of an instance.

We can do so in React just as easily! Simply pass down a mocked-up interface as a prop to your component when testing with Enzyme:

```js
// MyComponent.test.js
// ...

describe('<MyComponent />', () => {
  it('logs properly', () => {
    let customLogger = new ConsoleLogger();
    const wrapper = shallow(<MyComponent logger={customLogger} />);
    // ...
  });
});
```

Though we won't be able to go in-depth in this short lesson, this is a critical testing strategy to bear in mind when writing complex applications.

## And... Writing Test-Friendly Code

For obvious reasons, the only way that we are able to test all of our code up until now has been because our code was written with tests in mind. Consider, for example, if our hello world example didn't allow the `onClick` prop to be passed down. Consider the case that the `onClick` function was instead hard-wired into the `<App />` component.

We could still test the click functionality by rendering and checking for changes, but this makes life difficult when we want to mock up functions that would change things like a backend or the network.

To make life easier for ourselves, writing code with tests in mind will ultimately improve the maintainability and readability of one's codebase, and keep tests predictable.

## Further Reading & References
* [Jest docs](https://jestjs.io/docs/en/getting-started)
* [Enzyme docs](https://enzymejs.github.io/enzyme/docs/api/)
* [chai, an assertion library for Node](https://www.chaijs.com/)
* [Dependency Injection: Practical Examples for Testing and Refactoring in JavaScript](https://medium.com/@daniel.oliver.king/dependency-injection-practical-examples-for-testing-and-refactoring-in-javascript-3cb5b58b50be)
* ["React Has Built-In Dependency Injection"](https://marmelab.com/blog/2019/03/13/react-dependency-injection.html)
