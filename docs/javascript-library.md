---
title: JavaScript Library | iMoneza Documentation
---
## JavaScript Library Documentation

iMoneza provides a client-side JavaScript library to enhance the user-experience of the paywall.  

### Implementation
The JavaScript library should be embedded into each individual page that needs to be managed by iMoneza.  This is not
necessary, however, if you choose to do server-side redirection only.

Insert the script `https://accessui.imoneza.com/assets/imoneza.js` in the head of the document.  Then, add additional
configuration options and an `init()` call in a script block afterward.

For example.

```HTML
<head>
  <title>Our Website</title>
  <script src='https://accessui.imoneza.com/assets/imoneza.js'></script>
  <script>
    iMoneza.ResourceAccess.init({
      ApiKey: 'b9a55abb-b316-4932-b303-68e4a421bfef'
    });
  </script>
</head>
```
