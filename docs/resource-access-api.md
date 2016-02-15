---
layout: documentation
title: Resource Access API | iMoneza Documentation
---
## Resource Access API

The Resource Access API places stronger requirements on API consumers than the Resource Management API. API consumers can implement server-side access control, but must follow a certain set of rules to ensure access control is correctly implemented, compatible with access control alternatives (like the JavaScript Library), and properly integrates with the Access UI.

### USER TOKEN

The user token is a piece of data that’s passed between the Resource Access API, Access UI, and the consumer’s web browser. It’s also used by CMS plugins that enforce server-side access control. This token identifies a user, the time the token was generated, and an HMAC token to prevent tampering. It’s used to manage authentication state the wide range of servers, clients, and systems using iMoneza.

The user token is designed to be transparent to end users. It can only be retrieved via the Access API (both from CMS plugins and the JavaScript Library), and is designed to be stored as a cookie.

There are also temporary user tokens. These are single-use tokens that can also be used by the Access API to return resource access data. However, a temporary user token cannot be stored as a cookie, as it’s immediately invalidated after the first time it’s used. But that one-time use returns a user token which can be stored.

CMS plugins must receive, store, and transmit the user token. They are not intended, however, to read or parse the user token in any way. Any attempts by a CMS plugin to do so are unsupported and might break in the future. Instead, a plugin can use the user token and Resource Access API to get data about a user.

### SERVER-SIDE ACCESS CONTROL

The following is an overview of the server-side access control mechanism. This is the general process that should be implemented by CMS plugins that enforce access control.

1.	The user requests a page.  
2.	The CMS plugin calls the Resource Access API, which returns resource access data. There are two different ways for the Resource Access API to be called:  
a.	If the page request includes an `iMonezaTUT` parameter, the CMS plugin performs a `GET `request to the endpoint `/api/TemporaryUserToken/apiKey/temporaryUserToken`.  
b.	Otherwise, the CMS plugin performs a GET request to the endpoint /api/Resource/apiKey/resourceKey?UserToken=userToken&ResourceURL=url.  
i.	The `userToken `is optional. The CMS plugin will send it if it exists (having been previously set with a cookie).  
3.	The CMS plugin processes the resource access data.  
a.	The returned data will include a UserToken. The CMS plugin should store this as a cookie.  
b.	If the returned data includes a non-empty AccessActionURL, the CMS plugin should redirect the user to that URL.  
c.	If the returned data does not include a non-empty `AccessActionURL`, the CMS plugin should serve the resource to the user.  

Note that anytime a user token is returned, regardless of which API endpoint created it, the CMS plugin should store it. The token returned from every request will be different.  

The following three use cases explain how the above control flow is used to secure resources.  

#### USE CASE 1: UNAUTHENTICATED USER PURCHASES RESOURCE  

1.	User requests page.  
2.	CMS plugin calls Resource Access API endpoint /api/Resource/apiKey/resourceKey without a user token (because this is a new, unauthenticated user who doesn’t have an existing user token cookie).  
3.	Resource Access API returns resource access data which contains UserToken and AccessActionURL.  
4.	CMS plugin stores UserToken as a cookie.  
5.	CMS plugin redirects user to AccessActionURL (which is a URL on the Access UI).  
6.	Access UI authenticates user, processes purchase, and redirects back to original page with an iMonezaTUT appended to the URL.  
7.	CMS plugin calls Resource Access API endpoint `/api/TemporaryUserToken/apiKey/temporaryUserToken` with the value from the `iMonezaTUT` parameter.  
8.	Resource Access API returns resource access data which contains UserToken but not `AccessActionURL`.  
9.	CMS plugin stores UserToken as a cookie.  
10.	CMS serves resource to user.  

#### USE CASE 2: AUTHENTICATED USER GRANTED ACCESS  

1.	User requests page.  
2.	CMS plugin calls Resource Access API endpoint /api/Resource/apiKey/resourceKey with a user token (which was previously stored as a cookie).  
3.	Resource Access API returns resource access data which contains a new UserToken.  
4.	CMS plugin stores UserToken.  
5.	CMS serves resource to user.  

#### USE CASE 3: DYNAMIC RESOURCE CREATION SPIDER GRANTED ACCESS  

1.	Spider requests page with an iMonezaTUT appended to the URL.  
2.	CMS plugin calls Resource Access API endpoint /api/TemporaryUserToken/apiKey/temporaryUserToken with the iMonezaTUT.  
3.	Resource Access API returns resource access data which contains UserToken.  
4.	CMS plugin stores UserToken.  
5.	CMS serves resource to spider.  

### ENDPOINTS  

#### GET RESOURCE DATA FROM RESOURCE KEY  

Format: `GET /api/Resource/{accessKey}/{resourceKey}?ResourceURL={resourceURL}&UserToken={userToken}&IP={ipAddress}`

Returns access data about a resource based on its resource key (also called external key). The following parameters are passed:

*	`accessKey`: a Resource Access API access key.  
*	`resourceKey`: the external key for the resource being accessed.  
*	`resourceURL`: a URL for the resource. If dynamic resource creation needs to occur, this URL will be spidered by iMoneza to gather resource data.  
*	`userToken`: an existing user token that was stored as a cookie. This value can be empty if the user doesn’t have an existing user token cookie, but the parameter is required.
*	`ipAddress`: the IP address of the user requesting a resource. This parameter is optional. The IP address can be IPv4 or IPv6.   

The API returns a set of data like this:  

	{
	  "UserToken": "e313128d-21c4-4dad-a8e4-8928993f08a7|635633302264795088|2OnHROFPE3WgONGDeUyZJkluyORc0UBYOXABTLaU",
	  "PropertyName": "Acme, Inc.",
	  "PaywallDisplayStyle": "RedirectMobile",
	  "ResourceName": "Front Page News",
	  "UserName": "johndoe",
	  "IsAnonymousUser": false,
	  "Quota": {
		"IsEnabled": false,
		"HitCount": -1,
		"AllowedHits": -1,
		"PeriodStartDate": "2015-03-30T16:37:06.4795088Z",
		"PeriodName": "",
		"IsMet": true
	  },
	  "Subscription": {
		"IsExpired": false,
		"ExpirationDate": "2015-03-30T16:37:06.4795088Z",
		"IsCurrent": false,
		"SubscriptionGroupID": ""
	  },
	  "Purchase": {
		"IsPurchased": false
	  },
	  "AccessAction": "Purchase",
	  "AccessReason": "Deny",
	  "AccessActionURL": "https://accessui.imoneza.com/ResourceAccess/?ApiKey=2ba53ade-07a7-427f-8e06-2bc7733a2fc8&ResourceKey=51&UserToken=e313128d-21c4-4dad-a8e4-8928993f08a7%7c635633302264795088%7c2OnHROFPE3WgONGDeUyZJkluyORc0UBYOXABTLaU&SendTemporaryUserToken=True"
	}

Note that a UserToken is always returned and should always be stored as a cookie by the API consumer. And because there’s a value specified for AccessActionURL, the API consumer should redirect the user to that URL.

#### GET RESOURCE DATA FROM TEMPORARY USER TOKEN

Format: `GET /api/TemporaryUserToken/{accessKey}/{temporaryUserToken}?ResourceKey={resourceKey}&ResourceURL={resourceURL}&IP={ipAddress}`

Returns resource access data based on a temporary user token. The following parameters are passed:  

*	accessKey: a Resource Access API access key.  
*	temporaryUserToken: a temporary user token that was passed to the page in the iMonezaTUT URL parameter.
*	resourceKey: the external key for the resource being accessed.  
*	resourceURL: a URL for the resource. If dynamic resource creation needs to occur, this URL will be spidered by iMoneza to gather resource data.  
*	ipAddress: the IP address of the user requesting a resource. This parameter is optional. The IP address can be IPv4 or IPv6.   

The API returns a set of data like this:  

	{
	  "UserToken": "e313128d-21c4-4dad-a8e4-8928993f08a7|635633302264795088|2OnHROFPE3WgONGDeUyZJkluyORc0UBYOXABTLaU",
	  "PropertyName": "Acme, Inc.",
	  "PaywallDisplayStyle": "RedirectMobile",
	  "ResourceName": "Front Page News",
	  "UserName": "johndoe",
	  "IsAnonymousUser": false,
	  "Quota": {
		"IsEnabled": false,
		"HitCount": -1,
		"AllowedHits": -1,
		"PeriodStartDate": "2015-03-30T16:37:06.4795088Z",
		"PeriodName": "",
		"IsMet": true
	  },
	  "Subscription": {
		"IsExpired": false,
		"ExpirationDate": "2015-03-30T16:37:06.4795088Z",
		"IsCurrent": false,
		"SubscriptionGroupID": ""
	  },
	  "Purchase": {
		"IsPurchased": false
	  },
	  "AccessAction": "Purchase",
	  "AccessReason": "Deny",
	  "AccessActionURL": "https://accessui.imoneza.com/ResourceAccess/?ApiKey=2ba53ade-07a7-427f-8e06-2bc7733a2fc8&ResourceKey=51&UserToken=e313128d-21c4-4dad-a8e4-8928993f08a7%7c635633302264795088%7c2OnHROFPE3WgONGDeUyZJkluyORc0UBYOXABTLaU&SendTemporaryUserToken=True"
	}

Note that although the endpoint is different, the data returned is identical to the data returned by the previous endpoint. It’s also very similar (although not necessarily identical) to the data parameter passed to the AccessGranted and AccessDenied events by the JavaScript Library.

#### ACCESS DATA

The access data returned by either endpoint contains lots of data about the user, the resource, and their interactions. The following data can be used by CMS plugins to customize content/display:  

*	`IsAnonymousUser`: returns whether or not the current user has authenticated. If they have, this value is false.
*	`UserName`: returns the username of the currently authenticated user. This value is essentially meaningless if IsAnonymousUser is true. If the user doesn’t have a username (if their iMoneza account is linked to an external provider like Facebook or Google), their full name is displayed.
*	`Quota`: returns data about the quota access model:
  *	`IsEnabled`: returns whether or not a quota is in place on the site. If this value is false, the rest of the Quota object should be ignored.
  *	`HitCount`: returns the number of resources the user has viewed that count against their quota.
  *	`AllowedHits`: returns the maximum number of resources the user can view under the quota.
  *	`IsMet`: returns true if the user has maxed out their quota.
*	`Subscription`: returns data about the subscription access model:
  *	`IsCurrent`: returns whether or not there is a valid subscription in place for this user to gain access to this resource.
  *	`IsExpired`: returns whether or not the user has a subscription that has expired but otherwise would have granted them access to this resource. If both this and IsCurrent are false, ignore the rest of the Subscription object.
  *	`ExpirationDate`: returns the date when the user’s subscription that gives them access to this resource expires.  
*	`Purchase`: returns data about the single purchase access model:  
  *	`IsPurchased`: returns whether or not the user has purchased this resource.  
*	`AccessReason`: the reason why a user is being granted access to the resource. Possible values include:  
  *	`Deny`: the user does not have access to the resource.  
  *	`Quota`: the user has an available (or prior) quota hit that applies to the resource.  
  *	`Subscription`: the user has an active subscription which gives them access.  
  *	`Purchase`: the user has purchased the resource.  
  *	`Free`: the resource is available for free.  
  *	`PropertyUser`: the user is a property administrator, property manager, or property guest.  
  *	`BadConfig`: iMoneza was unable to load the configuration for the resource (such as due to an invalid dynamic resource creation XML block).  
  *	`UnknownResource`:  the resource isn’t managed by iMoneza.  
  *	`Spider`: the user is an iMoneza spider indexing the resource (as part of dynamic resource creation).  
