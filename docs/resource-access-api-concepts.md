---
title: Resource Access API Concepts | iMoneza Documentation
---
## Resource Access API Concepts

The Resource Access API places stronger requirements on API consumers than the Resource Management API. API consumers can implement server-side access control, but must follow a certain set of rules to ensure access control is correctly implemented, compatible with access control alternatives (like the JavaScript Library), and properly integrates with the Access UI.

### User Token

The user token is a piece of data that’s passed between the Resource Access API, Access UI, and the consumer’s web browser. It’s also used by API clients (CMS plugins) that enforce server-side access control. This token identifies a user, the time the token was generated, and an HMAC token to prevent tampering. It’s used to manage authentication state over the wide range of servers, clients, and systems using iMoneza.

The user token is designed to be transparent to end users. It can only be retrieved via the Access API, and is designed to be stored as a cookie.

There are also temporary user tokens. These are single-use tokens that can also be used by the Access API to return resource access data. However, a temporary user token cannot be stored as a cookie, as it’s immediately invalidated after the first time it’s used. However, the one-time Temporary User Token will return a user token which can be stored.

Resource Access API consumers (CMS plugins or custom coded websites) must receive, store, and transmit the user token. The user token is not designed to be interpreted by any consumer - any attempts to parse and extract data from the token are unsupported and might break in the future. Instead, just use the user token and Resource Access API to get data about a user.

When the Resource Access API sends a user token to a consumer, it also sends an expiration date for the user token. When the consumer creates a cookie with the user token, it should set the cookie to expire at the specified date. If no expiration date is provided, the cookie should not have an expiration date (and therefore be non-persistent).

### Server-side Access Control

Server-side access control is the ability of a web site or CMS to enforce access control at the server level, rather than relying entirely on the JavaScript Library running on the client side. Enforcing access control at the server level reduces user's ability to bypass access restrictions (like seeing the paywall).

There are two basic approaches to server-side access control:

1. *Redirection-based.* In this approach, whenever the server receives a page request, it makes a request to the Resource Access API to verify the user has access to the resource. If the user does, the server simply serves the page as usual; if the user doesn't have access, the server issues a redirect to the Access UI (the paywall). The JavaScript Library isn't used at all; all aspects of access control occur on the server.
2. *AJAX-based.* In this approach, whenever the server receives a page request, it only serves a portion of the page. A short summary or teaser of the protected content is served, but the majority of it is not. The JavaScript Library is still used and runs in the user's web browser. Once the JavaScript Library has verified whether or not the user has access to the resource, custom JavaScript code makes an AJAX request to the server to retrieve the rest of the protected content. When the server receives the AJAX request, it calls the Resource Access API to validate the user's access before serving the full content.
 
The AJAX-based approach provides a much better user experience, since it allows use of embedded elements (like the embedded paywall, embedded confirmation, and embedded ad blocker detection), and is the recommended approach. However, depending on the CMS/website, it can be more difficult to develop.

### Redirection-Based Approach

The following is an overview of the redirection-based server-side resource access control mechanism. This is the general process that should be implemented by iMoneza consumers that enforce access control.

1.	The user requests a page.  
2.	The CMS plugin calls the Resource Access API, which returns resource access data. 
  * If the page request includes an `iMonezaTUT` parameter, a `GET` request to the endpoint `/api/TemporaryUserToken/{apiKey}/{temporaryUserToken}` is performed.  
  * Otherwise, a `GET` request to the endpoint `/api/Resource/{apiKey}/{resourceKey}?UserToken={userToken}&ResourceURL={url}` is performed.  The `userToken` is optional, but should be sent if it exists (having been previously set with the `iMonezaUT` cookie).  
3.	The CMS plugin processes the resource access data.  
  * The returned data will include a `UserToken` and `UserTokenExpiration`. The CMS plugin should store the `UserToken` as a cookie named `iMonezaUT` that expires at `UserTokenExpiration`. If the expiration date is empty, the cookie should be stored without an expiration date (a non-persistent or session cookie).
  * If the returned data includes a non-empty `AccessActionURL`, the CMS plugin should redirect the user to that URL.  In order for iMoneza to redirect back to the resource (or any other page), add a `get` parameter of `originalURL` that points to the destination after purchase. 
  * If the returned data does not include a non-empty `AccessActionURL`, the CMS plugin should serve the resource to the user.  

Note that anytime a user token is returned, regardless of which API endpoint created it, the CMS plugin should store it. The token returned from every request will be different.  

The following three use cases explain how the above control flow is used to secure resources.  

#### Use Case 1: Unauthenticated User Purchases Resource

1.	User requests page.  
2.	Website calls Resource Access API endpoint `/api/Resource/{apiKey}/{resourceKey}` without a user token  
3.	Resource Access API returns resource access data which contains `UserToken`, `UserTokenExpiration`, and `AccessActionURL`.  
4.	Website stores `UserToken` as a cookie named `iMonezaUT` that expires at `UserTokenExpiration`.  
5.	Website redirects user to `AccessActionURL`  
6.	User authenticates at iMoneza website, processes purchase, and redirects back to original page with an `iMonezaTUT` appended to the URL.  
7.	Website calls Resource Access API endpoint `/api/TemporaryUserToken/{apiKey}/{temporaryUserToken}` with the value from the `iMonezaTUT` parameter.  
8.	Resource Access API returns resource access data which contains `UserToken` and `UserTokenExpiration` but not `AccessActionURL`.  
9.	Website stores `UserToken` as a cookie named `iMonezaUT` that expires at `UserTokenExpiration`.  
10.	Website serves resource to user.  

#### Use Case 2: Authenticated User Granted Access

1.	User requests page.  
2.	Website calls Resource Access API endpoint `/api/Resource/{apiKey}/{resourceKey}` with a user token (which was previously stored as a cookie).  
3.	Resource Access API returns resource access data which contains a new `UserToken` and `UserTokenExpiration`.  
4.	Website stores `UserToken` as a cookie named `iMonezaUT` that expires at `UserTokenExpiration`. 
5.	Website serves resource to user.  

#### Use Case 3: Dynamic Resource Creation Spider Granted Access

1.	Spider requests page with an `iMonezaTUT` appended to the URL.  
2.	Website calls Resource Access API endpoint `/api/TemporaryUserToken/{apiKey}/{temporaryUserToken}` with the `iMonezaTUT`.  
3.	Resource Access API returns resource access data which contains `UserToken` and `UserTokenExpiration`.  
4.	Website stores `UserToken` as a cookie named `iMonezaUT` that expires at `UserTokenExpiration`.
5.	Website serves resource to spider.  

### AJAX-Based Approach

This is the general process that should be implemented by iMoneza consumers that enforce AJAX-based server-side access control.

1.	The user requests a page.
2.	The consumer website ensures that a response is served with the protected content truncated, removed, or replaced.
  * For instance, it may return only the first 100 words of the protected content, or it could return a summary instead of the actual content.
  * The rest of the page, outside the protected content, would be returned as usual.
  * A reference to the JavaScript Library would be included in the response, including a custom `onAccessGranted` callback function.
  * (Note: A dynamic resource creation XML block can still be present)  
3.	The JavaScript Library runs in the user's web browser, determining if the user has access to the resource.
  * The JavaScript Library will set a cookie named `iMonezaUT` that contains the user token.
4.	If/once the user has access (for instance, after purchasing the item through the paywall), the JavaScript Library calls a custom `onAccessGranted` callback function (previously added to the page by the website in step 2).
5.	The custom `onAccessGranted` function performs an AJAX request back to the website.
6.	While processing the AJAX request, the website makes a call to the Resource Access API to verify the user has access to the resource.
  * A `GET` request to the endpoint `/api/Resource/{apiKey}/{resourceKey}?UserToken={userToken}&ResourceURL={url}` is performed.  The `userToken` contains the value of the `iMonezaUT` cookie set by the JavaScript Library.
  * If the `AccessActionURL` value returned by the Resource Access API is empty, the website then serves the full content for the resource, and the custom `onAccessGranted` function renders the successful result.
  * If the `AccessActionURL` value returned by the Resource Access API is not empty, the user does not have access. The website returns a 403 error and the custom `onAccessGranted` doesn't make any changes to the page.

One advantage of the AJAX-based approach is that no special accommodations need to be made to handle the `iMonezaTUT` URL parameter.
