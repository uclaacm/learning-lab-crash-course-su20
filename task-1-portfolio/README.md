# Task 1: Make a Portfolio Website!

The best way to learn web development, plain and simple, is to practice. So, let's get to it!

We'll hit two birds with one stone by making a personal portfolio website! These websites are very popular with software engineers, data scientists, product designers, UI/UX designers, and lots of other people involved in tech. It's basically a walking résumé, except *you* get to control **every aspect of it!**

In this doc, we'll outline some suggestions on how you can use what you've learned to make your own personal website. However, you definitely don't *need* to follow any of these steps! After that, we'll also teach you how to deploy your personal website with GitHub Pages, so anybody can see it!

## Overview & Key Goals

At the end of the day, your personal website is **yours**. We're not going to tell you what has to be on it, what doesn't, or what looks bad or good. **You decide!**

Like the rest of this crash course, the onus is on you to practice what you've learned, and put your best foot out there! That being said, here are some common things that you'll probably end up practicing by making your website:

* general basic understanding of HTML & CSS
* adding color to your website with `color`, `background-color`, `border`, and other properties
* using `margin`, `padding`, `position`, CSS Grid, or Flexbox to make the spacing on your site *just right!*
* using the `<a>` tag to link to your GitHub, LinkedIn, email, etc.
* using the `<ul>`, `<ol>`, and `<li>` tags to create lists of content (like all your awesome skills!)
* creating your own visual components using a combination of HTML and CSS (like a card, tag, or navbar)
* use the right HTML tags to convey your page structure, even to those who use screen readers

Note that using JS is optional: some people use it, and some don't. Do what feels right for you!

## A Brief Aside & Inspirations: The Good, The Bad, and the Functionally Ugly

Very quickly, let's run through some examples of cool designs for personal websites.

Many people choose minimal websites that are content-focused and driven. Here are a few examples:

* [https://krashanoff.com/](https://krashanoff.com/) - Leo's website! It gives you just enough information about him, and a unique feel!
* [https://marceloneil.com/](https://marceloneil.com/) - Marcel is one of Matt's high school friends who does amazing stuff with computers, and his website is dead-simple but cool. It's actually a [Hugo](https://gohugo.io/) theme, but you can probably implement it yourself!
* [https://kandrewz.github.io/](https://kandrewz.github.io/) - Andrew is a CS student at UCLA, and also makes very cool interactive stories for Daily Bruin. His website is simple, but still pretty elegant - and some of the layout is trickier than it seems!
* [https://neerajsamtani.me/](https://neerajsamtani.me/) - Neeraj is one of the first people that Matt ever met at UCLA, and is just as awesome today as he was on day 1. His website is simple, but still conveys a lot about his personality, his design choices, and what he does!
* [https://markdotto.com/](https://markdotto.com/) - Mark Otto is one of the founders of Bootstrap, probably the most popular CSS framework to exist. His website is simple, but great.
* [https://thume.ca/](https://thume.ca/) - Tristan Hume is a Canadian software engineer who works at Jane Street, and writes some of the most interesting blog posts that Matt reads. His website is simple, with nothing flasy, but easy to navigate.
* [https://andrewkelley.me/](https://andrewkelley.me/) - Andrew Kelley is the main developer behind Zig, a new programming language with a large online following and lots of cool features. Note that his website is similarly minimal with Tristan's.

We think this is a great place to start, and probably what you should focus on for this project.

But for fun, let's see a bit more.

Sometimes, you can add small features to make your website just a bit more distinct than others. Here are a few examples:

* [https://carolchen.me/](https://carolchen.me/) - Carol is one of the smartest software engineers that Matt has ever met, and her website shows it! Two features that he loves are the randomization of certain elements on load, and the slider that lets users pick how much information they want.
* [https://www.emmycao.com/](https://www.emmycao.com/) - Emmy is one of leads at Creative Labs at UCLA, and also one of the coolest designers we know (and she can tell you a lot about Maryland). We think she does an especially great job at using color, spacing, and fonts to create a very visually cohesive website.
* [https://sindresorhus.com/](https://sindresorhus.com/) - Sindre Sorhus is one of GitHub's most famous celebrities, creating hundreds of popular open-source packages (mostly for Node.js and Swift). His website gives you a taste of everything he's done, including live (JS) metrics on what he does.
* [https://nickelder.ca/](https://nickelder.ca/) - Nick was one of Matt's web development mentors in high school. His website just gives you an amazingly clean feeling, one that screams meticulousness and professionalism.

And sometimes, you can go flashy. Here are some websites that do a lot, and say a lot:

* [https://lam.io/](https://lam.io/) - Derek was also one of Matt's web development mentors in high school. The amount of unique design customization on this website, down to writing his own sharding library, is insane. This is the kind of website that you don't ever really forget.
* [https://jgthms.com/](https://jgthms.com/) - Jeremy Thomas is the creator of [Bulma](https://bulma.io/), one of the web's most popular CSS frameworks. So it's no doubt that he has an enticing website, with a sense of vibrancy and dynamism that makes you want to hire him. Oh, and a light mode/dark mode toggle!
* [https://www.strml.net/](https://www.strml.net/) - Samuel Reed's website went viral on Twitter, Reddit, and HackerNews, and for good reason. He literally constructs his website, right in front of you. By far one of the most innovative websites we've seen.
* [http://www.rleonardi.com/interactive-resume/](http://www.rleonardi.com/interactive-resume/) - Okay, Robby Leonardi literally made his website an interactive game. He wins.
* [http://mihirmathur.com/](http://mihirmathur.com/) - Mihir was a previous president of ACM @ UCLA! While his website has the general flow and layout of most websites, there are so many design microinteractions that just make his site pleasant to use.

## Deploying Your Website with GitHub Pages

**TL;DR: [read this guide](https://pages.github.com/).**

...