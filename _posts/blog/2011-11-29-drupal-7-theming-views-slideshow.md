---
title: Drupal 7 Theming Views Slideshow

image: drupal_theming_views_slideshow.jpg

layout: post

meta_title: My favorite albums of 2012. From The Kyteman Orchestra to Aesop Rock.

meta_description: A variety of minimal desktop wallpapers centered around Saul Bass' famous quote "Design is Thinking Made Visual".

summary: This is a nifty way to go about styling Views Slideshow using Drupal Preprocess Theme Functions.

page-class: drupal-blue2

categories: 
- drupal
- design

tags:
- Drupal 7
- Drupal 7 Theming
- Preprocess Functions
- Views Slideshow

---

#### This posted is directed toward Drupal themers who aren't proficient in PHP.

This is a nifty way to go about styling <a href="http://drupal.org/project/views_slideshow" title="Drupal Views Slideshow">Views Slideshow</a> using Drupal Preprocess Theme Functions. A wonderful Drupal programmer named Jake Bell taught me this specific function. Implementing it has given me a bit more insight into the flexibility and intricacies at your disposal in Drupal 7. 

In Drupal 6 to achieve this very functionality (though you could've used preprocess there too), I would take the "<a href="http://mustardseedmedia.com/podcast/episode30" title="MustardSeed Media Views Row Theming podcast">Views Row Theming</a>" approach by overriding the respective view template file. While overriding a views template works, as does hiding all your views fields and re-writing the output (as you need it to render - wrapping divs and all) in a Custom Text Field, neither are the best solution. Now, if you're a programmer and proficient in writing custom node templates, this method may or may not be the best solution.

## Process by example
See: *Image 1 - to the right*
In designing <a href="http://joetower.com/work/stereoland" title="Stereoland Redesign">Stereoland.com</a> I needed to implement a slideshow with the Title and Body fields wrapped by a containing div. To achieve this design it is necessary to absolutely position the "wrapped" fields on top of the slideshow image field. The challenge presented here is that you can not natively wrap a specific group of fields in an outer-div through the Drupal UI. Now, I'm no programmer and I don't pretend to understand Drupal at code level or anything beyond theming. If I do hit a wall while theming, I use google, drupal.org documentation, or if really stuck, consult a Drupal programmer.

Utilizing preprocess_views_view_fields within your theme template.php file will allow for successful wrapping of your desired fields. My working example can be seen on <a href="http://www.stereoland.com" title="Stereoland">stereoland.com</a>.

## Setting up the view
See: *Image 2 - to the right*
In this example, you want to display the following fields in order, within your slideshow block:
<ul>
<li>Slideshow Image</li>
<li>Slideshow Title Field</li>
<li>Body Field (Summary or Trimmed)</li>
</ul>

## The code
The following code can be placed in your theme's template.php file (after the opening PHP tag).

```php
// Slideshow wrapper to allow absolute placement of slideshow content
function Your_Theme_Name_preprocess_views_view_fields(&$vars, $hook){
  if ($vars['view']->name == 'Your_Slideshow_View_Name') {
    $vars['fields']['title']->wrapper_prefix = '<div class="slideshow-content-wrapper">' . $vars['fields']['title']->wrapper_prefix;
    $vars['fields']['Closing_Field_Name']->wrapper_suffix .= '</div>';
  }
}
```
To implement this in your theme, replace **Your_Theme_Name** with your theme's name, **Your_Slideshow_View_Name** with your slideshow_view_name, and the final line **Closing_Field_Name** with the desired last field_name in your view.

## What does this code do?
This code places an opening DIV tag for the div class of "slideshow-content-wrapper" *before*> the first specified field_name, and closes it *after*> the last specified field in your view. For the purpose of the above code, I wanted the wrapper-div to start before the Title_Field and close after the Body_Field, since those are the fields I needed wrapped.

**The resulting HTML source code should look something like this:**
```html
<div class="field-content slideshow-image">
       <img src="your-slideshow-image.jpg" />
</div><!--/slideshow-image-->
<div class="slideshow-content-wrapper">
      <h1 class="field-content slideshow-heading">This is a title with the field class of slideshow-heading</h1>
      <div class="views-field views-field-body">
            This is the body_content.
       </div><!--/views-field-body-->
</div><!--/slideshow-content-wrapper-->
```

## In closing
I have found very few posts or documentation on how to implement Drupal's preprocess functions (specifically the function I needed to reference) **from a themer perspective** (contextual and written-out PHP, not just the function). Hopefully this post can help someone looking into implementing similar theming/template overrides to their View Slideshow. This is merely a small contextual example of how to utilize a preprocess function for views. I'm sure years from now I'll look back on this post and remark to myself "lol n00b".

