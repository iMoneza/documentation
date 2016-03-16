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

```html
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

### Init Method Options

The iMoneza library has one public method available: `iMoneza.ResourceAccess.init()` which receives an options object
for configuration.  This `init()` method automatically launches the access controls once it is called based on the 
configuration it is passed.

The following options can be specified as properties of an options object:

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| ApiKey   | Resource Access API Key for this property | Required |
| ResourceKey | The external key used to identify this resource. | 50 Chars Max, If left blank, the current URL will be used. |
| ResourceURL | The URL for this resource | By default, will be the current document URL. |
| AccessGranted | A callback function for when the user is granted access to the resource | |
| AccessDenied | A callback function for when the user is denied access to the resource | |
| ModalOpenFrame | A callback function to render a modal around the iMoneza iframe | |
| ModalCloseFrame | A callback function to close the modal aroudn the iMoneza iframe | |
| ZIndex | A custom z-index for the default modal window | Default: 100000 |
| CloseURL | The URL that will be opened if the user clicks the 'close' link | |

**EXAMPLE SPECIFYING APIKEY AND RESOURCE KEY**  
This will provide a resource key to be used instead of the current URL.

```javascript
iMoneza.ResourceAccess.init({
  ApiKey: '744935CD-D8D9-E311-B48B-BC305BD0D54E',
  ResourceKey: 'My-Test-Page’
});
```

