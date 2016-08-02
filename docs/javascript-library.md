---
title: JavaScript Library | iMoneza Documentation
---
## JavaScript Library Documentation

iMoneza provides a client-side JavaScript library to enhance the paywall user experience.

### Implementation
The JavaScript library should be embedded into each individual page that needs to be managed by iMoneza.  This is not necessary, however, if you choose to do server-side redirection only.

Insert the script `https://cdn.imoneza.com/paywall.min.js` in the head of the document.  Then, add additional configuration options and an `init()` call in a script block afterward.

For example.

```html
<head>
  <title>Our Website</title>
  <script src="https://cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
    iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', {});
  </script>
</head>
```

**Please note:** Do not forget to add your domain to the Allowed Origins setting in your [Resource Access API Key definition](https://manageui.imoneza.com/Property/Edit#tab_apiKeys). If you do not do this, you will get a cross-domain JavaScript error and the script will not work.

### `init` Method

The `iMoneza.paywall.init` method initializes the iMoneza paywall. There are two parameters passed to the method. The first is a Resource Access API key. The second is a list of custom configuration options for the page. The custom configuration options will override any settings defined on the [Paywall Settings](https://manageui.imoneza.com/PaywallSettings/Edit) page.

The full list of custom configuration options that can be passed in looks like:

#### PaywallSettings Config Object (and javascript functions)

```JSON
{
  "resourceKey": "",
  "resourceURL": "",
  "desktopPaywallType": "",
  "mobilePaywallType": "",
  "mobileMaxWidth": 0,
  "embeddedAdBlockerDetection": {
    "element": "",
    "zIndex": 0,
    openWarning: function (title, message) { },
    closeWarning: function () { },
    openDialog: function (title, message) { },
    closeDialog: function () { },
    onWarningOpened: function (title, message) { },
    onWarningClosed: function () { },
    onDialogOpened: function (title, message) { },
    onDialogClosed: function () { }
  },
  "embeddedPaywall": {
    "element": "",
    "cover": {
      "backgroundColor": "",
      "visibleHeight": 0,
      "visibleHeightMode": "",
      "zIndex": 0
    },
    "frame": {
      "zIndex": 0
    },
    "icon": {
    },
    open: function (url, isAdSupported, adSupportedMessageTitle, adSupportedMessage) { },
    updateHeight: function (heightData) { },
    close: function (url) { },
    onOpened: function () { },
    onHeightUpdated: function (heightData) { },
    onClosed: function () { }
  },
  "embeddedWallet": {
    "element": "",
    "zIndex": 0,
    "adSupportedMessage": "",
    "badConfigMessage": "",
    "freeMessage": "",
    "denyMessage": "",
    "propertyUserMessage": "",
    "purchaseMessage": "",
    "quotaMessage": "",
    "spiderMessage": "",
    "subscriptionMessage": "",
    "unknownMessage": "",
    "quotaSummaryMessage": "",
    open: function () { },
    update: function (userData) { },
    updateHeight: function (heightData) { },
    close: function () { },
    onOpened: function () { },
    onUpdated: function (userData) { },
    onHeightUpdated: function (heightData) { },
    onClosed: function () { }
  },
  "embeddedConfirmation": {
    "element": "",
    "zIndex": 0,
    open: function (title, message) { },
    close: function () { },
    onOpened: function (title, message) { },
    onClosed: function () { }
  },
  "modalFrame": {
    open: function (url) { },
    updateHeight: function (heightData) { },
    close: function () { },
    "zIndex": 0
  },
  "modalPaywall": {
    open: function (url) { },
    close: function () { }
  },
  "accessGranted": function (resourceAccessData) { },
  "accessDenied": function (resourceAccessData) { },
  "getOriginalURL": function () { },
  "getAccessMessage": function (resourceAccessData) { },
  "closeURL": ""
}
```

The following options can be specified as properties on the root of an options object:

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| resourceKey | The external key used to identify this resource. | 50 Chars Max, If left blank, the current URL will be used. |
| resourceURL | The URL for this resource | By default, will be the current document URL. |
| desktopPaywallType | The type of paywall to display at desktop resolutions | Value can be 'Modal', 'Redirect', or 'Embedded' |
| mobilePaywallType | The type of paywall to display at mobile resolutions | Value can be 'Modal', 'Redirect', or 'Embedded' |
| mobileMaxWidth | Resolutions with a width less than or equal to this value will be considered mobile. | |
| accessGranted | A callback function for when the user is granted access to the resource | |
| accessDenied | A callback function for when the user is denied access to the resource | |
| getOriginalURL | A function that returns the URL of the document being viewed. This is used when redirections occur to eventually redirect the user back to the original resource they were viewing | By default, `document.URL` is used |
| getAccessMessage | A function that returns an access message based on the user's access to the current resource. This message appears in the embedded wallet when the user clicks the lock icon | |
| closeURL | The URL that the user will be redirected to if they close a paywall of type 'Modal' or 'Redirect' | By default, the user will be sent to the previous page in their browser history |

**Example Specifying a Resource Key**  
This will provide a resource key to be used instead of the current URL.

```javascript
iMoneza.paywall.init('744935CD-D8D9-E311-B48B-BC305BD0D54E', {
  resourceKey: 'My-Test-Page'
});
```

**Example Using an `accessGranted` Callback**
The `accessGranted` function is called when access to a page is granted via client-side access control. A single object is passed to the callback function containing data about the access request, including current quota data (if applicable), subscription data, and single purchase data. Basic user data is also passed along, as is the reason why access is granted.

This example displays whether or not the user is logged in. It then displays the reason why they have access to the page. If a quota is enforced, it displays how many quota hits the user has and how many they are allowed.

```javascript
iMoneza.paywall.init('744935CD-D8D9-E311-B48B-BC305BD0D54E', {
  accessGranted: function (resourceAccessData) {
    $('#iMonezaUsername').text(resourceAccessData.IsAnonymousUser ? 'Not logged in' : 'Logged in as ' + resourceAccessData.UserName);
        
    var text = '';
    switch (resourceAccessData.AccessReason) {
      case 'Quota':
        text = 'You have viewed ' + resourceAccessData.Quota.HitCount + ' of your ' + resourceAccessData.Quota.AllowedHits + ' pages.';
        break;
      case 'Subscription':
        text = 'Your subscription expires on ' + resourceAccessData.ExpirationDate + '.';
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

**Example Using the `accessDenied` Callback**
The `accessDenied` function is called when access to a page is denied. The same object is passed to this function as to the `accessGranted` function.

This example displays the user's user name (if they're logged in) and tells them they do not have access to the page.

```javascript
iMoneza.paywall.init('744935CD-D8D9-E311-B48B-BC305BD0D54E', {
  accessDenied: function (resourceAccessData) {
    $('#iMonezaUsername').text(resourceAccessData.IsAnonymousUser ? 'Not logged in' : 'Logged in as ' + resourceAccessData.UserName);
    $('#iMonezaAccess').text('You do not have access to this page.');
  }
});
```

**Example Using the `modalFrame.open` and `modalFrame.close` Callbacks**  
These callbacks allows merchants to customize the modal IFRAME rendered around the paywall. Both callbacks *must* be used together.

```javascript
iMoneza.paywall.init({'744935CD-D8D9-E311-B48B-BC305BD0D54E', {
  modalFrame: {
    open: function (url) {
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
      close: function () {
        document.getElementById('CustomOverlay').parentNode.removeChild(document.getElementById('CustomOverlay'));
        document.getElementById('CustomOverlayBackground').parentNode.removeChild(document.getElementById('CustomOverlayBackground'));
      }
    }
  });
```

### `logOut` Method

The `logOut` method will log out the current user. It will perform a redirect to iMoneza to log the user out on both iMoneza and the your site.

You can optionally pass a `returnURL` parameter to specify the URL the user should be redirected to after they've been logged out. By default, they'll be returned to the page from which they initiated the logout.

### Paywall PurchaseOptions

You have programatic access to the details of the selected Resource via the ResourceAccess object.

#### ResourceAccess Response Object

```JSON
{
  "UserToken": "635f9d47-3416-40bc-b9f0-cb65459852ae|635978154112661889|mGhURnAejYjKmw0UGVK5QRYCJbgIxFBn8CeCrC82Q",
  "PropertyName": "Test Newspaper",
  "ResourceName": "Home Page",
  "UserName": "Anonymous User",
  "FirstName": "",
  "IsAnonymousUser": true,
  "WalletBalance": 0.0,
  "PictureURL": "",
  "Quota": {
    "IsEnabled": false,
    "HitCount": -1,
    "AllowedHits": -1,
    "PeriodStartDate": "2016-05-02T19:50:11.2661889Z",
    "PeriodName": "",
    "IsMet": true
  },
  "Subscription": {
    "IsExpired": false,
    "ExpirationDate": "2016-05-02T19:50:11.2661889Z",
    "IsCurrent": false,
    "SubscriptionGroupID": ""
  },
  "Purchase": {
    "IsPurchased": false
  },
  "AccessReason": "Free",
  "AccessActionURL": "",
  "AdBlockerStatus": "AdBlockerNotDetected",
  "IsNoCost": true,
  "IsAdSupported": false,
  "AdSupportedMessageTitle": null,
  "AdSupportedMessage": null
}
```

The following options can be specified as properties on the root of an options object:

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| UserToken | Guid + Timestamp + PaywallSession. | Not for developer consumption. |
| PropertyName | Name of Merchant Property | |
| ResourceName | Name of Resource | |
| UserName | Authenticated User's Name | |
| FirstName | Authenticated User First Name | |
| IsAnonymousUser | True if not Authenticated | |
| WalletBalance | Authenticated User's Wallet Balance | |
| PictureURL | Authenticated User's Logo | |
| Quota | Complex Object | See below |
| Subscription | Complex Object | See below |
| Purchase | Complex Object | See below |
| AccessReason | Textual Access Reason | Can be "Free" or "Purchase" or "Deny" and others |
| AccessActionURL | | |
| AdBlockerStatus | Status of client AdBlocker | Can be "AdBlockerNotDetected" or "AdBlockerDetected" and others |
| IsNoCost | Price is zero? | |
| IsAdSupported | Access is Ad Supported | |
| AdSupportedMessageTitle | Defined by Merchant | |
| AdSupportedMessage | Defined by Merchant | |

#### Quota Object

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| IsEnabled | If true, metered access is enabled | A Property-wide setting |
| HitCount | Increments for each Quota-enabled resource | A User-specific setting |
| AllowedHits | Maximum number of free Resources under Quota per User | A User-specific setting |
| PeriodStartDate | The beginning of the month for considering a Quota |  |
| PeriodName |  |  |
| IsMet | Will be set to 'true' is Quota is met |  |

#### Subscription Object

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| IsExpired | If true, access to Resources in this group will not be granted |  |
| ExpirationDate | End date of periodic subscription |  |
| IsCurrent | If true, it is a valid subscription |  |
| SubscriptionGroupID | The unique identifier of a Subscription | GUID |

#### AccessReason Values
- Deny
- Quota
- Subscription
- Purchase
- Free
- PropertyUser
- BadConfig
- UnknownResource
- Spider
- AdSupported

### Successful Grant

#### userData Response Object

```JSON
{
  "UserToken": "",
  "UserName": "",
  "FirstName": "",
  "IsAnonymousUser": false,
  "WalletBalance": 0.0,
  "PictureURL": ""
}
```

The following options can be specified as properties on the root of an options object:

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| UserToken | Guid + Timestamp + PaywallSession. | Not for developer consumption. |
| UserName | Authenticated User's Name | |
| FirstName | Authenticated User First Name | |
| IsAnonymousUser | True if not Authenticated | |
| WalletBalance | Authenticated User's Wallet Balance | |
| PictureURL | Authenticated User's Logo | |

#### sendHeight() HeightData

A MutationObserver watches the DOM of the embedded paywall.  Upon height changes, the parent page may respond to changes in height.  The sendHeight() function is called with new height values.

```JSON
{
  "clientHeight": 0,
  "scrollHeight": 0,
  "offsetHeight": 0
}
```

#### Example

```javascript
var updateEmbeddedWindowHeight = function (heightData) {

    stopEmbeddedDialogMutationObserver();

    if (!heightData)
        heightData = _lastHeightData;

    _lastHeightData = heightData;

    if (heightData.offsetHeight > 0)
        _embeddedWindowLowerCover.innerHTML = '';

    var paywallHeight = heightData.offsetHeight;
    var expanderHeight = parseInt(_embeddedWindowExpander.style.height.replace('px', ''));
    var paywalledElementHeight = _embeddedWindowElement.offsetHeight - expanderHeight;
    var lowerCoverTop = parseInt(_embeddedWindowFrameWrapper.style.paddingTop.replace('px', '')) + paywallHeight;
    var lowerCoverHeight = paywalledElementHeight - lowerCoverTop;
    var visibleHeight = 0;
    var dialogHeight = document.getElementById('imoneza-embedded-paywall-dialog').clientHeight;

    var coverBackgroundColor = iMoneza.utilities.hexToRGB(_options.embeddedPaywall.cover.backgroundColor);

    if (lowerCoverTop > paywalledElementHeight) {
        lowerCoverHeight = 0;
        expanderHeight = lowerCoverTop - paywalledElementHeight;
    }

    if (_options.embeddedPaywall.cover.visibleHeightMode == "Percent")
        visibleHeight = (paywalledElementHeight / 100 * _options.embeddedPaywall.cover.visibleHeight);
    else
        visibleHeight = _options.embeddedPaywall.cover.visibleHeight;

    if (dialogHeight == 0) {
        _embeddedWindowFrameWrapper.style.background = 'linear-gradient(to bottom, rgba(' + coverBackgroundColor.r + ',' + coverBackgroundColor.g + ',' + coverBackgroundColor.b + ',0) 0%,rgba(' + coverBackgroundColor.r + ',' + coverBackgroundColor.g + ',' + coverBackgroundColor.b + ',1) 100%)';
    } else {
        var pct = (visibleHeight / (visibleHeight + dialogHeight)) * 100;
        _embeddedWindowFrameWrapper.style.background = 'linear-gradient(to bottom, rgba(' + coverBackgroundColor.r + ',' + coverBackgroundColor.g + ',' + coverBackgroundColor.b + ',0) 0%,rgba(' + coverBackgroundColor.r + ',' + coverBackgroundColor.g + ',' + coverBackgroundColor.b + ',1) ' + pct + '%)';
    }

    document.getElementById('imoneza-embedded-paywall').height = paywallHeight + 'px';

    _embeddedWindowLowerCoverWrapper.style.top = lowerCoverTop + 'px';
    _embeddedWindowLowerCover.style.height = lowerCoverHeight + 'px';
    _embeddedWindowExpander.style.height = expanderHeight + 'px';

    _embeddedWindowFrameWrapper.style.paddingTop = visibleHeight + 'px';

    startEmbeddedDialogMutationObserver();
};
```

The following options can be specified as properties on the root of an options object:

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| clientHeight | document.documentElement.clientHeight |  |
| scrollHeight | document.documentElement.scrollHeight |  |
| offsetHeight | document.documentElement.offsetHeight |  |

### Examples

#### Custom Function Overrides

* Custom embedded confirmation

Once a user has been "Granted access" to a Resource, you may customize the user experience by making use of the `embeddedConfirmation.open(message, title)` function.

```html
<head>
  <title>Our Website</title>
  <script src="https://cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
        iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', {
            embeddedConfirmation: {
                open(title, message) {
                    alert(message);
                }
            }
        });
</script>
</head>
```

* Custom embedded ad blocker warning confirmation when ```NoCostAdBlockerAction=ShowWarning```

When ad blocker detection is set to "Show Warning", you may customize the user experience by making use of the `embeddedAdBlockerDetection.openWarning(message, title)` function.

```html
<div id="customAdBlockerWarning" style="display: none;">
    <h3 id="customAdBlockerWarningTitle"></h3>
    <p id="customAdBlockerWarningMessage"></p>
    <div onclick="$('#customAdBlockerWarning').hide();">Close</div>
</div>

<script type="text/javascript">
  iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', {
      embeddedPaywall: {
            element: '#content'
        },
      embeddedAdBlockerDetection: {
            openWarning: function (title, message) {
                $('#customAdBlockerWarningTitle').text(title);
                $('#customAdBlockerWarningMessage').text(message);
                $('#customAdBlockerWarning').show();
            }
          }
      });
</script>
```


* Custom embedded ad blocker dialog when ```NoCostAdBlockerAction=RequireDisable```

When ad blocker detection is set to "Require Disable", you may customize the user experience by making use of the `embeddedAdBlockerDetection.openDialog(message, title)` function.

```html
<div id="customAdBlockerWarning" style="display: none;">
    <h3 id="customAdBlockerWarningTitle"></h3>
    <p id="customAdBlockerWarningMessage"></p>
    <div onclick="$('#customAdBlockerWarning').hide();">Close</div>
</div>

<script type="text/javascript">
  iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', {
      embeddedPaywall: {
      embeddedAdBlockerDetection: {
            openDialog: function (title, message) {
              alert(message);
            }
          }
      });
</script>
``` 


#### Setting resourceKey based on URL parameter or unique ID

The resourceKey identifies the resource to iMoneza.  A resource key may be part of the URL parameters, such as www.mydomain.com/?id=1234321.  In this case, override the resourceKey based on the URL parameter.

  * URL
  
```html
<html>
<head>
  <title>Our Website</title>
  <script src="https://cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
    iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', 
    {
      resourceKey: "id=1234321"
    });
  </script>

</head>
  <body>
  ...
  </body>
</html>
```
A resource key may also be found in the DOM.  In this case, override resourceKey based on element ID (or path).

  * Unique Id
  
```html
<html>
<head>
  <title>Our Website</title>
  <script src="https://cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
    iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', 
    {
      resourceKey: "1234321"
    });
  </script>

</head>
  <body id="1234321">
  ...
  </body>
</html>
```

#### Loading page content via AJAX in onAccessGranted

```javascript
<script type="text/javascript">
  iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', {
      embeddedPaywall: {
          element: '#content',
          cover: {
              backgroundColor: '#E6E6FA',
              visibleHeight: 300
          }
      },
      embeddedConfirmation: {
          element: '#content'
      },
      embeddedWallet: {
          element: 'body'
      },
      accessGranted: function (data) {
          // Supply your own service to load the full content upon accessGranted:
          $('#content').load("/GetPageContent.ashx?FilePath=" + encodeURIComponent(window.location.pathname) + "&ResourceKey=" + iMoneza.paywall.getResourceKey() + "&ResourceURL=" + encodeURIComponent(window.location.href));
      }
  });
</script>
```

#### Resizing a custom modal implementation

```javascript
modalFrame.updateHeight
```

#### Providing custom text in ```getAccessMessage```

Embedded Wallet "Purchase Message"

```HTML
  <script src="https://cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
    iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', 
    {
      getAccessMessage: function (resourceAccessData)
      {
        if (resourceAccessData.AccessReason === "Subscription")
        {
          // override message with exp.date
        }
        var subscriptionMessage
      }
    });
  </script>
```

#### Pagination Ignorance

Some resources may span multiple "pages" but realistically are associated with a single resource.  To ignore differences in query string parameters, as with the below example, supply the base path with which to identify the resource. Below represents a Resource spanning 3 pages:

```
www.mydomain.com/news/long-article?page=1
www.mydomain.com/news/long-article?page=2
www.mydomain.com/news/long-article?page=3
```

Ignoring pagination for this Resource:
  
```html
<html>
<head>
  <title>Our Website</title>
  <script src="https://cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
    iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', 
    {
      resourceKey: "/news/long-article"
    });
  </script>

</head>
  <body>
  ...
  </body>
</html>
```