---
title: My First Drupal 7 Module

image: my_first_drupal_module.jpg

layout: post

meta_title: Drupal 7 Simple Module to set default menu link value to true.

meta_description: A simple Drupal 7 Module example to set a content type default Menu Setting "Provide a Menu Link" to true.

page-class: drupal-blue

post-type: article

categories:
- drupal
- web-development

tags:
- drupal 7
- modules

---

### Update 2:
This is now a contrib module on Drupal.org. Check out <a href="http://drupal.org/project/default_menu_link" title="Default Menu Link">Default Menu Link</a>.
I would like to thank <a href="http://drupal.org/user/24167" title="dandaman on Drupal.org">Dan Ficker</a> and <a href="http://drupal.org/user/251739" title="Unitoch on Drupal.org">Paul Schulzetenberg</a>. This wouldn't have been possible without their programmer steez.

Also the database module weight reference at the bottom of this post is no longer an issue. The module handles this.

### Update:
Since I wrote this post, my co-worker <a href="http://www.da-man.com/blog" title="Dan Ficker">Dan Ficker</a> was kind enough to add Drupal admin options to the module, and extend its use. We'll probably add this as a contrib module soon.

-------

## Original Post
This is a super simple module that will set a content type's default menu setting "Provide a Menu Link" to true. It comes in super handy if you want to kill any client guess work and take control of the menu system. I guess this is mostly handy for clean organization, bread crumbs, and active menu states. I know I'll be using it where ever I can.

## Wait, what are we doing?
So, say you want the default menu setting to be "true" on node creation for a specific content type. As the site developer you want to alleviate any guess work on the part of the client. Before creating this module, you'll want to set the default parent for whatever content type you're targeting via:
*Admin > Content Types > Your Content Type > Edit > Menu Settings > Default Parent Item*.

## Let's create a module
**Create a new module folder inside your theme's directory like so:**
*sites > websitedomain.com > modules > custom > my_menu_module*

**You'll want to create the following two files inside your my_menu_module folder:**
<ul>
<li>my_menu_module.info</li>
<li>my_menu_module.module</li>
</ul>

Your module .info file should follow <a href="http://drupal.org/node/542202" title="Drupal 7 .info file conventions">Drupal 7 conventions</a>.

###Perhaps it would look like the following:

```
name = My Menu Module
description = Automatically sets the default parent item for X Content Type Entries.
package = Site-name Custom
version = 7.x-1.0
core = 7.x
```

### Your actual .module file could look something like this:

```
<?php
	function my_menu_module_form_menu_name_node_form_alter(&$form, &$form_state, $form_id) {
	$form['menu']['enabled']['#default_value'] = 1;
}
?>
```

You'll want to replace the **my_menu_module** portion of the function above with your module title. Also, the portion **menu_name** with your content type name.

## One last note
Sometimes you might have to change this module's weight in your database to "1" instead of the default "0". I know there is a way to set a module weight within a module, but I haven't gotten that far yet. So, if you clear your website's cache and still don't see the "Provide a menu link" checkbox checked (on content creation), you'll want to find the table located in:

*system > title > my_menu_module*

and change the weight to "1" instead of "0". This will make sure the hook is recognized after the Menu Module renders. Something like that.

This is the first module I've ever created. I've been on the fence about diving into PHP (I am a designer / front-end developer), and think I'm fascinated enough to keep learning. I have to give mad props to my awesome programmer co-worker <a href="http://twitter.com/#!/Unitoch" title="Unitoch on Twitter">Paul Schulzetenberg</a> for the hand-holding through creating this module. Thanks Paul. Small steps.

Maybe this will help someone out there who wants to achieve this same functionality.
