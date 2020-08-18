# Intro to Backend

While not relevant to your learning labs, Leo walks you through a core part of web development.

What we've been doing up until now is learning skills that build out our **frontend** toolkit. However, like an angler fish, frontend development is the beautiful light that obscures the beast that is often the backend.

Have you ever wanted to build a messaging app, or something with storage that persists beyond localstorage, or something that requires communication between clients? Then you need a backend! In this talk, we will answer the following questions:
* Why do we need a backend?
* Diversity in the backend - why is it neat to work on?
* What are some common backend frameworks and patterns?
* How can I build a backend?
* How can I make my backend work with my frontend?

By the end of this talk, you'll be able to think at a high level about the partitioning of a webapp, and write your own (admittedly basic) fullstack application.

## Why bother?

So why do we even need a backend? There are very clearly [some APIs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) that let us store information for our webapp locally, and we can make requests to other APIs with [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) -- why bother with writing our own backend?

Let's pretend we're writing our own messaging service, or a maps service, or really anything that passes around a large amount of data and/or secure data. We want to make sure that our service is difficult to break into. This immediately explains why we might want a backend.
* Security: it would be dangerous to validate credentials on the client side. This would mean sending credentials over the internet, and leaving them unencrypted on the clientside at some point.
* Storage: it would be inefficient to store images and whathaveyou in the browser. Think about what the point of YouTube is!
* Speed: imagine if all the suggestions for Google Maps were computed on your own computer. How slow would it be?

Hopefully these questions shed some light on why we might want a backend for our webapp: we have some data that we need to keep elsewhere, access elsewhere, or some functionality that isn't guaranteed by a client system.

## Why is it cool?

You may have noticed that one of the points in the lesson breakdown asks "why is it neat to work on?".

One of the main reasons that the person who wrote this README enjoys working on the backend is that there are a lot more ways of doing something. Of course, there are certain things that will always adhere to a particular standard, such as CORS or password hashing and encryption, but for the most part, working in the backend leaves the developer spoiled for choice. We can choose the...
* language we want to work in -- not just JavaScript
* framework, libraries we want to use -- if any at all!
* implementation details of every endpoint
* way we structure our endpoints
* way we optimize functionality for our intended client or end-user

### The language we want to work in

Your backend can be written in any language that you see fit. Now of course there are a few languages that may feel a little counterintuitive to write a backend in (I'm [looking](https://github.com/edicl/hunchentoot) [at](http://bknr.net/html/home.html) [you](https://github.com/evrim/core-server), [LISP](https://www.cliki.net/web%20framework)), but for the most part, you can use whichever language you are most comfortable with. For our lesson, though, we will be using JavaScript simply to adhere to the rest of our lesson.

### The framework, libraries we want to use

As with CSS frameworks, static site generators, and JS webapp frameworks, we can choose the libraries and framework that we wish to use for the backend. There are no wrong decisions in the general case, here. If you made a mistake, it will be in the context of your particular project.

### Implementation details, optimization

Since we are the ones working all the heavy-lifting behind the scenes, we need to make our code performant and airtight. If there are any bugs on the backend, they will propagate directly to the frontend. Likewise, if there are any slowdowns on our end, they will get shot straight out to the frontend as well. It is our job as a backend developer to ensure that the code we write is effective and snappy.

## Backend Vocabulary

When talking about the backend, there's a lot of terms that you'll hear thrown around. Let's define some of the big ones.

### HTTP Methods

We have only spoken about basic HTTP requests that `GET` information from a page so far, but consider, what if we wanted to send some information to a server? Obviously, there must be a way of doing this, since we see that responses from servers often have a body. Then it should follow logically that we can send information in the body of our request, too, right?

Enter HTTP methods, of which there a few that will be of significance for this README:
* `GET`: used to get information from a resource
* `POST`: used to create information at a resource
* `PUT`: used to update information at a resource
* `DELETE`: used to, well, delete information from a resource

### RESTful

REST/RESTful services are a class of server that meet a handful of criteria, as defined [here](https://restfulapi.net/):
* Client-server
* Stateless
* Cacheable
* Uniform interface
* Layered system
* Code on demand (optional)

What this means is that you provide the client a stateless web interface, and then you are in charge of the implementation.

#### Client-server

...

#### Stateless

...

#### Cacheable

...

#### Uniform interface

...

#### Layered system

...

#### Code on demand

...

### GraphQL

If you have to get and retrieve data, and not a whole lot else, consider structuring your backend in accordance with [GraphQL](https://graphql.org/). For a teaser of what things look like on a GraphQL backend:

```json
{
    /* ... */
}
```

Requests are structured in the form of queries modeled after the objects they expect in response. While we won't focus much on this API structure, it is worth investigating!

## Common Backend Frameworks

Since we're going to be working with JavaScript, we will use one of the most popular backend frameworks out there: **express**.

However, if you want to experiment writing a backend in another language, it is just as easy! Here are a few examples of servers and libraries based on language:
* JavaScript: [express](https://expressjs.com/)
* C++: [beast](https://github.com/boostorg/beast), [restinio](https://github.com/Stiffstream/restinio), [proxygen](https://github.com/facebook/proxygen)
* Go: [echo](https://echo.labstack.com/), [gin](https://github.com/gin-gonic/gin)

This said, you actually don't need to use a framework if you don't want to. If you want to remain sane, you really just need a web server and a couple of handlers. It is possible to write a backend completely free of dependencies, just bear in mind that things will get complicated fast.

## Building a Basic Backend

Enough talk! Let's write a basic backend to do something useful for our application. I want to write a **basic** message board, where people can create messages and read messages from other people.

### Prototyping

Before we even start writing code, first we should consider what our API should look like.
* Read some amount of messages from the board --> `GET /message?amt=[number]`
* Create a message on our board --> `POST /message`

### Setting up the server

Now we need to set up the server. This is easy with express:

```js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Started listening at http://localhost:${port}`);
});
```

Let's break down what's going on here:
* We include `express` and `cors` from Node.
* We create an app with the `express()` function.
* We tell the app to use `express.json()` and `cors()`.
* We tell the app to listen for new connections on our provided port and run the provided arrow function.

#### What's CORS?

...

If we try running this, then navigating to our printed URL, we will find that nothing happens. This is because we need to add a **handler** to our app:

```js
app.get('/', (req, res) => {
    res.send('hi!');
});
```

This allows us to create an endpoint at the path `/` on our server, whose function takes a request `req` and a response `res`. It then sends a simple message "hi!" as its response.

Running this, then visiting `localhost:8080`. You'll see that our response is as expected.

### Adding some functionality

Now we need to write some functions to deal with the behavior that we want. We want to save this information somewhere, so let's say that we save it to a file! Thanks to Node, these native I/O operations are possible. In reality, though, instead of a file we would just be writing to a database.

```js
function addPost(message) {
    // ...
}

function readPosts(count) {
    // ...
}
```

### Things that you should check out

Obviously I'm not going to be able to talk about everything in an hour, nor is this tutorial going to be of a great deal of use without supplementary resources. Here are some terms that you should **really know** and think about when writing a backend in the real world:
* Atomicity
* Hashing, salting; password security
* Packet loss, recovery

Here are some resources to help demystify those terms I just threw out:
* ...