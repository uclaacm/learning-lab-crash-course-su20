# Accessibility on the Web

## Overview

Welcome to Karen's introduction to accessibility on the web! After this workshop, you should have a basic understanding of what kinds of needs we should be meeting as web developers. You should be able to evaluate websites using your familiarity with accessibility guidelines, with the help of convenient tools.

This workshop assumes an intermediate knowledge of HTML and CSS. Unlike previous lessons, it's less about coding, and more about seeing the tools you've learned in a new way. Don't worry if you haven't seen some of this code from Matt and Leo yet&mdash;these ideas are important to keep in mind when you start to use more in-depth HTML and CSS.

## Table of Contents

* [What Does Accessibility Involve?](#what-does-accessibility-involve)
* [Appearance](#appearance)
  * [Fonts and Font Sizes](#fonts-and-font-sizes)
  * [Zoom Levels](#zoom-levels)
  * [Color Contrast](#color-contrast)
* [Supporting Screenreaders](#supporting-screenreaders)
  * [Semantic HTML](#semantic-html)
  * [Tabindex](#tabindex)
  * [Language Specification](#language-specification)
* [Images and Videos](#images-and-videos)
  * [Alt text](#alt-text)
  * [Transcripts](#transcripts)
  * [Autoplay](#autoplay)
* [Animations](#animations)
* [Content Reading Level](#content-reading-level)
* [Conclusion](#conclusion)
* [Accessibility Checkers](#accessibility-checkers)
* [Further Reading](#further-reading)
* [Reference Links](#reference-links)

## What Does Accessibility Involve?

What comes to mind when you think of the word "disabled" or the word "accessible"? Our assumptions about these words don't always tell the whole story. 

To create the best user experience, we should be comfortable with constantly adapting to the most recent accessibility standards. (This tends to be a theme across computer programming.) 

For many, poor accessibility features are an inconvenience at worst or even unnoticeable at best. But for an equally important population, these features can make or break their experience with your website. 

These users experience a range of needs, including colorblindness, use of a screen reader (for people with visual impairments, people with learning disabilities, etc.), poor vision (for the elderly, people with visual impairments, etc.), susceptibility to seizures, and more. 

Why is this so important, you ask?

1. Make websites functional and enjoyable for users with different needs
1. Increase traffic and user satisfaction
1. Everyone benefits from accessible websites

Each website element that you design or create will be used by all kinds of different people. So, we need to think about how these parts can meet the needs of our users. Many web developers (like me) can get too caught up in what looks "cool" and not what is actually legible or usable. 

Good web design, like any kind of design, is a balance of both *aesthetic* and *function*.

## Appearance
We'll start with the visual appearance of websites, since most of us will already be familiar with the qualities that make a website visually accessible or inaccessible. 

### Fonts and Font Sizes

Have you ever visited a website with an uncomfortably small or weirdly large font? Pretty annoying, right? Fortunately, someone was smart enough to come up with standard font sizes for mobile and desktop:

```css
/* CSS file */
/* 768px is a common breakpoint for smartphones */
  @media all and (max-width: 768px) {
    font-size: 16px;
  }

  @media all and (min-width: 769px) {
    font-size: 18px;
  }
```
Fonts can still look too small or too large at these sizes, so adjust as needed. 

```css
/* CSS file */
  .serif {
    font-size: 16px;
    font-family: Calibri;
  }
```

![A relatively smaller font, even at 16px](resources/calibri.PNG)

```css
/* CSS file */
  .sans-serif {
    font-size: 16px;
    font-family: Lucida Bright;
  }
```

![A relatively larger font, even at 16px](resources/lucida.PNG)

Mini typography lesson: serif fonts like Times New Roman are often used in body text, because serifs aid the eye in reading text. (Serifs are the little hooks on the ends of letters, like on the ends of the Ts in the Lucida example above.) Sans serif fonts like Arial are also popular because they look sleek and modern. 

We stick to basic serif and sans serif fonts because using display (aka fancy) fonts in body text slows down the brain's processing of text.  

A good rule of thumb is to copy a paragraph of a random article into your chosen font, and see if you can easily scan the paragraph. If not, it's probably not a good choice for your website.

### Zoom Levels

Users with visual impairments, such as the elderly, often need to zoom in on 16px or 18px text in order to be able to read clearly. As you're developing your website, try zooming in up to 200% and see if the website is still usable. If elements are jumping around or hiding text at this zoom level, that's bad news and we should take steps to fix that. 

Horizontal scrolling should be avoided at all costs. One way horizontal scrolling can unintentionally happen is if our text isn't wrapping correctly inside a container. `whitespace: normal` should be the default, but if things are looking funky, try explicitly setting this property.

```css
/* CSS file */
p {
  white-space: nowrap;
}
```

![Text that cuts off at the edge of the container.](resources/nowrap.PNG)

```css
/* CSS file */
p {
  white-space: normal;
}
```

![Text that wraps nicely when it reaches the end of the container.](resources/normal.PNG)

### Color Contrast 

Color blindness affects 1 in 12 men and 1 in 200 women worldwide. For these people, it can be hard to read text against a noncontrasting background. 

What does color contrast mean, exactly?

Technically, there are three types of contrast: hue, luminance, and saturation. The difference between the three can be found in any Adobe Photoshop properties panel:

![Photoshop properties panel: Hue (a range covering ROYGBIV), luminance (brightness), and saturation ("colorfulness")](resources/hsl.png)

What we're mainly addressing here is luminance contrast, since high hue contrast doesn't help if luminance contrast is still low. To illustrate, take the following example of green text on a red background. Even though red and green have very different hues, you can see that the end result is pretty unpleasant. 

![Red text on green background. A desaturated version of the image is even more difficult to read.](resources/contrast-calculation.png)

What's up with the second image? That's what would happen if you sucked all the color out of the red and the green. This desaturated example shows why the first image was so ugly: it's because the two colors are too similar in luminance! That's what makes noncontrasting colors hard to read.

In the real world, bad color contrast can be hard to spot. Thankfully, you don't have to calculate any ratios yourself. Color-contrast checkers help us make sure that our text and visual elements pass standards. 

![The WebAIM color contrast checker](resources/color-contrast.PNG)

Sometimes we'll be tempted to place text over images. It's very difficult to make sure that each of the different color combinations in these instances pass standards! So it's best to avoid background images when the text is essential to understanding or using the site.

![Some text placed over an image, which is very difficult to read.](resources/image-text.png)

## Supporting Screenreaders

This is probably the most important topic that we'll cover today&mdash;the following are often invisible to the average user, but can make or break the site experience for someone using a screen reader.

### Semantic HTML

HTML has special tags for common structural elements on a website, from `button` to `article` to `footer`. These exist for a reason! Screenreaders rely on [semantic HTML](https://www.jungledisk.com/blog/2017/12/04/should-i-bother-with-semantic-html/) tags to  navigate websites. In fact, *screenreaders ignore CSS and JS*.

This makes sense: CSS and JS are 99% visual anyway, and irrelevant to people with visual impairments. So, we have to consider what our sites would look like without the pretty packaging.

How does semantic HTML work? After each section and before each heading, screenreaders pause to allow time to digest information. If the correct tags aren't used, screen readers will read out the whole page in one "breath", so to speak. Also, screenreaders turn headings into a sort of table of contents for previewing and skipping around the page.

(Optional: download and [try out a screenreader](https://www.nvaccess.org/download/) for yourself.)

```html
<!-- HTML file -->
<!-- bad -->
<div class = "nav">
 <a href="/home">Home</a>
 <a href="/about">About</a>
</div>
```

```html
<!-- HTML file -->
<!-- good -->
<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>
```
![Two links labeled Home and About](resources/semantic-html.PNG)

![Two links labeled Home and About](resources/semantic-html.PNG)

Notice that there's no visual difference between using many of these tags as opposed to a `div`, which is why I say that screenreader users' needs are often invisible.

Did you know that `h1`, `h2`, etc. are actually semantic tags? It's bad practice to use heading tags to control font size and weight&mdash;that's what CSS is for! Think of heading tags as organizational tools for your website. Only the page title should be an `h1`. Subsections may be `h2`, `h3`, and so forth. 

On the same note, use CSS instead of `br` for spacing purposes. `br` should be used meaningfully, like in poems or addresses.

Using semantic HTML also has a positive side effect: it can make your HTML and CSS faster to write and easier to read, since you have predetermined tags instead of having to specify classes and IDs for each new element.

### Tabindex

Tabindex refers to tabbing through the buttons or links (or "focusable" elements) on a page using the Tab key on the keyboard. This feature can be used by people navigating by keyboard, as well as people using screen readers. 

Try it yourself: stop here and press "Tab" until you have navigated all the "tabbable" elements on the page. Imagine that you are using a screenreader, so you can't see the context around each link as you're doing this. If you read just the highlighted text as you tab around the page, can you still tell where each link leads?

"Click here" and other phrases without context can be confusing to people who are navigating a site by the links only. Even worse, imagine a screen reader reading a raw link like <span tabindex="-1">https://github.com/username/project/master/README.md</span>. That would be awful! 

Instead, we should label links and buttons in an informative way. For the above example, a better link would be "[visit my project](https://github.com/electricdinosaurs/accessibility-demo/master/README.md)". Descriptive labels allow the user to know what to expect when they visit a link.

```html
<!-- HTML file -->
<!-- bad -->
<p>
  Log in below!
</p>
<button>
     Click here
</button>
```

![A noninformative button that says Click here!](resources/click-button.PNG)

```html
<!-- HTML file -->
<!-- good -->
<button>
     Log in
</button>
```

![An informative button that says Log in](resources/login-button.PNG)

Keeping tabindex in mind, we should organize links and buttons in a meaningful order. This is relatively context-dependent, but as an example, "Create Account" and "Log In" are usually adjacent to each other. It wouldn't make sense to have these links separated by several other links on the page, just like it wouldn't make sense to have "Epilogue" next to "Introduction" in a book.

### Language Specification

Screenreaders are preprogrammed voices that read page content for users. Bad pronunciation can happen when it doesn't know what language a website is written in (by language I mean human language, not programming language). We can help out by specifying each page's main language using the appropriate language code:

```html
<!-- HTML file -->
<html lang="en">
  <!-- Your website goes here -->
</html>
```
## Images and Videos

Embedded media can be difficult to consume for many populations and for many reasons. Any visual element usually requires a text alternative.

### Alt text

You've seen alt text before, which is displayed when an image file fails to load. It's also read by screenreaders. 

Always provide alt text for images that have semantic meaning. For example: a decorative background image of a stripe pattern probably does not need alt text, but an illustrative image of the company's logo probably does. 

A good rule of thumb is if the image adds context to the page that isn't already present in surrounding text, then alt text is needed. If nothing new is added, then `alt=""` is okay. (Don't omit the `alt` attribute altogether.) 

```html 
<!-- HTML file -->
 <img href="images/acm-logo.png" alt="ACM logo" />
```

![ACM logo](resources/acm-logo.png)

Writing good alt text takes a little thought. Think of it as similar to a caption, only as brief as possible. For example, do not write "Image of..." or "Graphic of..." since it's usually obvious what the element is, even to screen readers. However, "Painting of..." may be used since the user would not know this if the image had failed to load. 

Be accurate when describing image content&mdash;we shouldn't provide information that is not present in the media. 

Alt text for icons follows the same conventions as for images, since some icons (such as file-type icons) add context.

The only situation where alt text can be redundant with surrounding text is when an image functions as a link. In that case, alt text must be present to act as a link, so `alt=""` is not allowed. Again, "Link to..." is not necessary as it is clear that the image is a link.

Videos do not support `alt` attributes. Use `title` instead or provide an external link to the video. 

### Transcripts 

English language learners and people with hearing impairments can have difficulty following audio or video elements. Transcripts and subtitles are also useful in noisy environments or when skipping through media to find specific information. 

WebVTT files are the standard for closed captions. We can include these with the `track` tag, and specify `kind = subtitle` and `label` using the appropriate language. 

`srclang` uses a language code to specify the type of data used (see [Language Specification](#language-specification)), while `label` is meant to help the user choose the correct subtitles.

Include the `controls` attribute to allow access to volume controls, video pause and playback, existing subtitles and transcripts, and more.

```html
<!-- HTML file -->
<video controls width="500">
  <source src="resources/video.mp4" type="video/mp4" />
  <track src="resources/english.vtt" kind="subtitles" srclang="en" label="English" />
  <track src="resources/spanish.vtt" kind="subtitles" srclang="sp" label="Spanish" />
</video>
```

### Autoplay

Autoplay can be disorienting for users, as well as annoying (have you ever tried to find that one tab that randomly starts playing music? Yeah).

The `autoplay` attribute for `video` tags is an "opt-in" feature. If for some reason this attribute is present in your code, you have to delete it in order to disable autoplay. Setting `autoplay=false` will not work.

Similarly, allow users to pause and navigate slideshows&mdash;it can be distracting to see a constantly sliding slideshow when you're trying to focus on a different part of the page. Plus, many slideshows move too fast for some users to read each slide. 

Since slideshows are usually made using JavaScript, we won't cover how to do it here.

## Animations

Many people are prone to seizures and can be harmed by websites with too much animation. This means limiting the number of GIFs, and avoiding flashing elements at all costs (the w3 standard is three flashes or less per second).

## Content Reading Level 

Although web developers often aren't responsible for writing site content, 1) they can be and 2) they are often asked for feedback on content.

Unclear or complicated language affect English language learners, people with reading disabilities, and others. For general-audience websites, the standard is to use language at an 8th-grade reading level.  

You'll also find that many words or phrases can be replaced with simpler ones. (Who wants to read 1000 words when you can get the same thing across in 500?) Towards this end, avoid the passive voice and avoid convoluted sentence structures.

Finally, correct spelling and grammar aren't just for nitpickers: they allow for more efficient communication as well as greater professionalism.

## Conclusion

It might seem that there are suddenly a million things to worry about that you didn't think about before. Don't sweat it if you can't remember everything. What's important is to start looking at websites you use and the websites you create with a critical eye, asking: "How does this meet accessibility guidelines?", "How might this website be hard for some people to use?", and "What can I do to make my website functional and enjoyable for everyone?" Once you've identified a problem, you can always Google the solution to jog your memory.

As a review, here are the topics we've covered:
* Fonts and font sizes
* Accommodating different zoom levels
* Color contrast
* `alt` and `track`
* Video controls and disabling `autoplay`
* Limiting animation and flashing effects
* Semantic HTML
* Tabindex and labeling links
* Content reading level

A final note: accessibility shouldn't be an afterthought. You'll make it easier for yourself and your users if you think about it early on: when you're picking your fonts and color palette, when you're creating elements in HTML, and when you're structuring the flow of your website. 

Want to put your new knowledge into practice? Start out by turning a critical eye on your [portfolio task](https://github.com/uclaacm/learning-lab-crash-course-su20/blob/master/task-1-portfolio/README.md) from earlier in this course, as well as any other websites you may have made. Use the tools below to help you make your website beautiful *and* accessible for all users! 

Or, check out the [anti-accessibility example website](https://electricdinosaurs.github.io/accessibility-demo/) attached to this repository that breaks all of the rules we mentioned. Try forking the project or playing around in the browser inspector mode to see how you can make it less awful. 

## Accessibility Checkers

Never rely on a machine to "check off" accessibility requirements. (Here is a blog post that shows [how machines can make mistakes sometimes](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/).) Still, I highly recommend saving these resources for later&mdash;I use them all the time and they are great aids for checking how your website measures up. 

* [WAVE browser extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
* [w3 evaluation tools](https://www.w3.org/WAI/ER/tools/)
* [Color blindness checker](http://color-blindness.com/coblis-color-blindness-simulator/)
* [Color contrast checker ](http://webaim.org/resources/contrastchecker/)
* [Accessibility checker](http://wave.webaim.org)
* [Hemingway reading level checker](http://www.hemingwayapp.com/)

## Further Reading

Want to learn about AA versus AAA standards, input errors, and more? Check out these comprehensive accessibility guides from top-tier institutions.

* [Elsevier guidelines](https://www.elsevier.com/about/policies/accessibility)
* [Yale guidelines](https://usability.yale.edu/web-accessibility/articles)
* [MDN guidelines](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
* [w3 guidelines](https://www.w3.org/TR/WCAG21)

## Reference Links

These articles will save you some googling on the topics we've covered today. (Mozilla Developer Network has been abbreviated as MDN.)

Appearance
* [Font size guidelines (Learn UI)](https://learnui.design/blog/mobile-desktop-website-font-size-guidelines.html)
* [Basic color theory](http://www.colorsontheweb.com/Color-Theory/Color-Contrast)

Supporting Screenreaders
* [Semantic HTML (MDN)](http://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
* [Semantic HTML flowchart (HTML5 Doctor)](http://html5doctor.com/downloads/h5d-sectioning-flowchart.png)
* [Tabindex (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
* [Hyperlink accessibility (Yale)](https://usability.yale.edu/web-accessibility/articles/links)
* [Alt text (WebAIM)](https://webaim.org/techniques/alttext/)

Images and Videos
* [Video attributes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
* [WebVTT files (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
* [Track tag for subtitles (w3)](https://www.w3schools.com/tags/tag_track.asp)

Bonus (not covered today)
* [External links](https://codersblock.com/blog/external-links-new-tabs-and-accessibility/)
