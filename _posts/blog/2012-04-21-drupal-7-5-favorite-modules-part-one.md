---
title: Drupal 7 - 5 Favorite Modules Part One

image: drupal_favorite_modules_part-one.jpg

layout: post

meta_title: 5 Random Favorite Drupal 7 Modules - Part One

meta_description: A list of 5 randomly chosen favorite Drupal 7 modules.

page-class: drupal-green

categories:
- drupal
- web-development

tags:
- drupal 7
- modules

---

Most of the modules I use for every client site, and freelance project, are contained in my company's <a href="http://github.com/augustash/ash_make" title="Ash Make on github">make script on github</a>.

If you're hip to GitHub and Drush feel free to *gotoandmakewebsite* using that script.

## 5 random favorite modules
All the following modules are listed in the above make script.

### <a href="http://drupal.org/project/block_class" title="Block Class Module">Block Class</a>
The name says it all. It adds a class field to your blocks. Simple and very useful.

### <a href="http://drupal.org/project/extlink" title="External Link Module">External Links</a>
This lil' guy will automatically scan all the links on your site, then you can choose to have external links open in a new window and be marked with a box-arrow icon. You can also have all mailto:links marked with a small mail icon, or give users a popup window that lets them know they're leaving your website (with whatever custom message you want). I think this is a must-install for any site.

### <a href="http://drupal.org/project/linkit" title="Linkit Module">Linkit</a>
Combined with the path-correcting utility <a href="http://drupal.org/project/pathologic" title="Pathologic Module">Pathologic</a> make inner-page linking easy. It's a WYSIWYG editor tool which you define enable for specific WYSIWYG profiles. Instead of your WYSIWYG editor's standard chain-link icon, you can replace it with Linkit's chain-link (with a plus symbol) icon. Linkit works for internal links (with better autocomplete), external links, or files (all from IMCE Bridge or similar file directory module) located on your server. Pathologic is required to correct Linkit's standard node/47 link structure to use <a href="http://drupal.org/project/pathauto" title="Pathauto">Pathauto</a> aliases.
**Sidenote:** when you install pathologic you will need to check an input filter box (Correct URLs with Pathologic) on all Text Formats that use Linkit. Once you check the box, you may need to add a single "/" forward slash inside the box labeled "Also considered local" if you want the inner-page URLS to alias properly.

### <a href="http://drupal.org/project/wysiwyg_button_order" title="WYSIWYG Button Order Module">WYSIWYG Button Order</a>
If you use any of the listed-as-compatible WYSIWYG modules on your site, this module lets you reorder the toolbar functions. You assign the order on individual WYSIWYG profile pages.

### <a href="http://drupal.org/project/textformatter" title="Text List Formatter Module">Text List Formatter</a>
This module adds formatting options for view modes on text, long text, number, list, and taxonomy reference fields.

Short and sweet.
