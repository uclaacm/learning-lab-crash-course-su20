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
  * [Promises and then](#promises-and-then)
  * [catch](#catch)
* [Working Through Examples](#working-through-examples)
  * [Fetching a Resource](#fetching-a-resource)
  * [Fetch with React](#fetch-with-react)
  * [POST requests with Fetch](#post-requests-with-fetch)
* [Quick Summary](#quick-summary)
* [Appendix: Callbacks](#appendix-callbacks)
* [Appendix: The JS Event Loop](#appendix-the-js-event-loop)
* [Further Reading](#further-reading)

## What is Async?

Matt is very tired and not good with words, so instead of writing his own to explain asynchronous code, he will borrow them from [Eloquent Javascript](https://eloquentjavascript.net/11_async.html) (which by the way, is a great learning resource):

> In a *synchronous* programming model, things happen one at a time. When you call a function that performs a long-running action, it returns only when the action has finished and it can return the result. This stops your program for the time the action takes.
>
> An *asynchronous model* allows multiple things to happen at the same time. When you start an action, your program continues to run. When the action finishes, the program is informed and gets access to the result (for example, the data read from disk).
>
> In a synchronous environment, where the request function returns only after it has done its work, the easiest way to perform this task is to make the requests one after the other. This has the drawback that the second request will be started only when the first has finished. The total time taken will be at least the sum of the two response times.

Yeah, I mean, that's really it! But really, we're exposing one of the largest paradigm shifts in learning programming: your code is no longer "sequential" (i.e. run line-by-line), and now we have timelines all over the place! Things can get very confusing, but for our purposes, we'll try to keep it as simple as possible.

And why are we looking at asynchronous programming? Well, it powers almost all of modern computing. Without asynchronous programming, websites would take forever to load, computers could only run one application at a time, and phones would be practically useless. We couldn't even consider things like complex servers, graphics cards & video games, or the internet as a whole. A nebulous claim, but one that's very true.

When we talk about asynchronous programming, there are a lot of terms thrown around. Here are a few that we'll use (other than the ones we gradually introduce):

* **synchronous**: happens one-after-another
* **asynchronous**: things do not necessarily happen one-after-another. Importantly, **this is not the same as multithreading**
* **blocking**: the program is being "blocked" by something, or is waiting for something; it cannot proceed
* **non-blocking**: the action doesn't block the program (often by using asynchronous methods)
* **threads**: well... it's complicated. don't worry about this for this note, since **Javascript doesn't use multithreading**
* **API** (Application Programming Interface): an exposed interface that lets you interact with a system. Web APIs form the backbone of the internet: it's how frontends (i.e. a website) can get information from backends/databases.
* **HTTP Request** or simply **request**: one way to get things from a web API. There's a lot more to unpack here, but for now, imagine that you pass in a URL and maybe some parameters, and then you get something back.

And... **multithreading**? Well, it's kind of out of scope, so we won't cover it today. But feel free to [check out the Wikipedia page](https://en.wikipedia.org/wiki/Thread_(computing)#Multithreading) for more information!

## First Steps: Using fetch

Before we really dive deep into asynchronous programming in Javascript, let's start with a quick example:

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

### Promises and then

When I said I promise, I meant it!

A **Promise** is a special type of object in JS that will eventually be **resolved** or **rejected** (or in other words, will eventually be successful or fail). The key word here is *eventually*: we may check on whatever the Promise is, and find out that it's still waiting for either of those states to exist. So far, this should make sense: if we make a request to an API, and check on the status of the API, it may have not been completed yet!

However, a Promise gives us a very useful API to do something after something is done, with the `.then()` function. We saw this earlier in our example:

```js
fetch('https://teachla.uclaacm.com/accountability/budget-19-20.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // we do some data processing here
  })
console.log("would this get logged before or after data?");
```

Here, the first `.then` is chained to the `fetch` function (which, as you may have guessed by now, returns a Promise). **Once the Promise is "resolved"** (aka **the request is successful**), then whatever is passed to `.then` is called; as we guessed above, the parameter is a function! And the function gets something from the `fetch`, in this case, the response from the HTTP request.

The next chained `.then` is chained to the previous `.then`. And you can continue on chaining `.then` functions, as each `.then` functionally returns a new Promise object that you can spy in on.

One other important distinction is that it's almost guaranteed that `"would this get logged before or after data?"` gets logged before the response data. Why is this? Well, `.then` is **non-blocking**. What that means is, after we call `fetch` with its `.then` functions, we just keep on executing our code; the argument to `.then` only gets called once the `fetch` is done! And unless the `.fetch` takes less than the delay to log something to the console (unlikely), our `"would this get logged before or after data?"` log wins out first! This is an important idea behind `.then` - that it's non-blocking!

This is probably all you need to know about Promises from a developer-based perspective when you just start out coding basic web applications. The critical idea, in sum, is that the argument passed to the `.then` of any Promise gets called **after the Promise succeeds**!

Now you might be wondering, what does this have to do with `async/await`? Well, it turns out, you can `await` a Promise; and here, we'll also see the `resolve` keyword in play. Let's take a look at this example graciously provided by the MDN:

```js
function resolveAfter1Second() {
  console.log("starting fast promise")
  return new Promise(resolve => {
    setTimeout(function() {
      console.log("fast promise is done")
      resolve("fast was resolved!")
    }, 1000)
  })
}

async function sequentialStart() {
  const fast = await resolveAfter1Second()
  console.log(fast)
}

// somewhere later

sequentialStart();
```

First, for your convenience, this is what'll get logged to the console (though the ordering may be off, because, async):

```
sequentialStart()
starting fast promise
fast promise is done
fast was resolved!
```

Okay, so what's going on here? Let's start with `resolveAfter1Second()`:

1. First, note that this function **is not `async`**. There's no reason for it to - we don't use `await`!
2. Second, note that this function returns a `Promise`. We're creating one with `new` and the `Promise` constructor.
3. Note what we pass to the `Promise` constructor: it's a function! And in this case, this function takes in one parameter, called `resolve` (we'll later see a two-parameter version).
4. The function that we pass to `Promise` calls `setTimeout`, which just means "do something after X milliseconds"; in this case, after 1 second, it'll call its argument! And we're passing it another function (see why we said you need to know your functions)!
5. Essentially, all that's done is `resolve` is called. We can now infer that the argument `resolve` is a function, and it takes in one argument; we've passed it "fast was resolved!".

Putting it all together: `resolveAfter1Second()` does exactly what it sounds like: it returns a `Promise` that resolves after exactly one second. We'll see what the `resolve` argument does in a moment.

Okay, we're almost done! What about `sequentialStart()`?

1. First, note that this function **is `async`**. That's because we make use of the `await` keyword!
2. Now, we set `fast` to `await resolveAfter1Second()`. Note that it's a `const` - which reinforces that what the `await` returns only assigns once.
3. Okay, and what about this `await resolveAfter1Second()`? Well, we're going to await the resolution of `resolveAfter1Second()`; **our code will synchronously block until the Promise resolves**, and the finally "complete" the assignment to `await`. In this case, this should take exactly one second.
4. Then, we log what we get from the Promise. And now, we see what the argument to `resolve` does - it's the return value given by the `await` expression!
5. And, just to be safe, we log what we get.

There's obviously a lot of complexity going on here, and there's even more that we haven't discussed. However, hopefully this gives you a good primer on `async/await`, promises, and `.then`. The key difference that we've seen so far is that `await` blocks execution, while `.then` doesn't - execution continues after, and the Promise gets resolved whenever we want.

One last thing for you to mull over: according to an MDN example, these two functions are the same thing:

```js
async function foo() {
  await 1
}

function foo() {
  return Promise.resolve(1).then(() => undefined)
}
```

Can you explain why?

### catch

Okay, so now we know how to handle things if our request works. But what if it doesn't? What do we do there? What's the... catch?

That's where our friend `.catch()` comes in. `.catch()` is very similar to `.then()`, but instead of calling its argument after the Promise resolves (succeeds), **it calls its argument after the Promise is rejected** (or fails). Let's take a look at an example:

```js
fetch('https://teachla.uclaacm.com/this/file/does/not/exist')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // we do some data processing here
  })
  .catch(e => console.error(e))
```

Wow, looks *really* similar to `.then()`. But, taking a look at the URL, we can guess that the file doesn't exist. When this happens, we'll usually get a `404` code from the HTTP request, which is an error. And that's where our `catch` statement comes in! We'll "catch" the error, and send an error to the console (`e` is an Error Object provided by HTTP requests/the `fetch` API, but I wouldn't worry about that for now).

Again, this is probably the extent of `.catch` that you'll use as a beginner developer. The important thing to know is that if the Promise fails, at any step of the `.then()` chain, then we'll `.catch()` it and do something instead! In fact, you can intersperse `.then()` and `.catch()`:

```js
new Promise(resolve => {
  console.log('Initial');
  resolve();
})
.then(() => {
  throw new Error('Something failed');
  console.log('Do this');
})
.catch(() => {
  console.error('Do that');
})
.then(() => {
  console.log('Do this, no matter what happened before');
});
```

But okay, what if we want to delve a little deeper? How does this work with `async` and `await`? I won't delve too deep into the details into the interest of length, but here are excerpts from an MDN example: I encourage you to use a similar function-analysis approach we took to the above `resolve` example, and try it here!

```js
function rejectAfter1Second() {
  console.log("starting fast promise")
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log("fast promise failed :(")
      reject("fast was rejected!")
    }, 1000)
  })
}

async function sequentialStart() {
  const fast = await rejectAfter1Second().catch(error => console.error(error))
  console.log(fast) // hint: this returns undefined
}

// somewhere later

sequentialStart();
```

## Working Through Examples

Let's work through a few examples that explain how we'd use `fetch` and other `async` ideas in our day-to-day developer life.

### Fetching a Resource

The most basic example is a simple `GET` request (in the larger set of possible HTTP requests). `GET` requests are, well, you **get**ting something. But in particular, it means that all the service really needs to know is the path to the resource, no extra options required!

When you call `fetch` with just a URL, you make a `GET` request by default. Remember this example, from earlier?

```js
fetch('https://teachla.uclaacm.com/accountability/budget-19-20.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // we do some data processing here
  })
```

This is actually a `GET` request! Under the hood, our browser is making a request to some server to get the `budget-19-20.json` file. If we get it, we can then decode the response as a JSON file (which in this case, we knew to do because... the file is a `.json` file), and then parse the data and do something with it.

Normally, you typically use `GET` for text (e.g. a `.json` file, `.yaml`, `.txt`, `.csv`, etc.). But, you can `GET` all sorts of things!

```js
// fetching a CSV file, and parsing it
...


// fetching an .... image?
fetch('https://teachla.uclaacm.com/img/team/mwang.jpg')
  .then(response => response.blob()) // this has to do with interpreting the response as a "blob"
  .then(image => {
      localImageURL = URL.createObjectURL(image)
      document.getElementById('img-container').innerHTML = `
        <img src=${localImageURL} ... />
      `;
  })
```

### fetch with React

We can also use `fetch` in React. Here's a very basic example (with class-based components):

```jsx

class App extends React.Component {
  state = {
    pokeName: ""
  }

  onButtonClick = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(response => response.json())
      .then(data => {
        this.setState({
          pokeName: data.name, // assuming 'name' is in the JSON field
        })
      })
  }

  render = () => {
    return (
      <div>
        <button onClick={this.onButtonClick}>get ditto's name</button>
        <p>
          the name of ur pokemans: {this.state.pokeName}
        </p>
      </div>
    )
  }
}
```

And the same example, with the state hook (if you're rusty, you can check our [hooks lesson](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/11-react-hooks) or [the React tutorial](https://reactjs.org/docs/hooks-intro.html))

```jsx
function App() {
  const [pokeName, setPokeName] = useState("");

  function onButtonClick() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(response => response.json())
      .then(data => {
        setPokeName(data.name);// assuming 'name' is in the JSON field
      })
  }

  return (
    <div>
      <button onClick={onButtonClick}>get ditto's name</button>
      <p>
        the name of ur pokemans: {pokeName}
      </p>
    </div>
  )
}
```

Note that we didn't need to explicitly define `async/await`, since we're never actually writing blocking code! Part of the beauty of this has to do with the arrow functions that pass the "context" of `this.setState` beautifully (which has to do with a concept called closures), but suffice to say, it's not too tricky.

Another common use-case is to make a `fetch` request *as soon as the component loads*. This is especially useful if the main driver of your web app is externally-derived information (e.g. a database). We can do that with class-based components and lifecycle functions, or functional components and effect hooks.

With class-based components:

```jsx
class App extends React.Component {
  state = {
    pokeName: "",
    pokeAbilities: []
  }
  componentDidMount = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(response => response.json())
      .then(data => {
        this.setState({
          pokeName: data.name, // assuming 'name' is in the JSON field
          pokeAbilities: data.abilities, // assuming 'abilities' exists too
        })
      })
  }
  render = () => {
    return (
      <div>
        <h1>the abilities for {this.state.pokeName}</h1>
        {
          this.state.pokeAbilities.map((ability) =>
            <div>
              ability name: {ability.ability.name} ...
            </div>
          )
        }
      </div>
    )
  }
}
```

And hooks:

```jsx
function App() {
  const [pokeName, setPokeName] = useState("");
  const [pokeAbilities, setPokeAbilities] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(response => response.json())
      .then(data => {
          setPokeName(data.name); // assuming 'name' is in the JSON field
          setPokeAbilities(data.abilities); // assuming 'abilities' exists too
        })
  }, []); // this [] means to only do it once!

  return (
      <div>
        <h1>the abilities for {pokeName}</h1>
        {
          pokeAbilities.map((ability) => {
            <div>
              ability name: {ability.name} ...
            </div>
          })
        }
      </div>
    )
}
```

The `[]` is part of [this feature of the Effect hook](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects).

Also, as a sidebar: React has many asynchronous functions built-in (as ... most code)! For example, `this.setState()` is asynchronous, and technically, all component lifecycle functions, hooks, and any other exposed React functions are all asynchronous to some extent!

### POST requests with Fetch

So far, we have only explored one portion of the HTTP request space, the `GET` request. There's actually a whole host of possible requests, but the most likely one you'll hear about is the `POST` request.

Long story short, the `POST` request lets you add parameters to your call. This is really useful when you need to communicate things to an API, or the endpoint that you're reaching needs some extra information to give you what you're looking for. There is also a semantic definition as to *when* you're supposed to use a `POST` request versus a `GET` request, but usually, the developers of the API make that decision, so you don't have to worry!

We won't go over the intricacies of `POST` requests, but we can walk through a quick example: let's say we're making a request to the Spotify API to create a new playlist for a user.

According to [the Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-create-playlist), to make a new playlist, we **have to include the playlist's name**. That makes sense to me.

If we were to write a simple fetch request, it would look something like this:

```js
async function createSpotifyPlaylist(playlistName) {
  const url = 'https://api.spotify.com/v1/users/{user_id}/playlists';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '....', // this is a secret!
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(
      // how do i know what to put here? check the spotify docs!
      { name: playlistName }
    )
  });
  return response.json();
}

createSpotifyPlaylist('amperes')
  .then(data => {
    console.log(data); // a response telling us if it was successful, information about the playlist, etc.
  });
```

Wow, that looks like a lot! But really, we haven't done too much different from our previous example: all we've done is use the second (optional) argument of `fetch`, which allows us to specify more information about the request. It takes in an object, with many complicated parameters (you can see [the full list for yourself, if you'd like](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)), but usually this is more than enough for what we need. What's important to note is the `body` key, where we put a "stringified" version of our data. Basically, we convert our data (in this case, our playlist name) into a string, and then send it to the server - you'll do this all the time with `POST` requests.

Other than the new options, everything else is the same! We're still using `async` and Promises. You can integrate this into React, and use any other tricks that you normally use when you write clean, awesome, maintainable JS code!

## Quick Summary

Okie dokie! In this note, we answered some core questions:

* how does `async`/`await` work in JS?
* how do Promises, `.then()`, and `.catch()` work in JS?
* how are `async`/`await` related to Promises? How do they differ?
* what is `fetch()`?
* how do we run asynchronous code in React?

This is a **very powerful toolkit** in your web development experience, as it lets you interact with the outside world of APIs and servers, and also write very performant code. However, it can also introduce headaches! Race conditions aren't in common in front-end web development as other software paradigms, but they still happen! And there are many intricacies that we didn't have time to cover today.

## Appendix: Callbacks

You will often hear of "callbacks" when discussing asynchronous code in JS. This refers to a paradigm in programming that's basically an application of higher-order functions; I'll let [MDN explain the details](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function):

> A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.
>
> Here is a quick example:

```js
function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);
```

> The above example is a synchronous callback, as it is executed immediately.
>
> Note, however, that callbacks are often used to continue code execution after an asynchronous operation has completed — these are called asynchronous callbacks. A good example is the callback functions executed inside a .then() block chained onto the end of a promise after that promise fulfills or rejects. This structure is used in many modern web APIs, such as fetch().

Before Promises became generally supported by most browsers (don't you think `.then()` is convenient? I do!), almost all asynchronous code had to be written in terms of some possibly-complex callbacks (for example, with the predecessor to `fetch`, [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)).

## Appendix: The JS Event Loop

Okay, so how does asynchronous code *actually work* in Javascript? And... isn't client-side JS single-threaded?

Well, the answer is a bit tricky if you've never dealt with async before. The short answer is: yes, browser Javascript is (usually) single-threaded, and thus doesn't have "multi-threaded" parallelism. Instead, to handle concurrency, it uses a model called an "event loop", which basically is short for "run one thing after another, but break them into *really* small chunks, and between every event, check if any events have happened, and if they did happen, do something that needs to happen when that event happens".

Yikes, that was a not-great sentence. If you're interested in more specifics in JS, you can check out [the MDN docs on the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). One different feature of JS event loops & concurrency compared to other concurrency approaches is that there is no pre-empting, which resolves many concurrency headaches! [Node.js implements concurrency in the same way](https://nodejs.org/en/about/), boasting very cool concurrency benefits such as no deadlock (no locks!), minimal kernel/OS interaction, and almost completely guaranteed non-blocking code.

## Further Reading

* [Using Fetch (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [async function (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [Using Promises (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
* [Promise (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Callback functions (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
* [Concurrency model and the event loop (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
