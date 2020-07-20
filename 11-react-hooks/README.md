# React Hooks

In this writeup, we'll cover **React Hooks**: a different way to create and write React code, preferring functional programming and full composition over the previous class-based approach to components, state, and lifecycle actions.

## Table of Contents

* [Table of Contents](#table-of-contents)
* [But Why?](#but-why)
* [Your First Hook: The State Hook](#your-first-hook-the-state-hook)
    * [Multiple States](#multiple-states)
    * [The Rules of Hooks](#the-rules-of-hooks)
    * [So... State or State Hook?](#so-state-or-state-hook)
* [The Effect Hook](#the-effect-hook)
* [Custom Hooks](#custom-hooks)
* [Closing Thoughts](#closing-thoughts)
* [Reference](#reference)

## But Why?

*If you'd like, you can skip this section. It's a bit more abstract than the rest of the note.*

What's wrong with the model that we just learned? And why didn't we start with Hooks?

These are two *very good* questions. The answer to the former is, well, nothing explicitly. If you learn React in 2020 and never touch Hooks, your life will be fine: you can get through almost any complex web application with class-based components, and still make some awesome code.

However, it turns out that there are some slight issues with class-based model that you might run into while writing lots of React code, and Hooks exist to make *your life easier*.

The most fundamental issue is with Javascript itself. Classes in Javascript are not like classes in most true Object-Oriented languages; classes in JS are basically syntactic sugar over functions. The most marked difference is with Javascript's inheritance model, which is [prototype-based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) rather than inherently class-based. The difference is... a bit tricky to explain in one README, but we encourage you to read the above link for more information.

One way this manifests itself is how tricky using the `this` keyword is - we had to dedicate quite a bit of time learning it in this crash course! Because React Hooks **completely sidesteps classes**, we don't need to use all of these complicated `this` shenanigans!

There are other issues that the class-based approach has. As the [motivation section of the React Hooks documentation mentions](https://reactjs.org/docs/hooks-intro.html#motivation), React classes can often result in ugly code: you can't reuse internal state-changing code between components without some notion of higher-order components, and if you've worked on a very complex React app, things get ugly fast. And all of these mistakes pile up, and often create buggy, hard to refactor code.

This is part of a larger movement to adopt more functional programming principles. As we've previously mentioned, it's more "react-like" to use FP principles like map-reduce-collect than it is to use for loops.

Hooks take another principle of functional programming, *minimizing stateness*, to heart. In other words, we try to get rid of "side effects" as much as possible; a "side effect" is something that a function does that's not reflected in its return value (e.g. modifying the state). If you're familiar with monads in Haskell, hooks as a method to contain side effects will seem quite familiar to you too!

So, at the end of the day, our job is to **get rid of classes in our React code**.

And... if this is so great, why didn't we start with this? To be honest, we probably should've - it might've made our lives a lot easier, and you'll have to forgive us there. At the same time, we believed that classes are helpful because *most CS students have interacted with OOP before*, even if it's not Javascript OOP; on the other hand, functional programming constructs might be tricky at first grasp. Nevertheless, this crash course is an experiment in teaching, so we'd love your feedback on this!

## Your First Hook: The State Hook

For this portion, we're going to loosely base it off of [hooks at a glance](https://reactjs.org/docs/hooks-overview.html) from the react tutorial.

Let's take a look at a classic example of an app with state, a counter.

If we'd do it in a class-based approach, we would write something like this:

```jsx
import React from 'react';

class Counter extends React.Component{
    state = {
        count: 0;
    }
    render = () => {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={
                    (prevState) => this.setState({count: prevState.count + 1})
                }>
                    Click me
                </button>
            </div>
        );
    }
}
```

Because we needed an internal state, we had to create a `class` that extends `React.Component`. We then update the state with our good friend, `this.setState`, using the previous-state argument to make sure that we updated the state properly.

Now, let's take a look at the hooks way to write the exact same code:

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Wow! There are a quite a few weird things going on there. The first, if you're unfamiliar, is [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). This line

```js
const [count, setCount] = useState(0);
```

really means, `useState(0)` should return an array with two items. Set the `count` to be the value of the first item in the array, and `setCount` to be the second value in the array. This is the same principle behind object destructuring (remember that an array is just an object).

Okay, but what exactly do `count` and `setCount` now have? What does `useState` return? Well, `useState` is a function that's part of the **state hook**, and it returns two things:

1. It returns the current value of the state variable.
2. It returns a function that you can use to update the value of the state variable.

The reason we use array destructuring is so that we can name these items whatever we want. In this case, we create the local `const` variable `count` to have the value of this state variable, and the local `const` function (which ... is also a variable, since functions are objects) `setCount` to update this variable. These two things are tied together - calling `setCount` updates `count`!

And, as you might've guessed, the value we pass into `useState` is the default value of our state. It can be any (shallow-refrenced) object, like a string, number, boolean, or an array!

Now, things are making more sense! The render function is quite similar to our other render function, just replacing `this.state.count` with `count` and `setState` with `setCount` when appropriate.

So, we just "wrote" our first hook. Notably, we got rid of the notion of Javascript classes, and moved state away to another function (which we'll later see is *extremely* helpful). For now though, this may seem confusing or useless, and that's totally understandable. At the very least, we just want to make sure that you know what hooks are.

### Multiple States

Now the question is, can you do more than one hook in a function? And the answer is, yes!

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  ...
```

This code works just fine. Even though we make multiple calls to `useState`, they all return different pairs of variables and setters - so, we just call the setters whenever we need to update specific values!

### The Rules of Hooks

*This is adapted from [Rules of Hooks in the official React documentation](https://reactjs.org/docs/hooks-rules.html).

Before we go into more examples, we briefly need to discuss when you can use hooks. There are a few small restrictions in how you can use them:

1. **Hooks need to be called at the top level.** In other words, **don't call Hooks inside loops, conditions, or nested functions**. This is important for "Hook determinism", which makes sure that multiple hooks can be called in the same order every time. If there are situations where you think you need to call a hook in a loop, condition, or nested function, refactor your code or make a new component.
2. **Hooks need to be called from React functions.** In other words, you can only call hooks from React (function) components (e.g., not a helper function, and not a class component), or *your own custom hook* (which we'll mention briefly).

If you're curious, you should read [the Rules of Hooks in the official React documentation](https://reactjs.org/docs/hooks-rules.html). If you consistently use Create React App, the internal ESLint plugin will automatically check this for you (and give you a warning/error if you do).

### So... State or State Hook?

Okay, so we've now learned a handy skill! Should you use it?

The short answer is, **if you're comfortable with it, then yes.**

React Hooks seem to be the *future* of React, especially as Javascript programming paradigms move more and more towards functional programming (when possible). In addition, React Hooks are backwards compatible, so using them should introduce no problems in your existing codebase. They are designed to be gradually introduced into your codebase, starting with new features.

At the same time, if this is confusing, that's ok! Classes in React aren't going away anytime soon, and we think it's the most important for you to be *confident about your code*; you'll learn Hooks eventually (if you stick with web dev, that is).

For reference, Teach LA is gradually moving to Hooks as well, albeit... at a snail's pace. Many codebases are doing the same, and we think it's a move in the right direction. Hopefully, you think so too!

## The Effect Hook

Okay, so we might have a small problem here. We've gotten rid of classes, right? Well, what happens to our good friend **the component lifecycle**, and things like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`?

That's a very astute observation! React Hooks exposes a different way to perform these types of lifecycle functions, called an **effect hook**. Effect hooks are a way that we can compartmentalize side effects.

Let's say that we want to add a feature to our counter, so that the document's title (e.g. the tab title) says how many times we've clicked the count as well. Here's how we'd do that with the class-based approach:

```jsx
import React from 'react';

class Counter extends React.Component{
    state = {
        count: 0;
    }
    componentDidMount = () => {
        document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate = () => {
        document.title = `You clicked ${this.state.count} times`;
    }
    render = () => {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={
                    (prevState) => this.setState({count: prevState.count + 1})
                }>
                    Click me
                </button>
            </div>
        );
    }
}
```

Uh oh! In this case, we had to duplicate some code. We can't just use `componentDidMount`, since we want our title to update every time that `this.state.count` gets updated. And, we can't juse use `componentDidUpdate`, since it doesn't get called after the first time a component is mounted/rendered.

Hooks come to the rescue here:

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(
        () => {
            document.title = `You clicked ${count} times`;
        }
    );

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
```

Okay, so we've added `useEffect` to our mix. Unlike `useState`, we're not using its return value, or giving it some state; instead, we're **passing it a function**. In this case, this is an arrow function that updates our document title.

An interesting question is, how does React know what `count` is here? The answer is... complicated, but it has to do with something called a [*closure*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). We'll have to be a bit hand-wavy here.

So what? Well, how `useEffect` works is that it will call its argument after *every time the `render` function is called*. In some senses, it's like a combination of `componentDidMount` and `componentDidUpdate`. So, in our case, it will update the document title after *every time the `render` function is called*.

Cool! We've accomplished the same goal as before, but deduplicated the code between the two lifecycle methods.

Okay, but what about those pesky subscriber-unsubscriber relationships? How do we use `componentWillUnmount` with hooks?

In this case, we'll use the return value of the function we pass to `useEffect`. React will call this function when our component unmounts (and thus fulfilling `componentWillUnmount`), but it **will also call it before every new effect** - which is different behaviour than you might expect! More on that [on this page](https://reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update).

Here's a code example, [from the React documentation](https://reactjs.org/docs/hooks-effect.html#example-using-classes-1). The premise is that we need to subscribe to the status of any friend (e.g. if they're online, like on Facebook Messenger). First, how we'd do it with classes:

```jsx
class FriendStatus extends React.Component {
    state= {
        isOnline: null
    }

    componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    handleStatusChange = (status) => {
        this.setState({
            isOnline: status.isOnline
        });
    }

    render() {
        if (this.state.isOnline === null) {
            return 'Loading...';
        }
        return this.state.isOnline ? 'Online' : 'Offline';
    }
}
```

Lots of code! Let's make it more compact and readable with hooks:

```jsx
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}
```

At first, this might look *more confusing*, why did we introduce this? Well, let's break it down:

* similar to last time, we're passing a function to our hook. So, every time render is called, we subscribe to the chatAPI's friend status. That's more than `componentDidMount`!
* then, we're also returning an arrow function, which unsubscribes us from the chat API. This cleanup function gets run *before every new effect* and *before the component gets unmounted*. So, we never "double-subscribe", and the cleanup is sure to happen!

Now, you might think that this paradigm of "cleanup-and-create" on every render is bad for performance, and you'd be somewhat right. It is worse for performance, but typically, these actions aren't too costly anyways; the bigger problem is reducing bugs, which this pattern should help with! That being said, [you can disable this behaviour](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects), if you'd like.

## Custom Hooks

You can do a lot more with React Hooks! We won't go into the details here, but [you can read this entry on custom hooks for more information](https://reactjs.org/docs/hooks-custom.html). Long story short, custom hooks can help you share logic across components, and better modularize your code/compartmentalize your side effects.

## Closing Thoughts

And... that's it! That's the tour of Hooks. We recommend that you try these out, but again, there's no pressure to use them immediately if you're not comfortable with them yet. Hopefully, this gives you yet another tool in your toolbox to write clean, maintainable, code.

React Hooks are new, but they're not *that* new - there is significant community support for them, along with many guides online on how to use them. Feel free to look around (or ask us) if you have any questions!

## Reference

Most of this material is derived from [React's official "Introducing Hooks" page](https://reactjs.org/docs/hooks-intro.html). If you read through the 8 different pages, we think you'll have an equal, if not significantly better understanding of hooks than what you can gleam from this lesson!