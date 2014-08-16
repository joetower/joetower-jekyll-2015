# Toolkit [![Gem Version](https://badge.fury.io/rb/toolkit.png)](http://badge.fury.io/rb/toolkit) [![Build Status](https://travis-ci.org/Team-Sass/toolkit.png?branch=2.x.x)](https://travis-ci.org/Team-Sass/toolkit)

**Progressive Enhancement? Simple. Responsive Web Design? Done. Design in Browser? Beautiful.**

Think of Toolkit as your swiss army knife for Progressive Enhancement and Responsive Web Design. Those little bits and bobs that make your life easy and you want to reuse throughout projects but never really had a place to put? They're here, and they're designed to make your life happy. It's even got templates to get you rocking and rolling with some of the best Responsive Web Design tools Sass has to offer. Toolkit is broken out into individual pieces, so grab what you want, grab what you need, or grab the lot; the choice is yours.

## Table of Contents


1. [Basics](#basics)
  * [Requirements](#requirements)
  * [Installation](#installation)
  * [Settings](#settings)
  * [Extends](#extends)
1. [Clearfix](#clearfix)
1. [Colors](#colors)
  * [Tint and Shade](#tint-and-shade)
  * [Luma](#luma)
  * [Color Stacks](#color-stacks)
  * [Color Scales](#color-scales)
1. [Font Helpers](#font-helpers)
  * [Enable Ligatures](#enable-ligatures)
  * [Font Face](#font-face)
  * [Icon Font](#icon-font)
  * [Content Fade In](#content-fade-in)
1. [Intrinsic Ratios](#intrinsic-ratios)
1. [Kickstart](#kickstart)
1. [Nested Context](#nested-context)
1. [Parallax](#parallax)
1. [RTL](#rtl)
1. [Triangles](#triangles)
1. [Center](#center)
	* [Vertical Center](#vertical-center)
	* [Horizontal Center](#horizontal-center)
	* [Absolute Center](#absolute-center)
1. [Viewport](#viewport)
1. [Underline](#underline)

## Basics

Working with, and understanding how, Toolkit is fairly easy as long as you keep the following in mind:

### Requirements

Toolkit is a Sass plugin available both as a Compass Extension or as Bower Package. To use, make sure you have [Sass](http://sass-lang.com/install) installed. Any Sass compiler that is feature-compatible with Sass 3.3 can be used with Toolkit, so feel free to use whatever you feel is best!

### Installation

To install as a Compass extension, add the following to your Gemfile:

```ruby
gem 'toolkit', '~>2.0'
```

Then, add `require 'toolkit'` to your `config.rb` file and `@import "toolkit";` to your Sass file.

To install as a Bower package, run the following:

```bash
bower install sass-toolkit --save-dev
```

### Settings

All of Toolkit's settings can be changed with a simple mixin. Whenever you would like to change a default, include the following mixin, and from then on out, whenever that default is needed, the value you've changed it to will be used:

```sass
@include toolkit-set('setting', value);
```

### Extends

Where appropriate, Toolkit mixins provide an `$extend` option to allow the shared output of a mixin to be set to an extendable class instead of duplicating the properties. Toolkit is super smart about this and will create the extendable class in place where you first call the mixin, allowing you to not worry about blowing up your cascade if you use it. All mixins that have an `extend` setting can have a portion of their mixin extended. By default, mixins won't extend, but you can change that by changing their global setting or by passing `$extend: true` to the mixin.

### Documentation Format

Each mixin/function definition looks like the following:

#### @include clearfix([$extend])

**Settings**

- `'clearfix extend': false`

Mixins start with `@include`, functions don't. Variables in [brackets] are optional. Settings are global setting variables that provide the defaults for optional variables, with their default.

## Clearfix

Use a clearfix to ensure a parent element that contains floated children encompasses its children. Toolkit's clearfix is a [modern clearfix](http://www.css-101.org/articles/clearfix/latest-new-clearfix-so-far.php).

#### @include clearfix([$extend])

**Settings**

- `'clearfix extend': false`

## Colors

Sass comes with a [slew of great color functions](http://sass-lang.com/documentation/Sass/Script/Functions.html), made even better by [color schemer](https://github.com/team-sass/color-schemer), but there are a few handy things missing to make working with groups of colors easier

### Tint and Shade

While Sass's built in `lighten` and `darken` functions are great if you're looking not to change the base color, they aren't what designers think of when they think of lightening or darkening a color. The mental model for those is actually mixing white or black to lighten or darken a color. So, like so many others, we have a `tint` and `shade` function that will do just that. Simply pass the color and the amount you want. For instance, if you wanted a red that was 25% lighter or darker than the standard CSS red, you'd do one of the followings:

#### @include tint($color, $amount)

**Settings**

- `'tint color': #fff`

#### @include shade($color, $amount)

**Settings**

- `'shade color': #000`

### Luma

[Luma](http://en.wikipedia.org/wiki/Luminance_(video)) represented the brightness in an image (the "black-and-white" or achromatic portion of the image). As human vision is much more sensitive to luminance ("black and white") than it is to chromatic differences ("colors"), luma provides an effective means of determining how a human will react to the relative brightness of a color. The Luma functions are based on the conversion to the [YIQ](http://en.wikipedia.org/wiki/YIQ) color space, with Y being luma (also, the only component used in black-and-white televisions). The `luma` function provided will return the luma value for a color, and the additional helpers can be used for common tasks related to luma, such as if one color's luma is greater than and equal to or less than or equal to a second colors, and the difference between two colors' luma.

#### @include luma($color)

#### @include luma-gte($color1, $color2)

#### @include luma-lte($color1, $color2)

#### @include luma-diff($color1, $color2)


### Color Stacks

One technique for working with color that is very useful is to create color stacks that get either lighter or darker as they go, allowing me to easily create full color pallets with only a handful of base colors and then only needing to remember those base colors. These are called color stacks, and making them with Toolkit is super easy. A sample color stack, if written by hand, may look something like the following:

```scss
$red: red, #ff3f3f, #ff7f7f, #ffbfbf, #ffd8d8, #fff2f2;
```

This is a color stack for red that gets tinted as it goes (25%, 50%, 75%, 85%, 90%). To make figuring these out easier, there is the `color-stack` function that takes two required parameters, the main color you want to use and the secondary color you want to use (in the case of shading red, the main color would be red and the secondary color would be black), and a variable number of arguments of what percent you want them mixed. Tint stacks, shade stacks, and tint to shade stacks are also available.

#### @include color-shade($main, $secondary [, $amounts...])

**Settings**

- `'color stack amounts': 25% 50% 75% 85% 90%`

#### @include tint-stack($main [, $amounts...])

**Settings**

- `'tint color': #fff`
- `'color stack amounts': 25% 50% 75% 85% 90%`

#### @include shade-stack($main [, $amounts...])

**Settings**

- `'shade color': #000`
- `'color stack amounts': 25% 50% 75% 85% 90%`

#### @include tint-shade-stack($main [, $amounts...])

**Settings**

- `'tint color': 75% 50% 25%`
- `'shade color': #000`
- `'tint shade amounts': 75% 50% 25%`

### Color Scales

Color scales allow you to step from one color to another in even steps. Color scale will scale your first color to your second color evenly by hue, saturation, lightness, and alpha. Hue will take the fastest path around the color wheel

#### @include color-scale($main, $secondary [, $steps...])

**Settings**

- `'color scale steps': 6`


## Font Helpers

Web fonts are absolutely awesome, but working with them can be a bit tricky. Ligatures are super powerful and make fonts that that support them even more beautiful, but aren't on by default. Webfonts are awesome, but you need to wait for them to download and that can cause a Flash of Unstyled Text, which can be jarring and unpleasant. Toolkit provides some tools to ease this.

### Enable Ligatures

A simple mixin to enable ligatures

#### @include enable-ligatures([$extend])

**Settings**

- `'ligature extend': false`

### Font Face

A mixin to make writing `@font-face` declarations easy. `$files` should be a map where the key is the file extensions and the value is the path. If using Compass, paths should be relative to your font directory (`fonts_dir` in `config.rb`). If Compass is available, this mixin can inline the `woff` file, thus caching it with your CSS

#### @include font-face($name, $files [, $weight, $style, $inline-woff])

**Settings**

- `'font face weight': normal`
- `'font face style': normal`
- `'font face inline woff': false`

### Icon Font

A mixin for applying a core set of styling for icon fonts, based on styling form fonts generated by [Icomoon](http://icomoon.io). Setting `$speak: false` will optionally apply the [`speak: none`](http://webdesign.about.com/od/styleproperties/p/blspspeak.htm) property.

#### @include icon-font($font-stack, [, $speak, $extend])

**Settings**

- `'icon font speak': false`
- `'icon font extend': false`

### Content Fade In

One of the big challenges of working with webfonts is the Flash of Unstyled Text. It happens when webfonts get applied after content is already rendered on the page, usually causing a jarring jump when they are. To help combat this, Google and Typekit teamed up to create [WebFont Loader](https://developers.google.com/fonts/docs/webfont_loader), a JavaScript library to add Font Events that you can hook in to using CSS and JavaScript to know whether your webfonts are loading, have successfully loaded, or have failed to load. As [Typekit](http://help.typekit.com/customer/portal/articles/6852) suggests, these can be utilized to more effectively take control over your staying and prevent FOUT. The `content-fade-in` mixin will set your content to a 0 opacity (allowing the page to paint correctly even while it's not visible) and when a loading class has been removed, will fade your content in to an opacity of 1. Y

#### @include content-fade-in([$duration, $loading, $extend])

**Settings**

- `'fade in duration': 1s`
- `'fade in loading class': '.wf-loading'`
- `'fade in extend': false`

## Intrinsic Ratios

What is an intrinsic ratio you may ask? Well Thierry Koblentz wrote a great [A List Apart article](http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/) explaining it all in great detail; go read it. In a nutshell, however, it's a way to force any child elements to fluidly scale at a given ratio, including videos and frames, making awesome responsive happiness. If you just want to change the ratio, use the `intrinsic-ratio-ratio` mixin.

#### @include intrinsic-ratio([$ratio, $width, $elements, $position, $extend])
#### @include ir([$ratio, $width, $elements, $position, $extend])

**Settings**

- `'intrinsic ratio': 16/9`
- `'intrinsic ratio width': 100%`
- `'intrinsic ratio elements': '> *'`
- `'intrinsic ratio position': top`
- `'intrinsic ratio extend': false`

#### @include intrinsic-ratio-ratio([$ratio, $width, $position])
#### @include ir-ratio([$ratio, $width, $position])

**Settings**

- `'intrinsic ratio': 16/9`
- `'intrinsic ratio width': 100%`
- `'intrinsic ratio position': top`

## Kickstart

Importing the kickstart mixin will add the following common styles to your project:

```scss
*, *:before, *:after {
  -moz-box-sizing: border-box;
       box-sizing: border-box;
}

img, video {
  max-width: 100%;
  height: auto;
}
```

## Nested Context

Sometimes we may be inside of an element but need somthing the width of its parent.

![Basic nested context](http://img.pgdn.us/nested-context.png)

This is easy with fixed widths because then we can just make the child the width we want it but percentages change with each new context. With just a little bit of math we can pretty easily figure out what context we are in and it is condensed in the `nested-context()` function. Simply write how wide your current container is and it will figure out how wide it’s parent is like `nested-context(30%)` will give you a percentage to match the parent. Sometimes you are multiple levels deep and in that case, you can just list the levels `nested-context(80% 60% 33%)` and result in a percentage matching that of the 3rd parent up. See the [nested context](http://codepen.io/scottkellum/pen/vGuaI) and [centered nested context](http://codepen.io/scottkellum/pen/mwlGe) examples.

#### nested-context([$contexts])

**Settings**

- `'nested context contexts': 100%`

#### @include nested-context([$contexts, $position])

**Settings**

- `'nested context contexts': 100%`
- `'nested context position': left`

## Parallax

The concept of the parallax effect is simple, things closer to the viewer move faster while things further away move slower. Leveraging 3D transforms, this effect can be implemented without any JavaScript. You need to initialize your parallax container before being able to parallax an item. By default iOS parallax is on but setting it to false will turn on smooth scrolling within that element and no parallax effect will be shown.

The parallax mixin puts elements into real perspective and scales them back down to 100% so images and text will not have any distortion. Items will shift both vertically and horizontally in layouts to achieve the appropriate perspective. With `init`, if `$element: this`, the current element will be initialized; if `$element: '.class'|'#id'`, the respective element will be placed at the root of the stylesheet (not nested under the current selector). `ini` can be called from the root of your stylesheet.

#### @include parallax-init([$perspective, $element, $parallax-ios])

**Settings**

- `'parallax perspective': 1`
- `'parallax element': 'body'`
- `'parallax ios': true`

#### @include parallax([$distance, $perspective])

**Settings**

- `'parallax perspective': 1`
- `'parallax distance': 0`

## RTL

Quickly and easily write your left-to-right and right-to-left properties with one mixin! Works for `*-left` and `*-right` properties, as well as shorthand syntaxes.

#### @include rtl($property, $value)

## Triangles

You love em! Triangles! Now create them using just CSS! Turn any element or pseudo element into a triangle just by using the `@include triangle;`. It's perfect for flags, speech bubbles, and arrows.

Width and height just stretch the triangle to match a width or height. You can use any units you want although percentages don't work so well. Angle is where the  point of the triangle is drawn opposing one side. This is a little diffucult to explain, so here is a gif. If the width and height are not uniform, then the angle will be stretched to match the triangles proportions. The mixin also supports keywords like `top`, `top right`, `right` and so on for the angle. The triangle will point in the direction you give it.

![triangle](http://img.pgdn.us/triangle2.gif)

![triangle example](http://img.pgdn.us/triangle-ex.png)

#### @include triangle([$color, $height, $width, $angle])

**Settings**

- `'triangle color': #000`
- `'triangle height': 1em`
- `'triangle width': 1em`
- `'triangle angle': 0`

## Center

> We can do [insert seemingly impossible thing here] but we can't even center with CSS
>
> *Unfunny people on the Internet*

Yes, Flexbox will give us a native way to center things when it finally arrives, but until then, and for all of the browsers that don't support Flexbox, a few handy mixins for centering vertically, horizontally, or both!


### Vertical Center

Vertical center anything, literally anything, with the `vertical-center` mixin. Based on [Sebastian Ekström’s vertical align technique](http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/).

#### @include vertical-center([$midpoint, $extend])

**Settings**

- `'vertical midpoint': 50%`
- `'vertical extend': false`

### Horizontal Center

Horizontal center anything, literally anything, with the `horizontal-center` mixin. Based on [Sebastian Ekström’s vertical align technique](http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/) for fixed position items and good 'ol `margin: 0 auto` for everything else.

#### @include horizontal-center([$midpoint, $fixed, $extend])

**Settings**

- `'horizontal fixed': false` (fixed position item)
- `'horizontal extend': false`
- `'horizontal midpoint': 0%`
- `'horizontal fixed midpoint': 50%` (midpoint for fixed position item)

### Absolute Center

I want it in the middle. The absolute middle. The middle of the middle of the middle. The absolute middle of the middle of the middle of the middle.

#### @include absolute-center([$vertical, $horizontal, $fixed, $extend])

**Settings**

- `'absolute center fixed': false` (fixed position item)
- `'absolute center extend': false`
- `'absolute center vertical midpoint': 50%`
- `'absolute center fixed horizontal': 0%` 
- `'absolute center fixed horizontal midpoint': 50%` (horizontal midpoint for fixed position item)

## Viewport

Currently in the Draft stage, but being implemented by Microsoft is the CSS directive [`@viewport`](http://dev.w3.org/csswg/css-device-adapt/#the-atviewport-rule). This mixin simply provides prefixing.

#### @include viewport { @content }

## Underline

Create beautiful underlines [à la Medium](https://medium.com/designing-medium/7c03a9274f9)! Now with the ability to clear descenders!

#### @include underline([$background, $color, $clear-descenders, $distance, $width])

**Settings**

- `'underline background': #f00`
- `'underline color': #00e`
- `'underline clear descenders': true`
- `'underline distance': 1` (unitless number)
- `'underline width': 2` (unitless number)
- `'underline extend': false`

## License

(c) Sam Richard, Scott Kellum 2012-2014

Toolkit is dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) Licenses.
