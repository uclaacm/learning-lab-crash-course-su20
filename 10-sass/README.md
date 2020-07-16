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

```scss
$my-favorite-color: rgb(83, 192, 255);
$my-font-size: 50px;
```

Using them in our CSS is just as easy!

```scss
h1 {
    color: $my-favorite-color;
}
```

There is a CSS counterpart to this. It's a little bit more ugly than its SASS counterpart (you'll notice this theme as we go through our examples), but still gets the job done without the need for a preprocessor.

```css
:root {
    --my-favorite-color: rgb(83, 192, 255);
    --my-font-size: 50px;
}

h1 {
    color: var(--my-font-size);
}
```

## Math

We can use math **easily** in SASS:

```scss
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

```scss
@for $k from 1 through 10 {
    body :nth-child(#{$k}) {
        color: lighten($my-favorite-color, $k * 5 % 100));
    }
}
```

You might be wondering what that `#` is there for! That is simply used to get the value of a variable inside of a CSS pseudoelement, or to get the value of a variable within a selector.

Imagine having to write this in CSS:

```css
body:nth-child(1) {
    background: var(--my-favorite-color);
}

body:nth-child(2) {
    background: /* some custom color */;
}

/* another 8 of these to go... */
```

## How to use it in Node

To add it to your node project, it's as easy as running `npm install node-sass` in your project directory! Alternatively, you could install it globally.

This will install for us a set of node commands to build CSS files from our SCSS ones.

To build CSS files that will update live as changes are made in development, run `node-sass -w scss -o css`.

## Other neat features

Although there some features getting added to CSS that can stand in for SASS, it still has the leg up on a lot of areas:

### Hierarchical styling

SASS provides a modified style syntax that makes writing hierarchical styles much easier:

```scss
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

This will process down nicely for us to vanilla CSS:

```css
#content h1, #content h2, #content h3, #content h4, #content h5, #content h6, #content p {
  font-size: 50px; }

#content h1 {
  color: #53c0ff; }

#content div h1 {
  color: black; }
```

### Mixins

There are certain properties in CSS that are verbose and teidous to write. These properties often come in bulk when specific browser vendors use specific property names or codes in order to set the values. [SASS' official documentation](https://sass-lang.com/guide#topic-6) uses `transform` as an example:

```css
body {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
}
```

What's great is that SASS lets us write things called **mixins** to deal with these groups of properties:

```scss
@mixin transform($prop) {
    -webkit-transform: $prop;
    -ms-transform: $prop;
    transform: $prop;
}
```

Now, in our SASS, we can just write:

```scss
.upside-down {
    @include transform(rotate(180deg));
}
```

Another application is for making properties easier to use:

```scss
@mixin default-box-shadow($lightness) {
    box-shadow: 2px 2px 2px $lighten(black, $lightness)
}

.dark-shadow {
    @include default-box-shadow(.1);
}
```

### Modules

This is another neat feature. We don't have to write all our CSS in a single file, and can import certain files to others easily with the `@import` keyword.

```scss
// base.scss
$margin-pad: 0;

body {
    margin: $margin-pad;
    padding: $margin-pad;
}

// main.scss
@import './base.scss';

body {
    // we automatically will have no
    // margin or padding.
    font-size: 2em;
}
```

Contrast this to the syntax provided in CSS with `@import`:

```css
@import url('/path/to/my/other/file.css');

body {
    font-size: 2em;
}
```

### Single-line comments

Am I being nitpicky? Absolutely.

In vanilla CSS, every single comment needs to be a multi-line comment. Luckily SASS offers single line comments.

```scss
// much
// better
body {
    margin: 0;
}
```

```css
/* than */
/* this */
body {
    margin: 0;
}
```

# References

Although this guide highlights the big things that one might find useful, there's a **lot** that SASS offers, and it's all super easy to pick up. Just take a look at [their official documentation](https://sass-lang.com/documentation) if you want to review anything this doc covers or learn about what else SASS can do!