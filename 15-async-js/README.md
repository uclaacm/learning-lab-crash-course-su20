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
  * [Fetch with React](#fetch-with-react)
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
          this.state.pokeAbilities.map((ability) => {
            <div>
              ability name: {ability.name} ...
            </div>
          })
        }
      </div>
    )
  }
}
```

And hooks:

```jsx
function App {
  const [pokeName, setPokeName] = useState("");
  const [pokeAbilities, setPokeAbilities] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(response => response.json())
      .then(data => {
          setPokeName(data.name); // assuming 'name' is in the JSON field
          setPokeAbilities(data.abilities); // assuming 'abilities' exists too
        })
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

### async/await with React

...

### POST requests with Fetch

So far, we have only explored one portion of the HTTP request space, the `GET` request. There's actually a whole host of possible requests, but the most likely one you'll hear about is the `POST` request.

Long story short, the `POST` request lets you add parameters to your call. This is really useful when you need to communicate things to an API, or the endpoint that you're reaching needs some extra information to give you what you're looking for. There is also a semantic definition as to *when* you're supposed to use a `POST` request versus a `GET` request, but usually, the developers of the API make that decision, so you don't have to worry!

We won't go over the intracacies of `POST` requests, but we can walk through a quick example: let's say we're making a request to the Spotify API to create a new playlist for a user.

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

## Appendix: Callbacks

## Appendix: The JS Event Loop

## Further Reading

* [Using Fetch (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [async function (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
