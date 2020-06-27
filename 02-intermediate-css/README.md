# Intermediate CSS: The Box Model & Positioning

## Overview

This session and set of notes covers topics in CSS related to layout and positioning. In particular, we discuss:

* What is the "Box Model"? How does that play into how we view websites?
* What are padding and margin? How are they different?
* What is a block element? An inline element?
* What does the CSS position property due? What do the values absolute, relative, and fixed do?
* How does inheritance in CSS work? (note: this will be light)
* What are floats? (note: this will be light)

We'll assume that you have some experience with HTML & CSS, to the extent that was covered in our previous HTML & CSS workshop.

Let's get started!

## The Box Model

The **box model** is a core part of HTML and CSS, and you'll likely hear about it more as you read web documentation, talk to web developers, and do front-end interviews. But what exactly does the box model mean?

The box model says that **every HTML element is really just a box**. Simple, right? But, there's a bit more. In particular, it says that each box is comprised of four (somewhat concentric) rectangles that describe the layout of element. These four rectangles (or areas, zones, parts), are called:

1. The Content Area
2. The Padding Area
3. The Border Area
4. The Margin Area

Before we discuss each of these areas, it would be helpful if we could see a diagram explaining what we mean. Here's one, courtesy of the Mozilla Developer Network:

![MDN example of Box Model](https://mdn.mozillademos.org/files/16558/box-model.png)

Was that confusing? Hopefully not, but let's break each portion down.

### The Content Area

The content area contains, well, your content. By default, the size of this area is determined by the size of your content: a `400px` image will have a content area of size `400px`, and text *generally* fills as much space as possible (though we'll go into this more in a bit). In addition, we've played around with the `width` and `height` attributes: by default, the `width` and `height` attributes only affect the content area. 

This is the easiest area to think about and examine. We can do this with a very trivial code example:

```css
/* CSS file */
.box {
  width: 300px;
  height: 300px;
  background-color: blue;
}
```

```html
<!-- HTML FILE -->
<div class="box">
  I'm a box!
</div>
```

TODO: screenshot of resulting content area

A good question that you might be asking is "what are the default `width` and `height` values for the content area?". That's a *very* good question, and we promise we'll get there by the end of this session.

### The Padding Area

Now, let's throw our next box in. The **padding** of a box surrounds the content area with whitespace. I You can control the `padding` of a box with a set of CSS properties, such as:

* `padding-top: 5px;`, which would add 5 pixels of padding to the top of a content area
* `padding-right: 5px;`, which would add 5 pixels of padding to the right of a content area
* `padding-bottom: 5px;`, which would add 5 pixels of padding to the bottom of a content area
* `padding-left: 5px;`, which would add 5 pixels of padding to the left of a content area
* `padding: 5px;`, which adds 5 pixels of padding to the top, right, bottom, and left of a content area

When we say *whitespace*, we mean that there is nothing there, *transparently*; that is to say, we will display whatever is the background of the element.

Let's also take a look at this with a code example. One very common use case of `padding` is to "pad" some text, to make it more visually appealing.

```css
/* CSS file */
.orange-box{
  background-color: orange;
  width: 200px;
  height: 200px;
}
.padded-box{
  background-color: orange;
  width: 200px;
  height: 200px;
  padding: 10px;
}
```

```html
<!-- HTML FILE -->
<div class="orange-box">
  Why are spiders so good at making websites? Because they're great web developers!
</div>
<br />
<div class="text-box">
  Why are spiders so good at making websites? Because they're great web developers!
</div>
```

TODO: screenshot of resulting padding + content area

The padded box looks better, and it's easier to read! Note that the second box is actually bigger: even though the `width` and the `height` is the same, that only affects our content area: our entire box is actually `220px` by `220px`! 

Also, notice that the space between the inside box and the outside box is orange, the `background-color` of the element. We want to emphasize that the "whitespace" that padding creates isn't always white!

By default, if no `padding` property is specified, the browser will assume that `padding: 0px;`.

### The Border Area

Hopefully, the **border area** should be somewhat self-explanatory: it creates a visible border around your padding and content areas. Unlike padding, border related properties all add some sort of color, and can sometimes add patterns as well.

There are a plethora of different options to customize a border (and we recommend you take a look at some documentation when you have the chance), but for now, we'll examine the `border` property (which is in reality shorthand for `border-width`, `border-style`, and then `border-color`).

This is best explained visually. Let's look at this with another common code example, a simple "card" element:

```css
/* CSS file */
.text-card{
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid black;
}
```

```html
<!-- HTML FILE -->
<div class="text-card">
  I never understood Fifty Shades of Gray - there are at least thousands in RGB color space.
</div>
```

TODO: screenshot of resulting border + padding + content area

Here, the `border: 1px solid black;` is telling us:

* the border should be `1px` wide
* the border should be `solid` (it could also be dashed)
* the border should be `black`

Also, note that the border goes around both the content and the padding! And, the border itself is adding to the size of our box: the total size of `.text-card` is actually `221px` now!

### The Margin Area

...

note: margins collapse!!

### Padding vs. Margin

Often times, you'll want to add some space to your website. You now have two great options in your toolkit: `padding` and `margin`. But, which should you pick?

If you wanted a one-liner, it would look something like this:

> Padding creates space inside an element, while margin creates space between elements.

In general, Matt uses that as a good rule of thumb. However, you'll develop your own internal intuition on which is the right choice to use, and eventually, you'll have more tools in your toolkit to properly space out your webpage. 

### Aside: the `box-sizing` property

...

## `display:inline` and `display:block`

...

## The `position` property

We have now discussed layout and spacing, but how do we determine the position of an element? It turns out, there will be many different ways to do so, but one of the earliest ways to do so was with the `position` property. It has five values:

* `static` (the default)
* `relative`
* `fixed`
* `absolute`
* `sticky`

...

## The `float` property

The `float` property is another CSS property that specifies position. It is used very frequently with objects appearing in the middle of text, like an image. If you've ever struggled with putting an image in-line with text in Microsoft Word or Google Docs, this is for you!

...

At the end of the day, there's quite a bit more to floats (for example, you often have to use clearfixes or the `clear` property). However, we won't spend too much time on them, as floats are used less and less for layouts in favour of solutions like Flexbox or CSS Grid, both of which we'll cover later. It's still important for you to know what floats are, as they're used heavily by popular libraries/frameworks, and you'll often come across them on StackOverflow looking for CSS help.

## Conclusion



## Further Reading

These are tutorials from the Mozilla Developer Network that walk through the concepts we discussed. Reading them isn't required, but they can help consolidate your knowledge and catch details that we might've missed!

* [The box model (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
* [Block and inline layout in normal flow (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow)
* [Introducing positioning (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning)
* [All About Floats (CSS Tricks)](https://css-tricks.com/all-about-floats/)

## Reference Links

These are reference-style documents that go over the concepts we discussed.
