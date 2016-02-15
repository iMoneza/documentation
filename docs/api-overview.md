---
layout: documentation
title: API Overview | iMoneza Documentation
---
## API OVERVIEW

There are two APIs that iMoneza makes available to CMS plugins.  

* The Resource Management API is used for managing resource data, providing merchants access to certain resource-level configuration without needing to use the Management UI. It does not provide mechanisms for configuring a property, the access models on a property, or the pricing models (pricing groups, subscriptions, etc.) for a property. It does, however, give API consumers access to that data (the data just can’t be edited). The API provides full access to resource-specific data. API consumers, therefore, can list, add, edit, and delete resources. For a given resource, they can set basic settings (name), metadata (page title, URL, publication date), assign a pricing group, or override the assigned pricing group.   
* The Resource Access API is used for access control, validating a user’s access to content. Plugins can use this API to perform server-side access control. The API also gives the plugin access data about the user, like their username, purchase/subscription status, and quota hit count. A plugin that enforces server-side access control must follow certain rules to properly validate users.  
  
Both APIs exposes a set of RESTful services that serialize data to common formats (JSON, XML, etc.), essentially making them platform-agnostic and capable of interacting with a wide range of consumers.

Both APIs are protected by a hashed authentication token calculated for each request. API operations also occur over an SSL connection. Every API consumer must generate a set of API keys (which only a property administrator can do) before it can be used. API keys are tied to a specific property, so the keys aren’t tied to specific plugins but to plugin instances. For instance, if someone creates a Drupal plugin that uses this API, no API keys are required for the plugin itself. However, every property that implements the plugin will need a property administrator to generate a set of API keys (an access key and a secret key) for it.  

### DATA FORMATS

The APIs support both JSON and XML data. When a client makes an API request, the HTTP “Content-Type” header is used to indicate the format of the payload. Likewise, the client can use the “Accept” header to indicate the format of the data returned from the call. Values of “application/json” and “text/json” will return JSON; values of “application/xml” and “text/xml” will return XML.

### API KEYS

An iMoneza property can have an unlimited number of API key sets issued by iMoneza. Each key set consists of an access key and a secret key. The access key can be shared, but the secret key should never appear in any public code or be shared with any third-party. Property administrators can revoke key sets at any time.

All Resource Management API keys for a property have the same permissions for that property, allowing access to the full set of Resource Management API features. Likewise, all Resource Access API keys for a property have the same permissions for that property. However, Resource Access API keys cannot be used on the Resource Management API and vice versa.

### AUTHENTICATION TOKEN

Every API request must include an authentication token. Requests without a token or with an invalid token return a 401 error.

The token consists of four pieces of data combined together with newline characters to form the “base string”. The base string is then SHA-256 hashed using the secret key in binary format.  Finally, base64 encode the hash. The four pieces of data used to create the base string are:  

* The HTTP method. This should be “GET” or “PUT”, and must be in all caps.  
* The timestamp. The timestamp should be based on UTC time and formatted following the specifications of RFC 1123. An example of this format would be “Thu, 10 Apr 2008 13:30:00 GMT”.  
* The URI of the document being requested. When generating the hashed token, this value should be in all lowercase. It does not include any query string/URL parameters (any part of the URL from the question mark on). An example would be “/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9”.  
* An ampersand-separated list of all the query string/URL parameter names and values. The parameters should be in alphabetical order by name, with an equal sign between the name and value. When generating the hashed token, both names and values should be lowercased and should not be URI encoded. An example of this would be “includepropertydata=true”.  

The HTTP “Authentication” header should contain the public key, followed by a colon, followed by the hashed base string. The client must also send a “Timestamp” header that includes the timestamp (in RFC 1123 format) used in the base string.

Here’s an example request showing how this token is constructed. A client is trying to request property data (via the Resource Management API) for a property with the access key of “BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9”, so the client is requesting the URI “/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9”. There are no additional parameters being passed. The base string consists of:   

    GET\nTue, 08 Jul 2014 21:15:27 GMT\n/api/property/bb772a5b-1e7b-461c-8ac6-ca9e6e2fd2b9\n

Note that the “\n” characters are displayed here for clarity, but would actually be encoded as newline characters. Also note that, although there are no parameters passed, there is a trailing newline character before the empty string with the parameters.

Here is the base string for a request for a resource that includes an includePropertyData parameter in the query string:  

     GET\nTue, 08 Jul 2014 21:15:27 GMT\n/api/property/bb772a5b-1e7b-461c-8ac6-ca9e6e2fd2b9/resource/1\nincludepropertydata=true

Note that here, because there are parameters, there is no trailing newline character.

In the first example, here’s what the final HTTP request looks like:

    GET http://localhost:48687/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9 HTTP/1.1
    Timestamp: Tue, 08 Jul 2014 21:15:27 GMT
    Authentication: BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9:plC2h0VUCPmEkkzuqmpLs+wfqYV/BMct+ROdwOTHxrU=
    Accept: application/json

In the second example, here’s what the final HTTP request looks like:

    GET http://localhost:48687/api/Property/BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9/Resource/1?includePropertyData=true HTTP/1.1
    Timestamp: Tue, 08 Jul 2014 21:15:27 GMT
    Authentication: BB772A5B-1E7B-461C-8AC6-CA9E6E2FD2B9:y8s48zxCy62NXUFe5699i7vktOpLvDnt2TCifpZDzJw=  
    Accept: application/json
    Connection: Keep-Alive

The response does not contain any token or hash.

### CALLBACKS

The Management API allows merchants to expose endpoints to which iMoneza can initiate a connection when an event occurs. The merchant provides a callback URL to iMoneza, and iMoneza makes a call to this URL to notify the merchant of an event. This effectively allows for push notifications.

When a merchant creates a Management API key, they can also define a merchant-hosted endpoint for API callbacks. There’s a single callback URL; all calls that iMoneza makes to that URL will include an identifier of the type of callback being performed. Exactly one callback URL is allowed for every Management API key. If a merchant needs more than one callback URLs, they can create additional API keys.

When iMoneza calls the merchant-hosted callback URL, it includes two bits of data – a callback type and a token. No event-specific data is included in the request. The merchant then calls an endpoint on the iMoneza API that accepts an event type and token as a parameter; iMoneza then returns data specific to the callback event.

An example execution flow looks like:

1. Merchant requests an external subscriber import
  1. Merchant calls `POST /api/Property/{apiKey}/ExternalSubscriberImport`
    1. iMoneza returns an unique ID
2. iMoneza process the import
3. Upon completion, iMoneza makes a request to the merchant’s callback URL
  1. iMoneza calls `GET {merchantCallbackURL}?CallbackType=ExternalSubscriberImportCompleted&CallbackToken={callbackToken}`
  2. Merchant returns an HTTP 200
4. Merchant requests the callback results
  1. Merchant calls `GET /api/Property/{apiKey}/CallbackResult/{callbackToken}`
  2. iMoneza returns the callback result data
  3. The callback result data includes the ID iMoneza originally sent in step 1.a.i.
  
The merchant-hosted callback endpoint must use HTTPS, not HTTP. iMoneza will apply the same HMAC tokenization scheme to all requests to the merchant that the merchant is required to use for requests to iMoneza, with iMoneza using the same access key/secret key combination. For the merchant’s own security, it is very strongly recommended that the merchant verify the HMAC token on every request. Failure to do so leaves the merchant’s web service vulnerable to certain types of attacks, like replay attacks.

Merchants should return an HTTP status of “200 OK” when they receive a callback from iMoneza. Other status codes indicate failure; individual failed callbacks will be repeated up to 2 additional times. After a given callback fails 3 times, iMoneza will cease to attempt making sending that callback. Other callback messages are unaffected by the failure of a single message.

Callback results are valid for 24 hours. iMoneza will automatically delete responses older than 24 hours.
