# Task 2: A To-Do List

Hopefully by now, you have an amazing portfolio website to show off all of your content. But, we want to put something on it! You may have some other awesome projects already, but let's do one that lets us practice all of the React skills we're going to learn over the next few days; we're going to make a **to-do list!**

You'll have to bear with us if you've learned React before - this example is almost beaten to death. But, it is for good reason - we'll use almost all of the concepts that we'll learn in making this to-do list.

## Project Specification

Okay, so we want to make a to-do list! Here are core functionalities that most users would expect:

* the ability to create a to-do by name ("e.g. get my life together")
* the ability to "complete" a to-do by ~~striking it through~~
* the ability to completely remove a to-do by deleting it
* the ability to edit the name of a to-do after creating it
* the ability to remove all active to-dos
* the user interface should be easy to use and understand - no tutorial needed!

We'll provide an example that shows one (albeit not-great) implementation. Ours will be restricted by Vanilla JS, which makes certain types of UI/UX decisions hard to implement; your job is to use React to make your life a lot easier!

But, that's any generic to-do list. Here are some features that would help you go the extra mile:

* the ability to rearrange to-dos, either numerically or by dragging
* the ability to search through to-dos
* user-defined to-do categories
* rich text formatting for to-dos (e.g. bold, italicize)
* embedding links in to-dos
* set a time that a to-do should be completed by

### Example Code in Vanilla JS

You can seem this code in action at `example.html` and `example.js`; we did the bare minimum so the project works.

...

Coming soon!

## Getting Started

The easiest way to do this is with `create-react-app`. Like our intro React tutorial, do the following (assuming you have node and git on your computer):

```
$ npx create-react-app to-do-list
...
$ cd to-do-list
$ npm start
...
```

This should start up your default template with `App.js`!

Now, before you do any massive changes, let's take this one step at a time. The first functionality you'll need is creating a to-do, but even that is multiple steps:

1. Put an `<input>` on the screen
2. Create a state for your app
3. Bind the input to the state for your app
4. Introduce some sort of "submit" functionality (e.g. a button, hitting enter)
5. Render the to-do list to your screen

Break up these tasks one by one, and they seem pretty easy! And, with hot module reloading, it'll be quick to see your changes, what went right, and what went wrong.

## Helpful Tips

We recommend that you knock out the specification piece-by-piece: that's usually the easiest way to build any type of software! Here are some tips for each step:

1. Creating a to-do requires you to figure out your app state, and bind an input to an input handler.
2. Completing a to-do complicates your state, and requires you to programatically generate interactive components (e.g. buttons). You may use CSS-in-JS here.
3. Removing a to-do requires you to succesfully update your state.
4. Editing the name of a to-do is a tricky UI problem. What's the most intuitive way to do it, and how would you implement this?
5. If you did (3) properly, a button that removes all active to-dos should be a piece of cake!

What about the stretch goals?

* Re-arranging elements by dragging is tough to implement, though there are libraries that let you do it. Numerically, or with buttons, now that's a lot simpler.
* Searching sounds like something that may involve substrings? Maybe Javascript has functions that help you with that?
* Creating categories complicates your state, but not by too much! This is your first taste of thinking about non-trivial state construction, since you have a few options available.
* The trickiest part with rich text formatting is not actually doing the formatting, but figuring out a way to make it easy for the user! And try not to use unsafe HTML, if possible.
* Embedding links is similarly tricky. A regex might be helpful.
* Times involve the Javascript `Date` library. As a heads up, it seems very intimidating, and its behaviour doesn't always agree with other languages (e.g. the Unix timestamp is in ms, not s); but, after a quick read of documentation you should be good!

## Deploying Your Web App: Netlify

See [the video on deploying to Netlify](https://youtu.be/HH2c3YZZasg) or our [misc devops notes](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/main/14-misc-devops) on how to do this!
