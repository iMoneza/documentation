---
layout: documentation
title: Resource Management API | iMoneza Documentation
---

## Management API: External Subscribers

### External Subscriber Linking

#### Callback: External Subscriber Linked

    GET {merchantCallbackURL}?CallbackType=ExternalSubscriberLinked&CallbackToken={callbackToken}

iMoneza makes a request against the merchant’s callback URL when a new external subscriber is linked.

#### Callback Result: External Subscriber Linked

    GET /api/Property/{apiKey}/CallbackResult/{callbackToken}
    
After a new external subscriber has been linked, a merchant can make this call to iMoneza to retrieve data about the linked user.

An example of the result data is below. The `Subscriber` element uses the same schema as the current external subscriber export data, but will only contain the `DemographicFields` element and not the `Subscriptions` element.

#### Example XML Callback Result

    <Subscriber xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <SubscriberKey>ABC-123</SubscriberKey>
      <Users>
        <User ApplicationUserID="43f4c9e1-00fe-4520-8311-929c5351a637">
          <DemographicFields>
            <DemographicField Name="EmailAddress">john.doe@fake.com</DemographicField>
            <DemographicField Name="PhoneNumber">555-555-5555</DemographicField>
          </DemographicFields>
          <Subscriptions />
        </User>
      </Users>
    </Subscriber>

#### Example JSON Callback Result

    {
      "SubscriberKey": "ABC-123",
      "Users": [
        {
          "ApplicationUserID": "43f4c9e1-00fe-4520-8311-929c5351a637",
          "DemographicFields": [
            {
              "Name": "EmailAddress",
              "Value": "john.doe@fake.com"
            },
            {
              "Name": "PhoneNumber",
              "Value": "555-555-5555"
            }
          ],
          "Subscriptions": []
        }
      ]
    }
    
### Eligible Subscription Purchases

#### Callback: Eligible Subscription Purchased

    GET {merchantCallbackURL}?CallbackType=EligibleSubscriptionPurchased&CallbackToken={callbackToken}
    
iMoneza makes a request against the merchant’s callback URL when an eligible subscription is purchased.

#### Callback Result: Eligible Subscription Purchased

    GET /api/Property/{apiKey}/CallbackResult/{callbackToken}

After an eligible subscription has been purchased, a merchant can make this call to iMoneza to retrieve data about the purchase.

An example of the result data is below. The `Subscriber` element uses the same schema as the current external subscriber export data.

#### Example XML Callback Result

    <Subscriber xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <SubscriberKey>ABC-123</SubscriberKey>
      <Users>
        <User ApplicationUserID="43f4c9e1-00fe-4520-8311-929c5351a637">
          <DemographicFields>
            <DemographicField Name="EmailAddress">john.doe@fake.com</DemographicField>
            <DemographicField Name="PhoneNumber">555-555-5555</DemographicField>
          </DemographicFields>
          <Subscriptions>
            <Subscription>
              <SubscriptionKey>Digital-All-Access</SubscriptionKey>
              <ExpirationDate>2016-01-09T16:27:11.7713801Z</ExpirationDate>
            </Subscription>
          </Subscriptions>
        </User>
      </Users>
    </Subscriber>
    
#### Example JSON Callback Result    
    {
      "SubscriberKey": "ABC-123",
      "Users": [
        {
          "ApplicationUserID": "43f4c9e1-00fe-4520-8311-929c5351a637",
          "DemographicFields": [
            {
              "Name": "EmailAddress",
              "Value": "chris.wilson@northwoodsoft.com"
            },
            {
              "Name": "PhoneNumber",
              "Value": ""
            }
          ],
          "Subscriptions": [
            {
              "SubscriptionKey": "Digital-All-Access",
              "ExpirationDate": "2016-01-09T16:27:11.7713801Z"
            }
          ]
        }
      ]
    }
    
### External Subscribers

#### Endpoint: Add/Update Single External Subscriber

    PUT /api/Property/{apiKey}/ExternalSubscriber/{subscriberKey}
    
Adds or updates a single external subscriber.

Below is an example of the payload data. The `<Subscriber>` element uses the same schema as the `<Subscriber>` element in an XML export.

Here's an example is XML format:

    <Subscriber xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <SubscriberKey>ABC-123</SubscriberKey>
      <MaximumLinkedUsers>5</MaximumLinkedUsers>
      <ValidationFields>
        <ValidationField Name="PrintSubscriptionNumber">12345678</ValidationField>
        <ValidationField Name="ZipCode">53211</ValidationField>
      </ValidationFields>
      <EligibleSubscriptions>
        <EligibleSubscription SubscriptionGroupKey="Digital-All-Access" EligibilityEndDate="2015-11-16T13:30:00Z" />
      </EligibleSubscriptions>
      <AutomaticSubscriptions>
        <AutomaticSubscription SubscriptionGroupKey="Digital-Basic" ExpirationDate="2015-11-09T19:00:00Z" />
      </AutomaticSubscriptions>
    </Subscriber>
    
Here is an example is JSON format:

    {
      "SubscriberKey": "ABC-123",
      "MaximumLinkedUsers": 5,
      "ValidationFields": [
        {
          "Name": "PrintSubscriptionNumber",
          "Value": "12345678"
        },
        {
          "Name": "ZipCode",
          "Value": "53211"
        }
      ],
      "EligibleSubscriptions": [
        {
          "SubscriptionGroupKey": "Digital-All-Access",
          "EligibilityEndDate": "2015-11-16T13:30:00Z"
        }
      ],
      "AutomaticSubscriptions": [
        {
          "SubscriptionGroupKey": "Digital-Basic",
          "ExpirationDate": "2015-11-09T19:00:00Z"
        }
      ]
    }
    
#### Endpoint: Get Single External Subscriber Linked Users

    GET /api/Property/{apiKey}/ExternalSubscriber/{subscriberKey}/LinkedUser

Returns a single external subscriber, identified by `subscriberKey`, and the users iMoneza users linked to that subscriber.

Below is an example of the returned data. The `<Subscriber>` element uses the same schema as the `<Subscriber>` element in an XML export.

Here is an example in XML format:

    <Subscriber xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <SubscriberKey>ABC-123</SubscriberKey>
      <Users>
        <User ApplicationUserID="43f4c9e1-00fe-4520-8311-929c5351a637">
          <DemographicFields>
            <DemographicField Name="EmailAddress">john.doe@fake.com</DemographicField>
            <DemographicField Name="PhoneNumber">555-555-5555</DemographicField>
          </DemographicFields>
          <Subscriptions>
            <Subscription>
              <SubscriptionKey>Digital-All-Access</SubscriptionKey>
              <ExpirationDate>2016-01-09T16:27:11.77</ExpirationDate>
            </Subscription>
          </Subscriptions>
        </User>
      </Users>
    </Subscriber>
    
Here is an example in JSON format:

    {
      "SubscriberKey": "ABC-123",
      "Users": [
        {
          "ApplicationUserID": "43f4c9e1-00fe-4520-8311-929c5351a637",
          "DemographicFields": [
            {
              "Name": "EmailAddress",
              "Value": "john.doe@fake.com"
            },
            {
              "Name": "PhoneNumber",
              "Value": "555-555-5555"
            }
          ],
          "Subscriptions": [
            {
              "SubscriptionKey": "Digital-All-Access",
              "ExpirationDate": "2016-01-09T16:27:11.77"
            }
          ]
        }
      ]
    }
    
### External Subscriber Imports

#### Endpoint: Create External Subscriber Import

    POST /api/Property/{apiKey}/ExternalSubscriberImport
    
Begins an external subscriber import, adding or updating multiple external subscribers. Only external subscriber data is added/updated. This is equivalent to initiating an XML file import.

As with the existing XML file import, this import is incremental. Any existing data is preserved unchanged; only data explicitly provided in the import is added or updated.

Below is an example of the payload data. The `<Subscribers>` element uses the same schema as the `<Subscribers>` element in an XML import.

Here’s an example in XML format:

    <ExternalSubscriberImport>
      <Data>
        <Subscribers>
          <Subscriber>
            <SubscriberKey>ABC-123</SubscriberKey>
            <MaximumLinkedUsers>5</MaximumLinkedUsers>
            <ValidationFields>
              <ValidationField Name="PrintSubscriptionNumber">12345678</ValidationField>
              <ValidationField Name="ZipCode">53211</ValidationField>
            </ValidationFields>
            <EligibleSubscriptions>
              <EligibleSubscription SubscriptionGroupKey="Digital-All-Access" EligibilityEndDate="2015-08-16T13:30:00Z" />
            </EligibleSubscriptions>
            <AutomaticSubscriptions>
              <AutomaticSubscription SubscriptionGroupKey="Digital-Basic" ExpirationDate="2015-08-09T19:00:00Z" />
            </AutomaticSubscriptions>
          </Subscriber>
          <Subscriber>
            <SubscriberKey>XYZ-234</SubscriberKey>
            <MaximumLinkedUsers>5</MaximumLinkedUsers>
            <ValidationFields>
              <ValidationField Name="PrintSubscriptionNumber">23456789</ValidationField>
              <ValidationField Name="ZipCode">53202</ValidationField>
            </ValidationFields>
            <AutomaticSubscriptions>
              <AutomaticSubscription SubscriptionGroupKey="Digital-Basic" ExpirationDate="2015-08-09T19:00:00Z" />
            </AutomaticSubscriptions>
          </Subscriber>
        </Subscribers>
      </Data>
    </ExternalSubscriberImport>
    
Here is an example in JSON format:

    {
      "Data": {
        "Subscribers": [
          {
            "SubscriberKey": "ABC-123",
            "MaximumLinkedUsers": "5",
            "ValidationFields": [
              {
                "Name": "PrintSubscriptionNumber",
                "Value": "12345678"
              },
              {
                "Name": "ZipCode",
                "Value": "53211"
              }
            ],
            "EligibleSubscriptions": [
              {
                "SubscriptionGroupKey": "Digital-All-Access",
                "EligibilityEndDate": "2015-08-16T13:30:00Z"
              }
            ],
            "AutomaticSubscriptions": [
              {
                "SubscriptionGroupKey": "Digital-Basic",
                "ExpirationDate": "2015-08-09T19:00:00Z"
              }
            ]
          },
          {
            "SubscriberKey": "XYZ-234",
            "MaximumLinkedUsers": "5",
            "ValidationFields": [
              {
                "Name": "PrintSubscriptionNumber",
                "Value": "23456789"
              },
              {
                "Name": "ZipCode",
                "Value": "53202"
              }
            ],
            "AutomaticSubscriptions": [
              {
                "SubscriptionGroupKey": "Digital-Basic",
                "ExpirationDate": "2015-08-09T19:00:00Z"
              }
            ]
          }
        ]
      }
    }
    
The API doesn't process the data immediately. Instead, the request is queued. A unique ID is generated for the request and sent back to the consumer immediately. So a response looks like:

    <ExternalSubscriberImport>
      <ID>e63f94b4-247f-405d-9222-af01507271ec|0635781205314830634</ID>
      <Status>Queued</Status>
    </ExternalSubscriberImport>
    
The comparable response in JSON would look like:

    {
      "ID": "e63f94b4-247f-405d-9222-af01507271ec|0635781205603107443",
      "NotificationEmailAddress": null,
      "Status": "Queued"
    }
    
Once the import has been processed, iMoneza calls the merchant-hosted callback function.

#### Callback: External Subscriber Import Completed

    GET {merchantCallbackURL}?CallbackType=ExternalSubscriberImportCompleted&CallbackToken={callbackToken}}&ExternalSubscriberImportID={externalSubscriberImportID}

iMoneza makes a request against the merchant’s callback URL when an external subscriber import has completed.

#### Callback Result: Get External Subscriber Import Result

    GET /api/Property/{apiKey}/CallbackResult/{callbackToken}
    
After the merchant receives the callback, they can retrieve the callback result. It contains information about the external subscriber import, including any errors that occurred while processing.

Here's an example in XML format:

    <ExternalSubscriberImportResult xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <Status>Completed successfully</Status>
      <Errors />
      <SuccessCount>2</SuccessCount>
      <FailureCount>0</FailureCount>
    </ExternalSubscriberImportResult>

Here’s an example in JSON format:

    {
      "Status": "Completed successfully",
      "Errors": [],
      "SuccessCount": 2,
      "FailureCount": 0
    }
    
### External Subscriber Exports

#### Endpoint: Create External Subscriber Export

    POST /api/Property/{apiKey}/ExternalSubscriberExport
    
Begins an external subscriber export. This is equivalent to initiating an XML export.

The payload data should contain a date range. The data returned in the export will include all incremental changes (adds and updates) that occurred during the specified date range. An XML example:

    <ExternalSubscriberExport>
      <StartDate>2015-08-09T19:00:00Z</StartDate>
      <EndDate>2015-10-09T19:00:00Z</EndDate>
    </ExternalSubscriberExport>

And the comparable JSON example:

    {
        "StartDate": "2015-07-01T12:00:00Z",
        "EndDate": "2015-11-01T12:00:00Z"
    }
    
The API doesn’t process the data immediately. Instead, the request is queued. A unique ID is generated for the request and sent back to the consumer immediately. So a response looks like:

    <ExternalSubscriberExport ID="8CFDC883-88A5-43C2-ADC5-E80CB4BA7D16" />
    
Once the export has been processed, iMoneza calls the merchant-hosted callback function.

#### Callback: External Subscriber Export Completed

    GET {merchantCallbackURL}?CallbackType=ExternalSubscriberExportCompleted&CallbackToken={callbackToken}&ExternalSubscriberExportID={externalSubscriberExportID}
    
iMoneza makes a request against the merchant’s callback URL when an external subscriber export has completed.

#### Callback Result: Get External Subscriber Export Result

    GET /api/Property/{apiKey}/CallbackResult/{callbackToken}
    
After the merchant receives the callback, they can retrieve the callback result. It contains information about the external subscriber import, including any errors that occurred while processing.

Below is an example of the result data in XML format. The `<Subscribers>` element uses the same schema as the `<Subscribers>` element in XML file export.

Here’s an example in XML format:

    <Subscribers xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <Subscriber>
        <SubscriberKey>ABC-123</SubscriberKey>
        <Users>
          <User ApplicationUserID="43f4c9e1-00fe-4520-8311-929c5351a637">
            <DemographicFields>
              <DemographicField Name="EmailAddress">john.doe@fake.com</DemographicField>
              <DemographicField Name="PhoneNumber">555-555-5555</DemographicField>
            </DemographicFields>
            <Subscriptions>
              <Subscription>
                <SubscriptionKey>Digital-All-Access</SubscriptionKey>
                <ExpirationDate>2016-01-09T16:27:11.77</ExpirationDate>
              </Subscription>
            </Subscriptions>
          </User>
        </Users>
      </Subscriber>
    </Subscribers>
    
Here’s an example in JSON format:

    [
      {
        "SubscriberKey": "ABC-123",
        "Users": [
          {
            "ApplicationUserID": "43f4c9e1-00fe-4520-8311-929c5351a637",
            "DemographicFields": [
              {
                "Name": "EmailAddress",
                "Value": "john.doe@fake.com"
              },
              {
                "Name": "PhoneNumber",
                "Value": "555-555-5555"
              }
            ],
            "Subscriptions": [
              {
                "SubscriptionKey": "Digital-All-Access",
                "ExpirationDate": "2016-01-09T16:27:11.77"
              }
            ]
          }
        ]
      }
    ]
