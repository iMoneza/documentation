---
layout: default
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

