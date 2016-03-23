---
title: Resource Access API Concepts | iMoneza Documentation
---
## Resource Access API Concepts

The Resource Access API places stronger requirements on API consumers than the Resource Management API. API consumers 
can implement server-side access control, but must follow a certain set of rules to ensure access control is correctly 
implemented, compatible with access control alternatives (like the JavaScript Library), and properly integrates with 
the Access UI.

### User Token

The user token is a piece of data that’s passed between the Resource Access API, Access UI, and the consumer’s web browser. 
It’s also used by API clients (CMS plugins) that enforce server-side access control. This token identifies a user, 
the time the token was generated, and an HMAC token to prevent tampering. It’s used to manage authentication state over 
the wide range of servers, clients, and systems using iMoneza.

The user token is designed to be transparent to end users. It can only be retrieved via the Access API, and is designed 
to be stored as a cookie.

There are also temporary user tokens. These are single-use tokens that can also be used by the Access API to return 
resource access data. However, a temporary user token cannot be stored as a cookie, as it’s immediately invalidated after 
the first time it’s used. However, the one-time Temporary User Token will return a user token which can be stored.

iMoneza API Consumers (CMS plugins) must receive, store, and transmit the user token. The user token is not designed to be
interpreted by any third party - any attempts to parse and extract data from the token are unsupported and might break in the future. 
Instead, just use the user token and Resource Access API to get data about a user.

### Server-side Access Control

The following is an overview of the server-side resource access control mechanism. This is the general process that 
should be implemented by iMoneza consumers that enforce access control.

1.	The user requests a page.  
2.	The CMS plugin calls the Resource Access API, which returns resource access data. 
  * If the page request includes an `iMonezaTUT` parameter, a `GET `request to the endpoint `/api/TemporaryUserToken/{apiKey}/{temporaryUserToken}` is performed.  
  * Otherwise, a `GET` request to the endpoint `/api/Resource/{apiKey}/resourceKey?UserToken={userToken}&ResourceURL={url}` is performed.  The `userToken `is optional. This should be sent if it exists (having been previously set with a cookie).  
3.	The CMS plugin processes the resource access data.  
  * The returned data will include a `UserToken`. The CMS plugin should store this as a cookie.  
  * If the returned data includes a non-empty `AccessActionURL`, the CMS plugin should redirect the user to that URL.  In order for iMoneza to redirect back to the resource (or any other page), add a `get` parameter of `originalURL` that points to the destination after purchase. 
  * If the returned data does not include a non-empty `AccessActionURL`, the CMS plugin should serve the resource to the user.  

Note that anytime a user token is returned, regardless of which API endpoint created it, the CMS plugin should store it. 
The token returned from every request will be different.  

The following three use cases explain how the above control flow is used to secure resources.  

**USE CASE 1: UNAUTHENTICATED USER PURCHASES RESOURCE**  

1.	User requests page.  
2.	Website calls Resource Access API endpoint `/api/Resource/{apiKey}/{resourceKey}` without a user token  
3.	Resource Access API returns resource access data which contains `UserToken` and `AccessActionURL`.  
4.	Website stores `UserToken` as a cookie.  
5.	Website redirects user to `AccessActionURL`  
6.	User authenticates at iMoneza website, processes purchase, and redirects back to original page with an `iMonezaTUT` appended to the URL.  
7.	Website calls Resource Access API endpoint `/api/TemporaryUserToken/{apiKey}/{temporaryUserToken}` with the value from the `iMonezaTUT` parameter.  
8.	Resource Access API returns resource access data which contains `UserToken` but not `AccessActionURL`.  
9.	Website stores `UserToken` as a cookie.  
10.	Website serves resource to user.  

**USE CASE 2: AUTHENTICATED USER GRANTED ACCESS**  

1.	User requests page.  
2.	Website calls Resource Access API endpoint `/api/Resource/{apiKey}/{resourceKey}` with a user token (which was previously stored as a cookie).  
3.	Resource Access API returns resource access data which contains a new `UserToken`.  
4.	Website stores `UserToken`.  
5.	Website serves resource to user.  

**USE CASE 3: DYNAMIC RESOURCE CREATION SPIDER GRANTED ACCESS**  

1.	Spider requests page with an `iMonezaTUT` appended to the URL.  
2.	Website calls Resource Access API endpoint `/api/TemporaryUserToken/{apiKey}/{temporaryUserToken}` with the `iMonezaTUT`.  
3.	Resource Access API returns resource access data which contains `UserToken`.  
4.	Website stores `UserToken`.  
5.	Website serves resource to spider.  

