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
  <script src="https://qa-cdn.imoneza.com/paywall.min.js"></script>
  <script type="text/javascript">
    iMoneza.paywall.init('b865156f-9e0d-48b6-a2a0-097456f689ec', {});
  </script>
</head>
```

**Please note:** Do not forget to add your domain to the Allowed Origins setting in your [Resource Access API Key definition](https://manageui.imoneza.com/Property/Edit#tab_apiKeys). If you do not do this, you will get a cross-domain JavaScript error and the script will not work.

### Init Method Options

The `iMoneza.paywall.init` method initializes the iMoneza paywall. There are two parameters passed to the method. The first is a Resource Access API key. The second is a list of custom configuration options for the page. The custom configuration options will override any settings defined on the [Paywall Settings](https://manageui.imoneza.com/PaywallSettings/Edit) page.

The full list of custom configuration options that can be passed in looks like:
```javascript
{
	apiKeyID: '',
	resourceKey: '',
	resourceURL: '',
	desktopPaywallType: '',
	mobilePaywallType: '',
	mobileMaxWidth: 0,
	enforceOldBrowserRules: 0,
	embeddedAdBlockerDetection: {
		element: '',
		zIndex: 0,
		openWarning: function (title, message) { },
		closeWarning: function () { },
		openDialog: function (title, message) { },
		closeDialog: function () { },
		onWarningOpened: function (title, message) { },
		onWarningClosed: function () { },
		onDialogOpened: function (title, message) { },
		onDialogClosed: function () { }
	},
	embeddedPaywall: {
		element: '',
		cover: {
			backgroundColor: '',
			visibleHeight: 0,
			visibleHeightMode: '',
			zIndex: 0
		},
		frame: {
			zIndex: 0
		},
		icon: {
		},
		open: function (url, isAdSupported, adSupportedMessageTitle, adSupportedMessage) { },
		updateHeight: function (heightData) { },
		close: function (url) { },
		onOpened: function () { },
		onHeightUpdated: function (heightData) { },
		onClosed: function () { }
	},
	embeddedWallet: {
		element: '',
		zIndex: 0,
		adSupportedMessage: '',
		badConfigMessage: '',
		freeMessage: '',
		denyMessage: '',
		propertyUserMessage: '',
		purchaseMessage: '',
		quotaMessage: '',
		spiderMessage: '',
		subscriptionMessage: '',
		unknownMessage: '',
		quotaSummaryMessage: '',
		open: function () { },
		update: function (userData) { },
		updateHeight: function (heightData) { },
		close: function () { },
		onOpened: function () { },
		onUpdated: function (userData) { },
		onHeightUpdated: function (heightData) { },
		onClosed: function () { }
	},
	embeddedConfirmation: {
		element: '',
		zIndex: 0,
		open: function (title, message) { },
		close: function () { },
		onOpened: function (title, message) { },
		onClosed: function () { }
	},
	modalFrame: {
		open: function (url) { },
		updateHeight: function (heightData) { },
		close: function () { },
		zIndex: 0
	},
	modalPaywall: {
		open: function (url) { },
		close: function () { }
	},
	accessGranted: function (resourceAccessData) { },
	accessDenied: function (resourceAccessData) { },
	getOriginalURL: function () { },
	getAccessMessage: function (resourceAccessData) { },
	closeURL: ''
}
```

The following options can be specified as properties on the root of an options object:

| Key Name | Description | Additional Notes |
| -------- | ----------- | ---------------- |
| apiKeyID   | Resource Access API Key for this property | Required |
| resourceKey | The external key used to identify this resource. | 50 Chars Max, If left blank, the current URL will be used. |
| resourceURL | The URL for this resource | By default, will be the current document URL. |
| desktopPaywallType | The type of paywall to display at desktop resolutions | Value can be 'Modal', 'Redirect', or 'Embedded' |
| mobilePaywallType | The type of paywall to display at mobile resolutions | Value can be 'Modal', 'Redirect', or 'Embedded' |
| mobileMaxWidth | Resolutions with a width less than or equal to this value will be considered mobile. | |
| AccessGranted | A callback function for when the user is granted access to the resource | |
| AccessDenied | A callback function for when the user is denied access to the resource | |
| getOriginalURL | A function that returns the URL of the document being viewed. This is used when redirections occur to eventually redirect the user back to the original resource they were viewing | By default, `document.URL` is used |
| getAccessMessage | A function that returns an access message based on the user's access to the current resource. This message appears in the embedded wallet when the user clicks the lock icon | |
| closeURL | The URL that the user will be redirected to if they close a paywall of type 'Modal' or 'Redirect' | By default, the user will be sent to the previous page in their browser history |

**  Example Specifying a Resource Key **  
This will provide a resource key to be used instead of the current URL.

```javascript
iMoneza.paywall.init('744935CD-D8D9-E311-B48B-BC305BD0D54E', {
  resourceKey: 'My-Test-Page'
});
```

_Additional example to add: setting the key based on a URL parameter_

** Example Using an AccessGranted Callback **
The `AccessGranted` function is called when access to a page is granted via client-side access control. A single object is passed to the callback function containing data about the access request, including current quota data (if applicable), subscription data, and single purchase data. Basic user data is also passed along, as is the reason why access is granted.

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

_Change example to use the getAccessReason function_

**Example Using the AccessDenied Callback**  
The `AccessDenied` function is called when access to a page is denied. The same object is passed to this function as to the `AccessGranted` function.

This example display the user's user name (if they're logged in) and tells them they do not have access to the page.

```javascript
iMoneza.ResourceAccess.paywall('744935CD-D8D9-E311-B48B-BC305BD0D54E', {
  accessDenied: function (resourceAccessData) {
    $('#iMonezaUsername').text(resourceAccessData.IsAnonymousUser ? 'Not logged in' : 'Logged in as ' + resourceAccessData.UserName);
    $('#iMonezaAccess').text('You do not have access to this page.');
  }
});
```

**Example Using the ModalOpenFrame and ModalCloseFrame Callbacks**  
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

