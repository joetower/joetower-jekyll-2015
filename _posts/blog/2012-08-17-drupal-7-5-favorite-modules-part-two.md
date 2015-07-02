---
title: Drupal 7 - 5 Favorite Modules Part Two

image: drupal_favorite_modules_part-two.jpg

layout: post

meta_title: 5 Random Favorite Drupal 7 Modules - Part Two

meta_description: Part two in a series on my favorite Drupal 7 modules, featuring the Insert module, Twitter Pull, Custom Permissions, Menu Attributes, and Megamenu.

page-class: drupal-green2

categories:
- drupal
- web-development

tags:
- drupal 7
- modules

---

## <a href="http://drupal.org/project/insert" title="Insert Module">Insert</a>
This rather simple module works with image upload fields to allow content authors to "insert" images into the WYSIWYG content area. Once an image is uploaded, the author can apply an image style to each image. You, as the module configurator, can define which image styles are available to use. Really, really awesome. I'm all about moving away from IMCE bridge.

I don't even use a WYSIWYG on my website. I'm all about writing posts in HTML. I'm curious to see if this module works without a WYSIWYG module installed.

## <a href="http://drupal.org/project/twitter_pull/" title="Twitter Pull Module">Twitter Pull</a>
I use a custom PHP input-formatted block (requires PHP module to be enabled) to insert this simple Tweet list into websites. Then use <a href="http://drupal.org/project/context/" title="Drupal Context">Context</a> to tell Drupal where to show the list of tweets on the front end. It's such a simple module, and it works great.

**Try out their sample code:**
```
<?php
	if (function_exists('twitter_pull_render')) {
	print twitter_pull_render('@twitter-username', 'YourName', 10);
	}
?>
```

## <a href="http://drupal.org/project/config_perms" title="Custom Permissions Module">Custom Permissions</a>
Have you ever wanted to get more granular within Drupal's core "Administer Site Configuration" permission? It's a bit frustrating that some permissions get lumped into that one permission setting. I know Context likes to hide out there. This module let's you define specific administrative paths and grant permission to edit/access them based on role. Sweet.

It also provides support for ctools exportables, meaning your defined permissions can be packaged into a Feature. Super awesome. Though, packaging permissions in Features isn't always awesome.

## <a href="http://drupal.org/project/menu_attributes" title="Menu Attributes Module">Menu Attributes</a>
Have you ever wanted to add an additional class to an entire menu or an individual menu list item? This module gives you that ability and more.

## <a href="http://drupal.org/project/megamenu/" title="Megamenu Module">Megamenu</a>
Megamenus are incredibly useful in organizing long child-heavy menu lists. In a full-width horizontal menu configuration it's handy for getting child links to arrange horizontally as well. The typical small , sometimes long, vertical dropdown menus aren't always ideal.

This module lets you "enable" megamenu functionality on a per-menu basis. It also provides a handful of helpful configuration options.
