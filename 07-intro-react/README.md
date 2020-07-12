# Introduction to React

With Leo and Matt, we will learn all the basics to the model citizen of JavaScript frameworks, React! That might sound like a garbled mess, but I promise by the end of this, you will understand the following:
* How to install node
* What node, NPM, and React are.
* [`create-react-app`](https://github.com/facebook/create-react-app), and how its template is a good demo
* Classes in JS
* Modules in JS
* Render
* State and props
* How to make your own component (with styling)
* Mention Project # 2 (probably a to-do list)

Once you're through with this lesson, you should be able to explain...
* What node and NPM are
* Explain why React is popular
* Bootstrap your own webapp with [`create-react-app`](https://github.com/facebook/create-react-app)
* Create your own components for that React app
* Add dependencies to your app
* Start thinking about how you might write project #2.

## Node and NPM

### What are Node and NPM?

Nodejs is a runtime that brings JavaScript code out of the browser and into your hardware. This enables a wealth of possibilities, as JavaScript code suddenly is enabled to interface with common I/O operations and user-level applications!

NPM stands for **Node Package Manager**. This is the tool used to manage package installation and dependency for Node applications. It has a registry of over 800,000 packages at its disposal.

### How do I install Node (and NPM)?

You can install Node and NPM from a single installer that you can find at the [downloads page of nodejs.org](https://nodejs.org/en/download/).

Installed with defaults, this will install **both nodejs and npm**.

### How do I use node?

Easy enough! Just open up a terminal on your computer and run the command `node`. If it is installed properly, you should be presented with a console:

![running node in the terminal, presenting a less than character for the prompt](images/nodeConsole.png)

Now, we can run any piece of JavaScript code that we might want to from within the terminal:

![running arbitrary console.log calls, passing functions as arguments](TODO)

### How do I use NPM?

NPM is a slightly different story. It is a command that is used to control dependencies of certain packages on other ones.

First, to initialize a package in your current directory, you can use `npm init`. This will lead to a number of questions about what the name of your package will be, the author information, license, and the like. Here's example output of initializing a package in this current folder:

```sh
leo@DESKTOP-HTI57FT:/../learning-lab-crash-course-su20/07-intro-react$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (07-intro-react) 
version: (1.0.0) 0.0.1
description: My first package!
entry point: (index.js) 
test command: 
git repository: git@github.com:uclaacm/learning-lab-crash-course-su20.git
keywords: education
author: Teach LA <acmteachla@gmail.com>
license: (ISC) MIT
About to write to /mnt/c/Users/leonid/Documents/Projects/learning-lab-crash-course-su20/07-intro-react/package.json:

{
  "name": "07-intro-react",
  "version": "0.0.1",
  "description": "My first package!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/uclaacm/learning-lab-crash-course-su20.git"
  },
  "keywords": [
    "education"
  ],
  "author": "Teach LA <acmteachla@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/uclaacm/learning-lab-crash-course-su20/issues"
  },
  "homepage": "https://github.com/uclaacm/learning-lab-crash-course-su20#readme"
}


Is this OK? (yes)
```

To add a dependency to our package, we simply find the name of the package, say, `bulma`, and install it with: `npm install --save bulma`. The `--save` flag saves the dependency to our `package.json` that we just generated with `npm init`.

#### Global installation

You can also install packages to use natively in your own terminal with `npm install -g <packagename>`, where `-g` means **global**. If you're on Linux, you will likely have to use `sudo npm install -g`.

As a nice transition to React, let's globally install the tool we'll use to bootstrap our application: `npm install -g create-react-app`.

## So what is React? Why is it so popular?

React is **a library for building user interfaces. It is declarative, component-based, and "learn once, write anywhere"**. Here's what all those terms mean:
* **declarative**: your code is free to *describe* what it does, rather than implement every little detail.
* **component-based**: your interface will be compartmentalized into discrete components.
* **"learn once, write anywhere"**: your code will work regardless the other technologies you use. Additional features are painless.

### But why is it so popular?

Sure, there are other libraries out there like Vue and Angular (or Svelte), but React has amassed insurmountable popularity primarily because of one feature that it brought to the table:

**React only updates what needs to be updated**

Allow me to reiterate this. This is the thing that made React so popular:

**React will only update what needs to be updated in your interface**

What this means is that if you are running something that handles a ridiculous amount of data, like [Open MCT](https://nasa.github.io/openmct/), every time a new piece of data comes in, you don't have to update every single element of the interface.

Of course, it always helps when your technology is built by Facebook and open-sourced, as well.

## Background: Classes and Modules

We left out two concepts that are essential to modern JavaScript in [our lecture introducing it](../03-intro-js/README.md): **classes** and **modules**. These two will be made extensive use of in Node and React, so let's dig into them first.

### Classes

Recall that the official definition of JavaScript mentions that it is object-oriented. If you've coded in another programming language before, you've likely seen this done many times before. For a quick background, though:

Imagine that we have a number of data points that we want to group together under a single data type. For example, if I send a text message to someone, the data types we'd like to house in a single `Message` type would include the time sent, the time received, the sender, the recepient, and the contents of the message.

Let's mock this up with a class in JavaScript.

```js
class Message {
    constructor() {
        this.timeSent = 0;
        this.timeReceived = 0;
        this.sender = '';
        this.recepient = '';
        this.contents = '';
    }
}
```

Notice that, like Python, we don't declare any data members, but rather that we declare their existence in the class constructor.

...

### Modules

Remember how we mentioned a while back that `namespace` isn't a concept in JavaScript, but there was something *kind of* like it? Enter the world of modules.

JavaScript may not have explicit namespaces, but we *can* export functions and types from specific files to allow for the easy inclusion of our libraries in other scripts. This is the principle that NPM works on!

## `create-react-app`

Recall that we installed an NPM package called `create-react-app` earlier in this lesson that we mentioned we'd use later on. Well, the time has come to use it!

`create-react-app` is a tool made by Facebook that **bootstraps** (sets up) an NPM package with handy scripts, all the dependencies you need, and a sample app for you to get started with! All we need to do to create our app is run:

```sh
create-react-app <folderName>
```

Once this runs, you'll create a new package with all the dependencies for a react app already installed, and a handful of scripts to run, test, and build your app at your disposal.

Let's run the demo. Change directories into the folder we just made, and run `npm start` or `npm run start`. This will begin serving the application on a development server so that we can see what the app looks like at present.

You should get a page that looks like:

![a spinning atom](images/craDemo.png)

Let's investigate how this all works.

## Understanding the `create-react-app` demo

Well, judging by the fact that the webpage tells us to "Edit src/App.js and save to reload.", why don't we do just that?

Navigate in your package folder to [src/App.js](src/App.js). Once in, we can see what it is that React wants us to edit:

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
      </header>
    </div>
  );
}

export default App;
```

Pretty short and sweet! So what does this demo tell us?
* We can return HTML as easily as anything else.
* We can import CSS files and others to our code.
  * Notice we import `./App.css`, and its styles are applied to the component.
  * Notice how we import `logo.svg` as `logo` and then use it later as a value: `src={logo}`.
* Some of our HTML properties exist under a different name.
  * `class` becomes `className`, for example.

### HTML in JS: JSX

The first thing that we mentioned is one of React's great parts. This is something called JSX. It allows us to pass around HTML as easily as anything else in React.

If we are passing it around, though, it needs to all be contained in a single container tag. Notice how our return statement up above wraps it in a `<div>` tag?

...

### Including other files

We can include other files in our React components very easily through `import` statements, just like ES6 modules.

Likewise, we can include modules from NPM.

...

### Things that were renamed

There are a few properties from HTML that have been renamed. That is, there are a few **DOM elements** that have been renamed. Here are example changes from what we've learned for reference:
* `class` -> `className`
* `onchange` -> `onChange`

Notice the trend? **DOM element names have just been made camel-cased**. That's all there is to it! A more complete list (including how inline styling has changed), can be found [here](https://reactjs.org/docs/dom-elements.html).

...

## Creating our own component!

Let's take all that we've learned through this lesson to create two simple React components: a greeter and a caesar cipher encoder.

## Creating a greeter

We can create React components through functions. The easiest way of doing this is by declaring a function that takes a single parameter of `props` and returns some JSX.

```js
function MyComponent(props) {
  return (
    <div className="my-component">
      Hi there { props.name }!
    </div>
  )
}
```

You can actually do a great deal with these **functional components**, thanks in part to anonymous functions in JS. But, as components gain more and more complex behavior, we will want to start using ES6 classes.

## Creating a shifter

### Creating the Class

First, we have to create our class for the component. This means that we have to create a class that extends `React.Component`. It should have a constructor and a render function.

```js
// caesar.js
class Caesar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='caesar-shift'>
        Hey there!
      </div>
    )
  }
}
```

### The `render` function

...