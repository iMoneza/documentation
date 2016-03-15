---
title: API Overview | iMoneza Documentation
---
## API OVERVIEW

iMoneza provides REST APIs over SSL to the iMoneza platform.  Each API accepts and responds using either JSON or XML.  
Each individual API has it's own API Key and Secret.

There are two APIs that iMoneza makes available.  

### Resource Management API
This API is used for managing resource data, providing merchants access to certain resource-level configuration without 
needing to use the Management UI. It does not provide mechanisms for configuring a property, the access models on a 
property, or the pricing models (pricing groups, subscriptions, etc.) for a property. It does, however, give API consumers 
access to that data (the data just can’t be edited). The API provides full access to resource-specific data. API consumers, 
therefore, can list, add, edit, and delete resources. For a given resource, they can set basic settings (name), metadata 
(page title, URL, publication date), assign a pricing group, or override the assigned pricing group. This API also 
exposes external subscriber data.

### Resource Access API 
The Resource Access API is used for access control, validating a user's access to content. Plugins can use this API to 
perform server-side access control. The API also gives the plugin access data about the user, like their username, 
purchase/subscription status, and quota hit count. A plugin that enforces server-side access control must follow certain 
rules to properly validate users.  
  
### API Details

Let's look at some of the details for using an iMoneza API.

**DATA FORMAT**  
The APIs support both JSON and XML data. When a client makes an API request, the HTTP `Content-Type` header is used to 
indicate the format of the payload. Likewise, the client can use the `Accept` header to indicate the format of the data 
returned from the call. Values of `application/json` and `text/json` will return JSON; values of `application/xml` and 
`text/xml` will return XML.

**API KEYS**  
An iMoneza property can have an unlimited number of API key sets issued by iMoneza. Each key set consists of an access 
key and a secret key. The access key can be shared, but the secret key should never appear in any public code or be 
shared with any third-party. Property administrators can revoke key sets at any time.

All Management API keys for a property have the same permissions for that property, allowing access to the full set of 
Management API features. Likewise, all Resource Access API keys for a property have the same permissions for that property. 
However, Resource Access API keys cannot be used on the Management API and vice versa.

**AUTHENTICATION TOKEN**  
All APIs are protected by a hashed authentication token calculated for each request. Requests without a token or with an
invalid token return a 401 error.

The token consists of four pieces of data combined together with newline characters to form the "base string." The base 
string is then binary SHA-256 hashed using the secret key.  Finally, base64 encode the hash. The four pieces 
of data used to create the base string are:  

| Item | Description | Example |
| ---- | ----------- | ------- |
| HTTP Method | This should reflect the method used for this request and be in all caps. | PUT |
| Timestamp | The timestamp should be based on the UTC time and formatted according to [RFC 1123](https://tools.ietf.org/html/rfc1123). | Thu, 10 Apr 2008 13:30:00 GMT |
| The URI of the request | When generating the hashed token, this value should be all in lowercase.  (Please note that the URI does not include any parameters or query strings) | /api/property/bb772a5b-1e7b-461c-8ac6-ca9e6e2fd2b9 |
| Query string parameters | Should be an ampersand-joined list of query string names and values.  The parameters names should be alphabetically ordered.  Both names and values should be lowercase and not URI encoded. | includepropertydata=true |

The HTTP `Authentication` header should contain the public API key, followed by a colon, followed by the hashed base string. 
The client must also send a `Timestamp` header that includes the timestamp (in RFC 1123 format) used in the authentication token.

Here’s an example request showing how this token is constructed. A client is trying to request property data 
(via the Resource Management API) for a property with the access key of `BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9`, so the 
client is requesting the URI `/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9`. There are no additional parameters being passed. 
The base string for the authentication token consists of:   

    GET\nTue, 08 Jul 2014 21:15:27 GMT\n/api/property/bb772a5b-1e7b-461c-8ac6-ca9e6e2fd2b9\n

Note that the "\n" characters are displayed here for clarity, but would actually be encoded as newline characters. 
Also note that, although there are no parameters passed, there is a trailing newline character before the empty string 
with the parameters.

Here's what the final HTTP request looks like:

    GET http://localhost:48687/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9 HTTP/1.1
    Timestamp: Tue, 08 Jul 2014 21:15:27 GMT
    Authentication: BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9:plC2h0VUCPmEkkzuqmpLs+wfqYV/BMct+ROdwOTHxrU=
    Accept: application/json

Here is the base string for a request for a resource that includes an `includePropertyData` parameter in the query string:  

     GET\nTue, 08 Jul 2014 21:15:27 GMT\n/api/property/bb772a5b-1e7b-461c-8ac6-ca9e6e2fd2b9/resource/1\nincludepropertydata=true

Here’s what the final HTTP request looks like for this second example:

    GET http://localhost:48687/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9/Resource/1?includePropertyData=true HTTP/1.1
    Timestamp: Tue, 08 Jul 2014 21:15:27 GMT
    Authentication: BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9:y8s48zxCy62NXUFe5699i7vktOpLvDnt2TCifpZDzJw=  
    Accept: application/json
    Connection: Keep-Alive


**CALLBACKS**  
The Management API allows merchants to expose endpoints to which iMoneza can initiate a connection when an event occurs. 
The merchant provides a callback URL to iMoneza, and iMoneza makes a call to this URL to notify the merchant of an event. 
This effectively allows for push notifications.

When a merchant creates a Management API key, they can also define a merchant-hosted endpoint for API callbacks. 
There’s a single callback URL; all calls that iMoneza makes to that URL will include an identifier of the type of callback 
being performed. Exactly one callback URL is allowed for every Management API key. If a merchant needs more than one 
callback URLs, they can create additional API keys.

When iMoneza calls the merchant-hosted callback URL, it includes a callback type and a token. No event-specific data is 
included in the request. The merchant then calls an endpoint on the iMoneza API that accepts an event type and token as 
a parameter. iMoneza then returns data specific to the callback event.

An example execution flow looks like:

1. Merchant requests an external subscriber import
  * Merchant calls `POST /api/Property/{apiKey}/ExternalSubscriberImport`
  * iMoneza returns a unique ID
2. iMoneza spends time processing the import
3. iMoneza completes job and notifies merchant via a request to the merchant's callback URL
  * iMoneza calls `GET {merchantCallbackURL}?CallbackType=ExternalSubscriberImportCompleted&CallbackToken={callbackToken}`
4. Merchant requests the callback results
  * Merchant calls `GET /api/Property/{apiKey}/CallbackResult/{callbackToken}`
  * iMoneza returns the callback result data
  
The merchant-hosted callback endpoint must use HTTPS, not HTTP. iMoneza will apply the same tokenization scheme to all 
requests to the merchant that the merchant is required to use for requests to iMoneza, with iMoneza using the same access
key/secret key combination. For the merchant's own security, it is very strongly recommended that the merchant verify the 
token on every request. Failure to do so leaves the merchant's web service vulnerable to certain types of attacks.

Merchants should return an HTTP status of "200 OK" when they receive a callback from iMoneza. 
Other status codes indicate failure; individual failed callbacks will be repeated up to 2 additional times. 
After a given callback fails 3 times, iMoneza will cease to attempt making sending that callback. 
Other callback messages are unaffected by the failure of a single message.

Callback results are valid for 24 hours. iMoneza will automatically delete responses older than 24 hours.
