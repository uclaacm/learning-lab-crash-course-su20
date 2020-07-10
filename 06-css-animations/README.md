# Intermediate CSS: Animations

## Overview/Table of Contents

We'll take a *very brief* tour of CSS Animations, and talk about what you can use them for.

* [Overview/Table of Contents](#overviewtable-of-contents)
* [The Basics](#the-basics)
    * [An Aside: Animation vs. Transition](#an-aside-animation-vs-transition)
* [How the Pros Do It](#how-the-pros-do-it)
    * [JS &amp; CSS](#js--css)
    * [The After Effects Pipeline](#the-after-effects-pipeline)
* [Further Reading](#further-reading)

## The Basics

The core of CSS Animations has to do with a concept called a "keyframe". As a fun aside, Matt first learned this when he started learning programming with *Adobe Flash*, which is now essentially defunct software.

Right, back to the point. A [Key Frame](https://en.wikipedia.org/wiki/Key_frame) is a term from film-making and animation that defines a rough set of points for a smooth transition. These are manually picked by a human; but, each frame in-between is automatically filled-in by a computer (or historically, other people). If you pick the right algorithm, you can define lots of animations with only a few lines of code!

In CSS, we can set keyframes for objects with certain property values; the browser's CSS engine will handle everything in-between. Let's look at a dead-simple example (you can view all of these in `animations.html` in this folder):

```css
@keyframes redToBlue {
    from {
        background-color: red;
    }
    to {
        background-color: blue;
    }
}

#simple-square {
    width: 250px;
    height: 250px;
    animation-name: redToBlue;
    animation-duration: 5s;
    background-color: black;
}
```

```html
<div id="simple-square"></div>
```

![animation of square changing from red -> blue -> black](images/simple-color.gif)

Wow, we just dropped a lot on you there. Some notes:

* first, we used the `@keyframes` directive, or "rule". This is a little different than all of the other CSS properties that we've used so far!
* we've named our set of keyframes (i.e. our animation) `redToBlue`
* within `redToBlue`, there are two "objects": `from` and `to`. with these two objects, CSS engines will automatically shift from `from` to `to` automatically!
* in `#simple-square`, we define two animation-related properties: `animation-name`, which we fill in with the name of our animation (`redToBlue`), and the duration via `animation-duration`, which is 5 seconds.
* now, let's examine the behaviour! it goes from a solid red, fading through purple, into solid blue over 5 seconds. **then, the animation stops, and it goes back to the default background color, black**. this is important behaviour!

Hopefully, this made sense at a top-level! If it didn't, no worries - while this is a short lecture/workshop/video/note, we'll link some resources where you can explore more (and... other ways you can do animations).

You can animate many different properties, with more control over timing! Let's take a look at a only slightly-more complex animation:

```css
@keyframes heartbeat {
    0% {
        transform: scale(0.75);
    }

    25% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.75);
    }

    75% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.75);
    }
}

.animated-heartbeat {
    animation-name: heartbeat;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    font-size: 100px;
    display: inline-block;
}
```

```html
<span class="animated-heartbeat">❤️</span>
```

![animation of an emoji heart "beating"](images/simple-color.gif)

Hopefully, you can infer some of the new features that we've just used - generally, we think that CSS does a solid job of naming things. But, just to be clear:

* note that, instead of using `from` and `to`, we set percentage breakpoints for our animation. you can think of `from` and `to` being special cases of `0%` and `100%`
* the CSS property we changed is `transform`, which we haven't encountered before. [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms) are a feature of CSS that, well, let you transform elements - scale, move, rotate, shear, etc.! In this case, as you can see, we're using `scale` - which scales the size of our element!
* Transforms need to be box-positioned, which is why we used `display:inline-block`.
* We added one more animation option to our new class, `animation-iteration-count` - this governs how many times an animation runs before stopping. The default value is `1`, and it accepts any number; however, the `infinite` keyword makes it run forever, which is exactly how much we love you.

In general, there are many, many useful ways you can control animations in CSS. Here are a few other keywords with brief explanations of what they do:

* [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function): what function do you use to fill in the frames in between the keyframes? You could distribute theme evenly, or use a [cubic-bezier curve](https://cubic-bezier.com/)
* [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay): when should your animation start?
* [`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction): should your animation play forward, backward, or alternate (on multiple iterations)
* [`animation-fill-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode) what happens to the element before and after the animation? this has to do with **the square turning black in our first example**
* [`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state) should the animation continue playing, or pause itself? useful to control your animations with Javascript

And, there's a shortform, [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation), that makes your life easier.

This is only enough to dip your toes in CSS animations, but we wanted to show you what is *possible*. If this is the kind of thing that interests you, definitely read more - sinking one or two hours into CSS animations can make you an absolute pro!

We'll leave you with one final relatively simple example, which combines a few of the other topics that we covered (peep that `position: absolute`!) and one we haven't (but you can [read up on it](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)):

```css
.underline-expand {
    font-family: "Arial";
    font-size: 50px;
    display: inline-block;
    position: relative;

    animation-name: text-whiten;
    animation-duration: 0.5s;
    animation-delay: 2.5s;
    animation-fill-mode: both;
}

.underline-expand:after {
    animation-name: underline;
    animation-duration: 1.5s;
    animation-delay: 1s;
    animation-fill-mode: both;

    content: "";
    display: block;
    background-color: #333333;

    z-index: -1;
    position: absolute;
    bottom:  -10px;
    left: -5px;
}
```

```html
<span class="underline-expand">hey there!</span>
```

![animation of an underline expanding under text, then filling the background](images/hey-there.gif)

### An Aside: Animation vs. Transition

Animations have a sister feature called [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions). Functionally, transitions are basically animations that can only change from one state to another, or in other words, as if they had only have two keyframes: `from` and `to`. They do have a slightly different syntax, the types of CSS properties that you're allowed to transition is slightly different, and if your element is *transitionable*, using a transition is probably better for performance. They're most commonly used for hover effects, and, well, page transitions.

We won't really delve into the difference too much, but it's something to keep in mind! You'll likely stumble across lots of code that uses the `transition` keyword, and now you know what that does!

## How the Pros Do It

Pros use keyframes too! But sometimes, there are easier ways to do things.

One is to rely on other people. [Animate.css](https://animate.style/) is one such example, a pure CSS framework that implements animations just like how we did! But, instead of fiddling around with bezier curves, delays, or tiny details, they do it for you. How convenient!

But... what happens when your animations get very complex? For example, look at this animation (courtsey of [Julian Garnier](https://codepen.io/juliangarnier/pen/LMrRNW))

![julian garnier's anime.js demo, concentric circles lighting up on a sphere](images/anime-js-sphere.gif)

or this one ([a demo for Lottie](https://airbnb.io/lottie/#/), by Airbnb)

![a playful animation of the letters "Lottie" being animated](images/lottie-splash.gif)

Okay, clearly, this would be pain to do by hand. So, how do the pros do it?

### JS & CSS

One way to create complex animations is to programatically control them with Javascript. Our favourite, by far, is [anime.js](https://animejs.com/) (the JS library used for the sphere animation). This is one of the most insane open-source web projects out there, with almost limitless potential. It's *so cool*.

There are also React bindings for it as well, so you can use anime in your React apps! Awesome!

Another (much less complex) option is [Micron.js](https://webkul.github.io/micron/) is a liteweight "microinteraction" library that uses JS & CSS animations to create small but pleasing interactions. This is great for button hover effects, little notification alerts, and small text transitions.

One great visual tool that we've heard of (though haven't personally used) is [Keyframes.app](https://keyframes.app/), which provides a UI on top of the types of interactions that these libraries provide. If you enjoy using tools like iMovie, this might be it for you!

### The After Effects Pipeline

Sometimes, anime.js still isn't enough to cut it. Maybe you want to draw a custom scene, use shaders, or any sort of VFX.

This is where [Adobe After Effects](https://www.adobe.com/products/aftereffects.html), the industry standard for motion graphics and visual effects work, comes in.

But, how can you render a video made in After Effects efficiently? The short answer is, you don't - videos are large file formats that are hard to size. However, Airbnb has come up with a creative (and open-source) solution: write a library (called [Lottie](https://airbnb.io/lottie/#/)) that converts After Effects animations directly into CSS. Lottie is usable on both websites and mobile apps, and it allows you to create some truly stunning visuals.

The learning curve for this is huge. You need to learn (and ... purchase) After Effects, which in and of itself is no small task (it's literally people's jobs). Then, you need to create animations tailored for each of your platforms, which often involves different aspect ratios, auto-scaling, and color-correction.

But when you do it well? Damn, it'll look good.

## Further Reading

* [Using CSS Animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
* [CSS Animations (W3Schools)](https://www.w3schools.com/css/css3_animations.asp)
* [Using CSS Transforms (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms)
* [Using CSS Transitions (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)