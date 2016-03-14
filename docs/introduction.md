---
layout: default
title: Introduction | iMoneza Documentation
---
## Introduction

There are a number of ways to integrate iMoneza.  One of the most common ways is to use a CMS plugin.  iMoneza provides 
a number of pre-built plugins including [WordPress](https://github.com/iMoneza/wordpress-imoneza), [Drupal](https://github.com/iMoneza/drupal-imoneza) 
and [Joomla](https://github.com/iMoneza/joomla-imoneza).  

When creating a new plugin or integration for the iMoneza platform, please keep in mind that the plugin must implement the various functionality described below.

**RESOURCE MANAGEMENT**  
A CMS plugin can add resource management functionality directly to the CMS. For instance, a plugin could display fields when editing a content page that allow the content editor to specify metadata and custom pricing for a resource. The plugin connects to iMoneza via the Resource Management API.

**DYNAMIC RESOURCE CREATION**  
A CMS plugin can also append dynamic resource creation data to pages. This could occur in place of or in addition to resource management functionality. For example, a plugin might automatically add the dynamic resource creation XML block to every page on a site, using data from the CMS within the XML block.

**JAVASCRIPT LIBRARY MANAGEMENT**  
A CMS plugin can manage the JavaScript Library if it’s needed or used for access control. The JavaScript Library is loaded by embedding a small snippet of code on the page, and a CMS plugin can ensure that the snippet is included automatically. This step can also be managed manually – that is, without a CMS plugin, it’s still possible for a merchant to add that snippet to their site. The plugin merely simplifies the process, ensuring that content changes to the site don’t interfere with the snippet.

**SERVER-SIDE RESOURCE ACCESS**  
A CMS plugin can also implement server-side access control, supplanting the need for the JavaScript Library. Server-side access control provides an additional level of resource protection, running code on the server to determine resource access (rather than relying on code to run in the consumer’s web browser). For this functionality, the plugin connects to iMoneza via the Resource Access API.

**CONTENT CUSTOMIZATION**  
A CMS plugin can give merchants the ability to customize content based on user access data from iMoneza. For instance, a CMS plugin could determine if a user has authenticated and, if they have, display their username and a link to their iMoneza profile. As another example, a plugin could also display information about a user’s quota, telling them how many of their metered articles they’ve already viewed. These features can be implemented server-side (if the plugin also uses server-side resource access) or client-side (by hooking into the JavaScript Library).

**EXTERNAL SUBSCRIBER MANAGEMENT**  
A CMS plugin (or plugin for a CRM or other subscriber management system) can give merchants the ability to export subscriber data to iMoneza and receive subscriber data back from iMoneza. For instance, whenever a new subscriber is added to the CMS/CRM, a corresponding external subscriber can be created at iMoneza. And when an iMoneza links to an external subscriber or purchases an eligible subscription, the CMS/CRM plugin can be notified and update its own data accordingly.
