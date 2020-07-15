# Intro to SASS

With Leo, we will learn a little bit about what happens when you take preprocessing principles from compilers and apply them to CSS. The answer is SASS! We'll talk about some of the cool things that SASS can do to make your life easier, and the state of CSS in comparison:
* Variables (and their CSS3 counterparts)
* Math
* Maps
* Loops
* How to use it in a node project

By the end of this, you should understand the basics of SASS, and know how to use it in your static and/or node project!

## What is SASS?

SASS is a preprocessor for CSS. That is, it takes not only plain CSS, but also macros that we write, and then substitutes our macros in to build plain CSS.

It lets us get away with neat things like for loops, math, and variables.

## Variables

We can declare variables for values of CSS properties easily in SASS:

```sass
$my-favorite-color: blue;
$my-font-size: 50px;
```

Using them in our CSS is just as easy!

```sass
h1 {
    color: $my-favorite-color;
}
```

There is a CSS counterpart to this. It's a little bit more ugly than SASS (you'll notice this theme as we go through our examples), but still gets the job done without the need for a preprocessor.

```css
:root {
    --my-favorite-color: blue;
    --my-font-size: 50px;
}

h1 {
    color: var(--my-font-size);
}
```

## Math

We can use math **easily** in SASS:

```sass
h1 {
    font-size: $my-font-size - 2rem * 4;
}
```

CSS is hot on the trail on this one, but the syntax is once again not the prettiest. The vanilla CSS counterpart to this is:

```css
h1 {
    font-size: calc(50px - 2rem * 4);
}
```

## Loops

Here's something that CSS won't have for a good while: for loops! SASS lets us generate repetitive styling or iterative styling with ease:

```sass
@for $k in from 1 through 10 {
    body:nth-child(#{$k}) {
        color: linear-gradient($my-favorite-color, lighten($my-favorite-color, $k * 30));
    }
}
```

You might be wondering what that `#` is there for!

...

Imagine having to write this in CSS:

```css
body:nth-child(1) {
    color: var(--my-favorite-color);
}

body:nth-child(2) {
    color: linear-gradient(var(--my-favorite-color), /* some custom color */);
}

/* another 8 of these to go... */
```

## How to use it in Node

To add it to your node project, it's as easy as running `npm install sass` in your project directory! Alternatively, you could install it globally.

## Other neat features

Although there some features getting added to CSS that can stand in for SASS, it still has the leg up on a lot of areas:

### Hierarchical styling

SASS provides a modified style syntax that makes writing hierarchical styles much easier:

```sass
#content {
    h1, h2, h3, h4, h5, h6, p {
        font-size: $my-font-size;
    }

    h1 {
        color: $my-favorite-color;
    }
    
    div {
        h1 {
            color: black;
        }
    }
}
```

This will process down nicely for us:

...

### Mixins

...

### Modules

This is another neat feature. We don't have to write all our CSS in a single file, and can import certain files to others easily with the `@use` keyword.

```sass
// base.sass
$margin-pad: 0;

body {
    margin: $margin-pad;
    padding: $margin-pad;
}

// main.sass
@use 'base';

body {
    // we automatically will have no
    // margin or padding.
    font-size: 2em;
}
```

Contrast this to the syntax provided in CSS with `@import`:

...

### Single-line comments

Am I being nitpicky? Absolutely.

In vanilla CSS, every single comment needs to be a multi-line comment. I don't know about you, but I think that's pretty gross. Luckily SASS offers single line comments.

# References

Although this guide highlights the big things that one might find useful, there's a **lot** that SASS offers, and it's all super easy to pick up. Just take a look at [their official documentation](https://sass-lang.com/documentation) if you want to review anything this doc covers or learn about what else SASS can do!