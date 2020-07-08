# A Brief Flyover of CSS Frameworks

## Overview/Table of Contents

With Matt, we'll cover how to use popular CSS frameworks like, and their pros and cons:

* [Overview/Table of Contents](#overviewtable-of-contents)
* [How to Import a CSS Framework](#how-to-import-a-css-framework)
* [Bootstrap: a primer](#bootstrap-a-primer)
    * [an aside on jQuery](#an-aside-on-jquery)
    * [tl;dr](#tldr)
* [Bulma: a primer](#bulma-a-primer)
    * [tl;dr](#tldr-1)
* [Tailwind: a primer](#tailwind-a-primer)
    * [tl;dr](#tldr-2)
* [Some Other Frameworks &amp; Tools](#some-other-frameworks--tools)
* [Final Thoughts](#final-thoughts)

## How to Import a CSS Framework

If you read one thing in this document, it should be this. How would you import any CSS framework?

The answer is exactly like how you'd import your own CSS file. Simply create a `<link>` tag, and point it at the library file!

You have two options:

* host the framework yourself
* use a CDN (content delivery network) <- usually better

Hosting the framework yourself is exaclty what you might imagine.

```html
<html>
    <head>
        <link rel="stylesheet" href="/PATH/TO/YOUR/FRAMEWORK" />
    </head>
    ...
```

Just download the file, plop it in a folder, and put the path in your `head`. Simple enough!

Okay, but why is a CDN better? A **Content Delivery Network** is a fancy term that really means somebody else put lots of effort to *deliver* your *content* very quickly. We won't go into too many details, but basically, the CSS framework is stored somewhere else - when a user boots up your page, their computer makes a request to the CDN to pick up a copy of the framework.

...

## Bootstrap: a primer

### an aside on jQuery

### tl;dr

* Bootstrap is probably the **most popular CSS framework**. That means there's lots of examples, themes, and StackOverflow questions on how to use it!
* Bootstrap is a huge project! Specifically, it has many **custom components**, its own **icon set**, and custom (but mandatory) **Javascript tools** (among other distinct features).
* Because Bootstrap is so big, you **need to import many large files**.
* Bootstrap is easily customizable with **SASS**.
* There are lots of libraries that add-on to Bootstrap, or implement Bootstrap in React/Angular/Vue/etc.
* Since *so many people use Bootstrap*, the default theme doesn't look very unique.
* Bootstrap has a veteran release time behind it. You'll rarely find bugs, they cover lots of accessibilty use cases, and when needed, they iterate and bugfix quickly.

## Bulma: a primer

### tl;dr

* Bulma is another **wildly popular CSS framework**, which means that there's a solid community (including plugins) for it!
* Unlike Bootstrap, Bulma is **CSS only**: you aren't importing jQuery, Popper, or a custom JS file.
* Bulma is also lighter than Bootstrap: it has less out-of-the-box components (like a carousel), which can be good or bad!
* Bulma is also easily customizable with **SASS**.
* Bulma is open-source, but is still primarily developed by one person - that makes it slower to update than Bootstrap.

## Tailwind: a primer

### tl;dr

## Some Other Frameworks & Tools

Here are some other cool things you can look into if you're interested:

* [Font Awesome](https://fontawesome.com/) is probably the web's most popular standalone icon framework! It has a free and a paid tier (the latter has more icons and styles)
* [Material Design](https://material.io/design) is Google's design framework, and they have pre-built components, icons, and design layouts made just for you!
* [Tachyons](http://tachyons.io/) is a cool CSS framework that also supports CSS variables with a simple plugin!
* [Semantic UI](https://semantic-ui.com/) is another very popular Bootstrap-like CSS & JS component framework.
* [Water.css](https://watercss.kognise.dev/) is a CSS framework that only modifies element tags (it introduces no classes). It's very useful when you're making generated HTML content.
* [instagram.css](https://github.com/picturepan2/instagram.css) implements Instagram filters in CSS.
* [loaders.css](https://connoratherton.com/loaders) is one fun collection of CSS loading animations
* [Highlight.js](https://github.com/highlightjs/highlight.js) is a JS framework that can help you do automatic syntax highlighting with CSS classes! To use it, you don't need much JS knowledge, so have no fear!

## Final Thoughts