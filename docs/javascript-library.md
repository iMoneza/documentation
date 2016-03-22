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

**Please note:** Do not forget to add your domain to the Allowed Origins setting in your Resource Access API Key definition.  
If you do not do this, you will get a cross-domain javascript error and the script will not work.

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
  ApiKey: "744935CD-D8D9-E311-B48B-BC305BD0D54E",
  ResourceKey: "My-Test-Page"
});
```

**EXAMPLE USING THE ACCESSGRANTED CALLBACK**  
The `AccessGranted` function is called when access to a page is granted via client-side access control. Several 
parameters are passed into the callback, including current quota data (if applicable), subscription data, and single purchase data. 
Basic user data is also passed along, as is the reason why access is granted (which roughly correlates to the logged 
access reason: “Subscription”, “Purchase”, “Quota”, etc.)

This example displays whether or not the user is logged in. It then displays the reason why they have access to the page. 
If a quota is enforced, it displays how many quota hits the user has and how many they are allowed.

```javascript
iMoneza.ResourceAccess.init({
  ApiKey: '744935CD-D8D9-E311-B48B-BC305BD0D54E',
  AccessGranted: function (data) {
    $('#iMonezaUsername').text(data.IsAnonymousUser ? 'Not logged in' : 'Logged in as ' + data.UserName);
        
    var text = '';
    switch (data.AccessReason) {
      case 'Quota':
        text = 'You have viewed ' + data.Quota.HitCount + ' of your ' + data.Quota.AllowedHits + ' pages.';
        break;
      case 'Subscription':
        text = 'Your subscription expires on ' + data.ExpirationDate + '.';
        break;
      case 'Purchase':
        text = 'You purchased unlimited access to this page.';
        break;
      case 'Free':
        text = 'This page is available for free.'
        break;
      case 'PropertyUser':
        text = 'You are an admin, manager, or guest of this property.'
        break;
    }
    
    $('#iMonezaAccess').text(text);
  }
});
```

**EXAMPLE USING THE ACCESSDENIED CALLBACK**  
The `AccessDenied` function is called when access to a page is denied. The same parameters are passed to this function as 
to the `AccessGranted` function.

This example display the user’s user name (if they’re logged in) and tells them they do not have access to the page.

```javascript
iMoneza.ResourceAccess.init({
  ApiKey: '744935CD-D8D9-E311-B48B-BC305BD0D54E',
  AccessDenied: function (data) {
    $('#iMonezaUsername').text(data.IsAnonymousUser ? 'Not logged in' : 'Logged in as ' + data.UserName);
    $('#iMonezaAccess').text('You do not have access to this page.');
  }
});
```

**EXAMPLE USING THE MODALOPENFRAME/MODALCLOSEFRAME CALLBACK**  
These callbacks allows merchants to customize the modal IFRAME rendered around the paywall. Both callbacks *must* be
used together.

```javascript
iMoneza.ResourceAccess.init({
  ApiKey: '744935CD-D8D9-E311-B48B-BC305BD0D54E',
  ModalOpenFrame: function (url) {
    var docWidth = window.innerWidth, 
        docHeight = window.innerHeight, 
        customWidth = 700, 
        customHeight = 600
        body = document.querySelectorAll('body')[0];
        
    body.insertAdjacentHTML('afterbegin', 
        '<div id="CustomOverlay" style="position: absolute; width: ' + customWidth + 'px; height: ' + customHeight + 'px; margin-top: ' + ((docHeight - customHeight) / 2) + 'px; margin-left: ' + ((docWidth - customHeight) / 2) + 'px; z-index: 10001"><a href=\"javascript:CustomCloseAndRedirect()\">Close</a><iframe src=\"' + url + '\" width="100%" height="100%" frameborder="1"></iframe></div>'
    );
    body.insertAdjacentHTML('afterbegin', 
        '<div id="CustomOverlayBackground" style="position: fixed; left: 0px; top: 0px; width:100%; height:100%; z-index: 10000; background-color: black;"></div>'
    );
  },
  ModalCloseFrame: function () {
    document.getElementById('CustomOverlay').parentNode.removeChild(document.getElementById('CustomOverlay'));
    document.getElementById('CustomOverlayBackground').parentNode.removeChild(document.getElementById('CustomOverlayBackground'));
  }
});
```

