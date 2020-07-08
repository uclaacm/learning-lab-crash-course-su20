# Intermediate CSS: Animations

## Overview

## The Basics

...

Keyframes may not sound very powerful, but you can do a lot with them! Check out [this demo of Animate.css](https://animate.style/), a pure CSS animation framework, to see more!

### An Aside: Animation vs. Transition

## How the Pros Do It

### JS & CSS

* [anime.js](https://animejs.com/) is one of the most fleshed-out and popular JS-based animation frameworks. You need to check this out!
* [Micron.js](https://webkul.github.io/micron/) is a liteweight "microinteraction" library that uses JS & CSS animations to create small but pleasing interactions.

### The After Effects Pipeline

Sometimes, anime.js still isn't enough to cut it. Maybe you want to draw a custom scene, use shaders, or any sort of VFX.

This is where [Adobe After Effects](https://www.adobe.com/products/aftereffects.html), the industry standard for motion graphics and visual effects work, comes in.

But, how can you render a video made in After Effects efficiently? The short answer is, you don't - videos are large file formats that are hard to size. However, Airbnb has come up with a creative (and open-source) solution: write a library (called [Lottie](https://airbnb.io/lottie/#/)) that converts After Effects animations directly into CSS. Lottie is usable on both websites and mobile apps, and it allows you to create some truly stunning visuals.

The learning curve for this is huge. 