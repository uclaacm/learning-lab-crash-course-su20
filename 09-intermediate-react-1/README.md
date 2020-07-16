# Intermediate React 1 (Big Brain Energy/Concepts & Patterns)

[Link to video.](https://youtu.be/SJOWiYyRjkE)

## Overview

With Matt, we'll cover some of the larger conceptual ideas that drive React, and how to "think in React"! We'll cover:

* Good practices and tips on planning your app state
* The React Component Lifecycle and why it's useful
* How to use Events in React
* Passing functions as props and why it's useful
* `this` in React and Javascript

After this workshop, you should have a better understanding of why React is so popular, and what you can do with it! A lot of (if not all of) this content will be relevant to the learning labs.

## Table of Contents

* [this in JS (and React)](#this-in-js-and-react)
* [Classes](#classes)
    * [Arrow Functions](#arrow-functions)
* [The (Shallow? Deep?) State](#the-shallow-deep-state)
    * [state vs props](#state-vs-props)
    * [complex states](#complex-states)
    * [redux](#redux)
    * [async state and prevState](#async-state-and-prevstate)
* [The React Component Lifecycle](#the-react-component-lifecycle)
* [Functional Programming in React](#functional-programming-in-react)
    * [Events, Handlers, and Forms](#events-handlers-and-forms)
    * [Generating Lists of Components](#generating-lists-of-components)
    * [Functions-as-props](#functions-as-props)
    * [Hooks](#hooks)
* [Resources](#resources)


## `this` in JS (and React)

The `this` keyword is a common source of confusion in Javascript. How do we know exactly what `this` points to?

It turns out, this is quite a tricky question to answer. Unlike most languages, `this` is *not* statically binded - it can be changed at runtime. This means that there's no rule of thumb you can use to figure out exactly what `this` is, but rather to evaluate it in a case by case basis.

In particular, it is confusing because it behaves differently in [strict and non-strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). Almost all React apps operate in strict mode, so from now on, we'll assume we're in strict mode by default.

Let's start with the simplest case, the "normal" one. `this` is usually bound to its calling scope, i.e. the thing that it belongs to.

```js
const test = {
  prop: 42,
  func: function() {
    return this.prop;
  },
};

console.log(test.func); // 42
// in this case, "this" is test - so this.prop is 42
```

If you call `this` outside of any function,  it refers to the global `window` object.

```js
this === window; // true
this.a = 42;
console.log(window.a); // 42
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

But this is pretty inelegant, and importantly, **developers forget to do it**. So, what can we do?

### Arrow Functions

In React, you'll often use **arrow functions**, which are a way to write anonymous functions:

```js
const greeting = (message) => {
    return "Hello, " + message;
}
greeting("Matt"); // "Hello, Matt"

// in this case, since the function's body is only 1 line, we omit the return
const func = x => x * x;
func(3); // 9
```

Here, the name of the function is `greeting`, the function takes in one argument, `message`, and the body of the function follows the arrow `=>`. If you have no arguments, you'll leave an empty parentheses set `()`, and if there's only one argument, you can omit the parentheses.

Arrow functions are almost the exact same thing as using the `function` keyword to define a function. However, there is a set of core differences between it and `function`, the most important one to us being how `this` is binded - or rather, that arrow functions **do not have their own `this` scope**.

```js
const f = () => this; // this just returns this!

f() === window; // true
// this is because the arrow function doesn't create its own
// 'this' lexical scope, so it takes the parent - in this case,
// the global window object
```

Great, so that should give us another way to solve our previous problem!

```js
class Person {
  constructor(){
    this.age = 0;
  }
  startGrowing = () => {
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

You'll see this pattern a lot! In fact, it's almost become a de facto standard in React. We recommend you use arrow functions as much as possible, *unless you know you want to create your own lexical scope*.

## The (Shallow? Deep?) State

As you recall, we said that understanding how State works is critical in React! Let's spend a bit more time talking about the state.

### state vs props

One of the biggest confusion points is between `this.state` and `this.props` - when do you use each of these constructs?

Let's say you have any random component; we'll keep it abstract for now. If the **component gets some information from the parent that affects it**, then that should be a **prop** - it will receive this property from its parent, and update itself accordingly.

On the other hand, if the component needs some data that doesn't come from its parent, then **the component itself** is responsible for managing this data - and therefore, it belongs to the app's **state**.

If a component has a snapshot that has its current state and props, it should have all the data it needs to render a complete view, at that time. If not, you should rethink your app's state!

One confusing bit is that sometimes, a variable that's the state of something is the props for something else:

```jsx
function Footer(props){
  return (
    <footer>
      your current language is: {this.props.language}
    </footer>
  );
}

class CodeEditor{
  state = {
    currentLanguage: "js"
  }
  render = () => {
    return (
      <div>
        ...
        <Footer language={this.state.currentLanguage} />
      </div>
    );
  }
}
```

So, what happens here when the user changes their language, from the `CodeEditor` class?

1. The `CodeEditor.state.currentLanguage` variable is changed with `setState()`
2. The `CodeEditor` instance realizes it needs to re-render parts of its component tree
3. The `CodeEditor` tells the `Footer` that the `language` prop has changed
4. The `Footer` gets the updated prop, and regenerates its component

You'll often use this pattern, especially with "leader-follower" design styles (where one component controls as much of the data flow as possible, while the other components just do stuff based off of that data).

### complex states

As you can imagine, the `state` for something like the homepage of Facebook can get quite complicated. There are a few things you need to be careful with complex states, but the most important has to do with nested state.

Remember this problem with Javascript?

```js
let a = {
    b: { c : 5 }
};
let newCopy = a;

newCopy.b.c = 3;

console.log(a.b.c); // 5
```

That's right, copying objects doesn't actually "deep copy". Well, this affects React too! Not only does state (which is just an object) deep copy, but React also doesn't spy on *nested state*, since it doesn't "know" that your nested object has updated!

```jsx
state = {
    bookCollection: {
      hasMurakami: false;
   }
}
// somewhere else
this.setState({ bookCollection.hasMurakami: true});

// React MAY not update your component!
```

In the above example, React is smart enough to look for changes in the `state.bookCollection` variable. However, if we change `state.bookCollection.hasMurakami`, that **doesn't affect the `bookCollection` reference at all**! So, there's no way for React to properly update your component.

How do you deal with this problem? There are quite a few ways, in increasing order of complexity and scalability:

1. don't use nested state, at all
2. deep copy the state, make a change, then update the entire state (this can be done with the spread operator, `Object.keys`, etc.)
3. use an immutable helper (such as [Immutable](https://github.com/immutable-js/immutable-js))

If you can avoid nested state, that's the best! In general, nested objects can cause many headaches. But, if you can't, then you might want to try option 2:

```jsx
state = {
    bookCollection: {
      hasMurakami: false;
   }
}
// somewhere else
let bookCollection = {...this.state.bookCollection}; // this is a deep copy via sread
bookCollection.hasMurakami = true;
this.setState({bookCollection});
```

But, this option is not very scalable. If you find yourself doing this all the time, or you think nested state is **critical** for your app, using immutable helpers (and probably Redux) will be helpful!

### redux

Oh yeah, [Redux](https://redux.js.org/), what's up with that? It's a very popular library that does many things, but the most common use-case with React is to create "central" state.

Imagine that you have a large number of components inheriting each other:

* `AppController`, which has a
* `AppMainView`, which has a
* `Chatroompage`, which has a
* `ChatroomInteractable`, which has a
* `SelectedChatroom`, which has a
* `ChatroomMessageList`, which has a
* `ChatroomMessage`, which has a
* `ChatroomMessageAvatar`

If you want to control the `ChatroomMessageAvatar` from `AppController`, the only solution we have so far is to pass the state **all the way down these components**, which is annoying and makes for bad code!

The solution is Redux containers, which, long story short, allow you to create one "central state container" that handles your app, and all of your components get the state from the central container. We won't go into Redux in this workshop, but it's good for you to be aware of the problem it tries to solve - and if you find yourself needing to solve that problem frequently, you should check it out!

### async state and prevState

It turns out, `this.setState()` is asynchronous. If you're not sure what that means, here is an example to demonstrate:

```jsx
this.state.message; // "owo"
this.setState({message: "uwu"}); // "uwu"
this.state.message; // may be "owo" or "uwu", we're not sure!
```

Oh no! This seems problematic, right? In one "render-loop" (or update loop, which you'll learn about in like... two paragraphs), changes to state are not necessarily going to happen instantaneously. In other words, updating the state takes time!

Usually, this is actually not a big deal. If you design your state and web-app properly, you shouldn't run into too many problems here. But, there is one design pattern where this is important:

```jsx
if (something){
  this.setState({counter: this.state.counter + 1});
}
if (somethingElse){
  this.setState({counter: this.state.counter + 1});
}
this.state.counter; // could be + 0, + 1, or + 2!!
// and, it's possible that only one + 1 happens!
```

Oh no! This could introduce a *race condition*, which is a word that means "gives you nightmares from Eggert and 111" (okay, it actually means that the final result may not be consistent because of "races" between operations).

Luckily for us, we don't have to deal with mutexes, spin-locks, or the producer-consumer problem. Instead, React has provided a neat way out:

```jsx
if (something){
  this.setState((prevState) => {
    counter: prevState.counter + 1;
  });
}
if (somethingElse){
  this.setState((prevState) => {
    counter: prevState.counter + 1;
  });
}
this.state.counter; // could ... still be + 0, + 1, or + 2!!
// but, eventually, both will happen!
```

This does exactly what it sounds like. Instead of reading the counter with `this.state.counter` (which we know could introduce problems), we use the previous state via `prevState`. This way, we're **guaranteed** that our two increments happen.

That doesn't change the fact that an immediate `this.state.counter` is ambiguous, but it does mean that *eventually*, both `+1`'s are going to happen! Nice!

More broadly, what we've just found out is `this.setState` can take a function as a parameter: it will call the function with one argument, the previous state, and you can generate an object as you wish.

## The React Component Lifecycle

This is a bit of a complicated topic, so we'll cover the more simplified version. Broadly, "Lifecycle Actions" is a process of actions that *all components undertake* - i.e., they're part of `React.Component`. Understanding the lifecycle can help you write efficient code!

Here's a graph that explains everything relevant in this note:

![React Component Lifecycle diagram](images/lifecycle.jpg)

There are three different types of actions: **mounting**, **updating**, and **unmounting**:

* **mounting** is when a component is first added to the DOM (the webpage). Sometimes, this is when the app is first loaded, but this also might be in the middle of the app (e.g. you show a component because a user clicked a button). A component only mounts *once* in its lifecycle.
* **updating** usually only happens when either the `props` of the component change, or `this.setState` is called (for our case, we will ignore `forceUpdate`). This can happen many many times for one app!
* **unmounting** happens as the component leaves the DOM: either when the page is exited, or the component is removed from the view (e.g. because the user hit a button)

The diagram has some extra events, but we're only going to focus on a few concepts:

* like we'd expect, the `constructor` of any component is only called *once* in its lifecycle, right when it's mounted. Note that it's called before the render function!
* the gist of `getDerivedStateFromProps` is that we do some processing and create all the variables we need to render our app!
* then, `render` is called! The computer does some beep bop work (like creating variables, calling functions, etc.), **then** updates the DOM.
* after that, we *then* have access to two different lifecycle functions: `componentDidMount` and `componentDidUpdate`.

These two functions, along with `componentWillUnmount` (which, as implied, gets called when the component will be unmounted), are React lifecycle functions. This means that we can overload our components with functions with these names, and **React will call them at the right time for us**.

This is a very useful concept! The most common pattern you'll see these in action is some sort of **subscriber-unsubscriber** pattern, or when we want to "run things in the background". Let's take a look at a pseudo-code example:

```jsx
class SomeRandomComponent extends React.Component {
  componentDidMount = () => {
    this.props.setUpBackgroundTask();
    this.cleanupFunction = somethingFromTheTask();
  }
  ...
  componentWillUnmount = () => {
    this.cleanupFunction();
  }
}

...
<SomeRaondomComponent setUpBackgroundTask={...}>
```

As you can see, we defined two functions that *exactly matched the name* of our mount and unmount lifecycle functions. Our `componentDidMount` "sets up" our background task. As we saw the chart, `componentDidMount` is called **after** the constructor is called, so we can safely use `props`, `state`, etc.

Then, we "clean up" our resource in `componentWillUnmount`. Our reference to `this` and by extension, `props` and `state` is still valid (though you shouldn't call `this.setState()`).

There are tons of examples of this (especially with database and API transactions), but we haven't really delved into any of those yet. However, when you do, you should remember to use this pattern!

Here's a real code example to keep you busy in the meantime:

```jsx
class SalesCounter extends React.Component {
  state = {
    sales:0
  }
  componentDidMount = () =>{
    this.cleanup = setInterval(() => {
        let random = Math.floor(Math.random() * 100);
        this.setState((prevState) => {
            return {sales: prevState.sales + random};
        })
      }, 250);
}

componentWillUnmount = () => {
    clearInterval(this.cleanup);
}
```

A quick explanation: this code increments `sales` by a random number every `250ms` (or 1/4th of a second). We do this by running a function in the background with `setInterval` - but, when our component unmounts, we want to "clean it up) and stop the interval.

If you pay attention, we also used our knowledge of lambda functions here! Isn't it beautiful how everything comes together?

## Functional Programming in React

We've briefly mentioned that "functional programming" is a popular thing to do in React. This doesn't replace an FP course at all (and you should consider taking CS 131 early, since it teaches these concepts and is very helpful for interviews, writing clean code, etc.), but here's a sneak peek into some FP concepts.

### Events, Handlers, and Forms

We briefly touched over how to use events last time, but let's make sure we have a solid understanding! We think the [React documentation example](https://reactjs.org/docs/handling-events.html) is pretty good, so we're mostly going to steal it:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

We've actually taken advantage of quite a few features that we've discussed:

* arrow functions (which are really important here)
* function pointers
* the `prevState` function for `setState`
* the ternary operator in JS (we covered this in a video)

So, what actually happens when the user clicks the button?

1. The "on click" event is fired.
2. React calls the function that "handles" the event, which we specified to be `this.handleClick`. It turns out that React actually provides an argument here (the event), but we don't care about it.
3. Inside `this.setState`, our `prevState` function flips the value of the `isToggleOn` field.
4. Then, `this.setState()` is completed, and the state is updated!

You'll use this pattern *all the time*, in almost any situation where we get user input.

There's a quick extension here with regards to forms. Again, we're going to rip the [React documentation example](https://reactjs.org/docs/forms.html), since it's a great demonstration:

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

This one's a bit more complicated, and exposes what we call a **single state of truth** design pattern. What does that mean? Well, let's take a look at the `<textarea>` element (which is a large paragraph form input):

* we've set the `value` prop to always equal `this.state.value`. This is the first part of "single state of truth": the correct value of the `textarea` (e.g. the text in the box) is always **controlled by the state**. Dystopian.
* next, we've used an `onChange` event listener + handler, which behaves very similarly to the `onClick` method we looked at earlier.
* let's take a quick look at `handleChange` - we'll notice that here, we actually care about the argument passed to the function. In particular, we look at `event.target.value`, which is the value of the target of the event - or the value of the `textarea`. This is the other part of the "single state of truth": every time the user types in text, it **always updates the state**.

Now, you might think that this is a bit strange - why don't we just let the `textarea` update itself? It turns out, this method is the best way to fully control your app, and **guarantee consistency**, which is important!

Something very similar is happening with the `form` and `onSubmit` + `handleSubmit`. The `event.preventDefault` prevents the default action of submitting the form, which usually refreshes the page.

This pattern is a little trickier to remember, but equally as important and popular! If you use any user input at all in your app, you'll want to use what we've just discussed (though there's no shame in Googling every now and then, everybody does it)!

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

You can also use it with much more complicated components, and with ones you've made yourself! We'll leave this part up to your imagination (and totally not because we're lazy).

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
  deleteMessage = index => {
    ...
  }
  render = () =>{
    return (
      <div>
        {
          this.state.messages.map((message, i)=>{
            return (
              <Message
                key={i}
                author={message.author}
                content={message.content}
                date={message.date}
                deleteFunc={() => this.deleteMessage(i)}
              />
            );
          })
        }
      </div>
    )
  }
}
```

This should be relatively self-explanatory - we're passing down a function that deletes an individual message down to the message component itself. The key thing is that we needed to use an arrow function, since we wanted to pass a *reference to a function* as the prop, but *also wanted to specify the argument*. This is the hardest part to remember about this pattern, but if you've got it, you're golden!

### Hooks

Looks like we're running out of space. We're just going to tell you that there's this new sexy feature called [Hooks](https://reactjs.org/docs/hooks-intro.html) that are an alternative to using `setState()` with functional components. They're actually... super awesome, just a bit tricky to explain - so we didn't do it this time around. But, you should definitely check it out if React is something that you're interested in!

## Resources

We *highly recommend* [React's own "Main Concepts" tutorial](https://reactjs.org/docs/hello-world.html).

React:

* [Components and Props (React)](https://reactjs.org/docs/components-and-props.html)
* [State and Lifecycle (React)](https://reactjs.org/docs/state-and-lifecycle.html)
* [Handling Events (React)](https://reactjs.org/docs/handling-events.html)
* [Lists and Keys (React)](https://reactjs.org/docs/lists-and-keys.html)
* [Forms (React)](https://reactjs.org/docs/forms.html)
* [Composition vs Inheritance (React)](https://reactjs.org/docs/composition-vs-inheritance.html)
* [Thinking in React (React)](https://reactjs.org/docs/thinking-in-react.html)
* [Higher-Order Components (React)](https://reactjs.org/docs/higher-order-components.html)
* [JSX in Depth (React)](https://reactjs.org/docs/jsx-in-depth.html)
* [Optimizing Performance (React)](https://reactjs.org/docs/optimizing-performance.html)
* [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)

Javascript:

* [this (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
* [Strict mode (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
* [Classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [class (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class)
* [Arrow function expressions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)