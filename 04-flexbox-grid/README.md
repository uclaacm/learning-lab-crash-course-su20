# Intermediate CSS: Flexbox & Grid

[Link to video.](https://www.youtube.com/watch?v=CBR0R50-jGg)

## Overview

In this session, we will learn about two of the most powerful tools in our vanilla CSS toolbox: CSS flexbox and CSS grid. These sibling layouts are perfect for making your website flexible to viewports of all sorts of varied sizes. Here's what we'll chat about today:
* What flex axis v. counteraxis
* Flex align v. justify [content, items]
* Flex grow v. flex shrink
* Flex flow
* CSS grid

By the end of this, you should be able to understand the flex axis and flow of a page. You should understand the differences between aligning versus justifying items and content in a flex container, and how CSS grid works. With this, you should be able to create a navbar for your portfolio.

## Flexbox

### Creating rows and columns; understanding the problem

Let's say I'm a farmer looking to build a neat little website to sell my crops online from. Let's first build our example "product card". For brevity's sake, we'll keep it in pure HTML with a little inline CSS:

```html
<!-- <ProductCard /> -->
<div class='product'>
    <h3>Product Name</h3>
    <img src='path/to/img.jpg' alt='[product name] in bulk' />
    <p>This is my product description</p>
</div>
```

Again, for the sake of brevity, let's call this component `<ProductCard />`. It looks like a fancy new tag name, but in reality it will just serve as a placeholder for where we copy and paste the HTML. Now, we have two ways to lay out our three product cards for corn, wheat, and barley: tables and flexbox.

Let's try table rows first:

```html
<table>
    <tbody>
        <tr>
            <td>
                <ProductCard />
            </td>
            <td>
                <ProductCard />
            </td>
            <td>
                <ProductCard />
            </td>
        </tr>
    </tbody>
</table>
```

Let's look at this on a webpage:

![three template cards for advertising products](images/table.png)

Doesn't look too bad! Let's throw in our content:

![three template cards of uneven height](images/table_uneven.png)

This is where the table layout starts to lose traction. Our cards aren't the same height, and hence not a proper *row*. That's not all, though. Here's a few things to consider:
* Our HTML document is now incredibly difficult to read.
  * This isn't just difficult to read as a dev - think about how screen readers are going to handle reading a **table** - intended to organize data - when we use them for layout purposes. **This leads to poor accessibility**.
* Did you notice our spacing was a little bit more than we bargained for?
  * The default style rules for table elements added on some padding to the interior of the table data elements.
  * We are going to have to write more custom CSS to handle this.
* What if we want certain cards to be bigger than others? For example, what if there's more text on our special promo product card?
* What if the user's device viewport changes? For example, what if a user rotates their tablet?
* What if we need to reorder of our products without changing our source document?

This is where flexbox comes in. Instead of the wealth of tags to create a row of content inside our table, what if I told you we can use just one for the same, if not better effect?

```html
<div style='display: flex;'>
    <ProductCard />
    <ProductCard />
    <ProductCard />
</div>
```

Let's take a peek back at the webpage:

![three template cards of equal height](images/flexbox.png)

**This** is why flexbox is so great. One can easily create rows and columns of content that adjust their dimensions to preserve the row. Further, they can change the way the row or column is organized, spaced, or how its elements are sized all on the fly by changing the value of one or two properties.

As a matter of fact, `<table>`s aren't supposed to be used for layout purposes in HTML5 **at all**, and create a [wealth of problems for accessibility](https://webaim.org/techniques/tables/) that need to be addressed. Instead, we can use flexbox to accomplish our layout goals with less rules, a flatter hierarchy, and more accessible tags with less lines of code.

What can we take away from this change?
* Flexbox forms a row by default
* Flexbox automatically sets all elements to the same height
* Flexbox **displays elements in the order they are listed in the document by default**

Let's learn how to set it up!

### Setting up flexbox

To create a flexbox container, we need to identify our **container** and our **children**. In the case of our storefront, we have created a parent container in the form of a `<div>`. It's children are also `<div>`s:

```html
<div class='container'>
    <ProductCard class='child' />
    <ProductCard class='child' />
    <ProductCard class='child' />
</div>
```

Then, to invoke the flexbox layout on this container and its children, simply specify the property `display: flex;` somewhere in the parent's CSS:

```css
.container {
    display: flex;
}
```

All of its child elements will automatically be considered as flex items.

If we take a page where our cards are organized in the box layout with `display: block;`, the cards will be "stacked" on one another by default:

![square product cards stacked vertically](images/block.png)

But, if we apply `display: flex;`, the visual flow *immediately* changes.

![square product cards put into a row](images/instantflex.png)

That's all there is to it. Let's talk about how to customize the layout, now.

### Critical concepts in flexbox

Before we dig into the properties of flexbox, there's a handful of concepts we need to talk about. To start, let's just list them all out:

* Main axis
* Cross axis
* `flex-start`: the start of your parent container
* `flex-end`: the end of your parent container
* `center`: the center
* `space-between`
* `space-around`
* `stretch`
* `space-evenly` (nonstandard definition)

These regions are all illustrated beautifully in this diagram from the [official specification from W3C](https://www.w3.org/TR/css-flexbox-1/). **All diagrams used under this header are from W3C unless otherwise specified.**

![diagram of axes along with the start and end of the parent container](https://www.w3.org/TR/css-flexbox-1/images/flex-direction-terms.svg)

Let's break them down one by one.

#### Flex axes and flow

In flexbox, there are two axes along which elements of the container are aligned:
1. Main Axis (set by flex-direction, either horizontal `row` or vertical `column`)
2. Cross Axis (automatically set perpendicular to the main axis)

These two axes and the flow of elements are set by the parent properties `flex-direction` and `flex-wrap`, or by the single shorthand property `flex-flow`!
* If we want our main axis to be horizontal, we set `flex-direction: row;`. This is the default.
    * If we wanted to reverse this direction, we would use `flex-direction: row-reverse;`. This places elements right-to-left.
* If we want our main axis to be vertical, we set `flex-direction: column;`.
    * If we wanted to reverse this direction, we would use `flex-direction: column-reverse;`. This places elements bottom-to-top.

Next, we can determine the wrapping behavior of the container. Should we wrap elements around if they run out of space on the current row, or not?
* To wrap elements around to the next line when the current line runs out of space, we use `flex-wrap: wrap;`.
* To disable wrapping, we use `flex-wrap: nowrap;`.
* To wrap in the opposite direction, we use `flex-wrap: wrap-reverse;`.

To set both of these, we can use `flex-flow: DIRECTION WRAP;`. For example:

```css
.container {
    display: flex;
    flex-flow: row nowrap;
}
```

This will create a container whose elements will form a single row that does not wrap around on itself. So if we have more elements than can fit on the viewport, this will happen:

...image

#### Distributing free space: `justify-content`

Before we talk about the remaining properties for the container, we should address the values we can give them. All of them deal with aligning elements with respect to the free space remaining in the container.

##### `flex-start`, `-end`, `center`

These are values we can use to talk about how we want our elements to be lined up. `flex-start` means that we want them to be stacked up against the start of the container, and `flex-end` means we want them to be stacked against the end. Center does what you think it might: line up elements with respect to the center of the container.

##### `space-between`, `-around` (also `-evenly`)

There are also values we can use that arrange elements by distribution of the remaining space in the container. For basic purposes, we can talk about `space-between`, where our unused space is distributed **between** elements, and `space-around`, where our unused space is distributed all around the elements.

There's also another value we can use here called `space-evenly`. This does what one might expect, but it is a **nonstandard definition**, meaning that we shouldn't use it or provide a fallback value since not all browsers are guaranteed to support it.

##### `stretch`

This is a weird value. It **stretches** the elements such that the remaining space in the parent container is filled.

##### All of them visualized

We can instruct a flexbox container to align its content with respect to the axes and about the aforementioned regions.

When we `align-*`, we are doing so along the **cross axis**. When we are `justify-*`ing our items, we are doing so along the **main axis**.

Here's what the same three items look like when using all possible values for `justify-content`:

![all combinations of values with justify-content](https://www.w3.org/TR/css-flexbox-1/images/flex-pack.svg)

#### Aligning against with the cross-axis: `align-items`, `align-content`

We can also align our items **and their content** against the cross-axis of the container.

Let's investigate the possible values:

##### `flex-start`, `flex-end`

This places elements at the top of the flex container or the bottom of the container.

##### `center`

This aligns all elements such that the cross-axis falls directly in the center of the item.

##### `stretch`

This does what it says on the tin, stretching elements to fit the remaining space.

##### `baseline`

This aligns the elements such that they are all at the same.

##### All values compared

Here are four items adjusted with all possible values of `align-items`:

![all combinations of values with align-items](https://www.w3.org/TR/css-flexbox-1/images/flex-align.svg)

#### Distributing the free space of the whole container: `align-content`

In addition to the ability to describe how free space on the main axis should be distributed and how elements should position themselves up, we also have `align-content`, which controls how the space remaining on the cross-axis should be distributed.

This property uses the same values as `align-items`. Let's view them side-by-side:

![all combinations of values with align-content](https://www.w3.org/TR/css-flexbox-1/images/align-content-example.svg)

For a textual breakdown:
* `flex-start` places elements at the start of the cross axis.
* `center` centers the elements with respect to remaining space on the cross axis.
* `flex-end` places elements at the end of the cross axis.
* `space-between` places all free space on the cross axis in between the rows or columns.
* `space-around` places the free space evenly around the rows or columns of elements.
* `stretch` stretches all rows or columns so that no free space remains on the cross axis.

#### Example: Horizontally and Vertically Centering an Element

These properties in tandem make it **incredibly easy to center an object** in the middle of your container if you only have a single element:

...image

### Properties for the elements

Finally, we can talk about properties for the child elements. These mostly deal with ordering, relative size, and whether a specific element should be pulled out of the original flow.

#### `order`

We can also provide an ordering for each particular element in the child CSS. **Note this will not change the order of your source code**.

If two elements have the same `order` value, they will be arranged in order of how they appear. Otherwise, the elements are sorted from least to greatest in placement along the main axis.

...example

### Grow v. shrink

#### `flex-grow`

We can specify whether we'd like for an element to be able to grow relative to its peers.

You can think of the system as fractional. If we have `flex-grow` set to a value of 1 or more, the element specified will be able **to grow to fill the remaining space on the main axis**.

#### `flex-shrink`

We can also specify whether we'd like for an element to be able to shrink if need be.

If we set `flex-shrink` to 1 or more, the element specified will be able to **shrink to account for other elements on the main axis**.

### `align-self`

We can specify how an element should align itself in the flex container, if necessary. This pulls the element outside of the flex flow. All aforementioned properties for `align-items` apply here:
* `flex-start`
* `flex-end`
* `center`
* `baseline`
* `stretch`

But we also have a bonus value: `auto`. This one just instructs the child to inherit its parent's specification.

For example, if I have a class:

```css
.aligns-center {
    align-self: center;
}
```

And it is applied to each child of the parent container (which is kind of weird behavior, and you generally shouldn't do), then I can tell a **specific element** to be put **back into the flow** with:

```css
#specific-el {
    align-self: auto;
}
```

Think about why this works for a second. Remember the CSS cascade? The specificity of an **element selector** dominates in this case.

### Other things (`flex-basis`, `flex`)

### `flex-basis`

We can also describe the default size of the element on the main axis through `flex-basis` - done by providing a length.

This property needn't always be specified, though, since the initial value will be set to accommodate the default dimensions of the element to begin anyways.

...image

#### `flex`

This is shorthand to describe values for `flex-grow`, `flex-shrink`, and `align-self` all in one line. Pretty handy!

If I wanted to describe the behavior of an element that should be able to grow if possible, but always begin at a minimum width of `500px`, we would write:

```css
.custom {
    flex: 1 0 500px;
}
```

This would look like *this* on the page with other elements:

...image

## CSS Grid

Flexbox has a sister `display` style called grid! This one works exactly how you might expect it.

Put simply, it is CSS' way of organizing content into a rigid grid on the page.

Let's visualize this with a simple webpage. I have product cards that I want to lay out in a rigid, 3x3 grid containing previews of my top items.

![a black three-by-three grid overlay ed on a white background](images/3x3.png)

We will have *at most* 9 items to preview on this grid, so it works out nicely.

To create a CSS grid, we just need a container and its children.

```html
<div id='container'>
    <div class='element'>
        Content
    </div>
    <div class='element'>
        Content
    </div>
    <div class='element'>
        Content
    </div>
    <!-- ... -->
</div>
```

Then, if we want to let all our child elements occupy the specified space, the styling can be carried out entirely through the parent:
* To create columns, we use the property `grid-template-columns`
* To create rows, we use the property `grid-template-rows`
* We can specify the gaps between parts of the grid with `grid-column-gap` and `grid-row-gap`

Since we want to create a 3x3 grid, our CSS will look like:

```css
#container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
}
```

That's not super clean, though. Luckily, CSS accounts for this by giving us the `auto` value. If we want to create 3 columns and rows of equal size, we can just swap out our 33% with it!

```css
#container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
}
```

And if we wanted to go ahead and make the middle column a little larger than the others, or a specific size, we can remove that particular `auto` in favor of a specific value:

```css
#container {
    display: grid;
    grid-template-columns: auto 500px auto;
    grid-template-rows: auto auto auto;
}
```

The best part of using the `auto` keyword is that we can allow the rows and columns to automatically adjust to the `gap` we specify, or any other changes.

### But wait, there's more

There's a **lot** more to CSS grid than we've covered, but the purpose of this section was to simply introduce it. If you'd like to read any more about it, you can find some great [resources](#Resources) down below.

***

## Resources

There's no way that we can cover all of the things you can do with flexbox in a single document or lesson, so here is a small collection of resources for you to look into regarding all of the possible properties and use cases of flexbox and grid:
* [css-tricks' guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/): one of the most comprehensive guides to every single part of flexbox on the internet. Great for quick reference!
* [css-tricks' guide to grid](https://css-tricks.com/snippets/css/complete-guide-grid/): a great guide to every single part of CSS grid. **Very detailed**.
* [Mozilla Developer Network's guide to flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) provides a great overview of flexbox as a whole.
* The [CSS Flexbox Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/) specification. This truly is the bible of flexbox, and is surprisingly easy to read thanks in large part to the wealth of diagrams throughout - which were made extensive use of in this README.

### More reading

* [Tiff Nogueira's piece on `flex-grow` and `flex-shrink`](https://medium.com/@tiffnogueira/understanding-flex-shrink-flex-grow-and-flex-basis-and-using-these-properties-to-their-full-e4b4afd2c930) is very helpful for understanding how all the properties set through `flex` on a flex element play together.