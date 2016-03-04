---
layout: documentation
title: Resource Management API | iMoneza Documentation
---
## Resource Management API

The Resource Management API exposes the following endpoints.

### GET PROPERTY

Format: `GET /api/Property/{propertyID}`

Returns basic settings about a property. This includes access model information, subscription groups, and pricing groups. An example (in JSON format) would look like:


	{ 
	 "Name": "WordPress Plugin Sandbox",  
	 "Title": "WordPress Plugin Sandbox",  
	 "DynamicallyCreateResources": false,  
	 "EnableQuota": true,  
	 "EnableSubscriptions": true,  
	 "EnableSinglePurchases": true,  
	 "FreeResourcesRequireAuthentication": false,  
	 "Quota": 2,
	 "QuotaPeriod": "Monthly",
	 "SubscriptionGroups": [
		{
		 "SubscriptionGroupID": "57f294fb-9e4e-4d54-bd9c-514d0165650a",
		 "Name": "Premium",
		 "Title": "Premium Subscription",
		 "Price": 10.00,
		 "Period": "Monthly"
		},
		{
		 "SubscriptionGroupID": "e3786c3e-f733-4777-a34f-d89fb48085e5",
		 "Name": "Default",
		 "Title": "Subscription",
		 "Price": 5.00,
		 "Period": "Monthly"
		}
	 ],
	 "PricingGroups": [
		{
		 "PricingGroupID": "a0dbe1be-eef9-4f2e-a10f-5a4c35ac2caa",
		 "Name": "Pay What You Want",
		 "IsDefault": false,
		 "PricingModel": "VariablePrice",
		 "Price": 0.00,
		 "ExpirationPeriodUnit": "Never",
		 "ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.00,
		"TargetConversionPriceFloor": 0.00,
		"TargetConversionHitsPerRecalculationPeriod": 0
		},
		{
		 "PricingGroupID": "ea45a17f-b4b3-474f-8871-b769bdfbebaf",
		 "Name": "Premium",
		 "IsDefault": false,
		 "PricingModel": "FixedPrice",
		 "Price": 1.00,
		 "ExpirationPeriodUnit": "Never",
		 "ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.00,
		"TargetConversionPriceFloor": 0.00,
		"TargetConversionHitsPerRecalculationPeriod": 0
		},
		{
		 "PricingGroupID": "d0cb0c67-743f-41e7-bd90-dc3991743f90",
		 "Name": "Default",
		 "IsDefault": true,
		 "PricingModel": "FixedPrice",
		 "Price": 0.50,
		 "ExpirationPeriodUnit": "Never",
		 "ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.00,
		"TargetConversionPriceFloor": 0.00,
		"TargetConversionHitsPerRecalculationPeriod": 0
		},
		{
		 "PricingGroupID": "f3a10c67-28b4-41e7-bd90-dc3991746cd4",
		 "Name": "Features",
		 "IsDefault": true,
		 "PricingModel": "TargetConversion",
		 "Price": 0.50,
		 "ExpirationPeriodUnit": "Never",
		 "ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.20,
		"TargetConversionPriceFloor": 0.05,
		"TargetConversionHitsPerRecalculationPeriod": 100
		}
	  ]
	}


As XML, the same response would look like:

	<Property xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	  <Name>WordPress Plugin Sandbox</Name>
	  <Title>WordPress Plugin Sandbox</Title>
	  <DynamicallyCreateResources>false</DynamicallyCreateResources>
	  <EnableQuota>true</EnableQuota>
	  <EnableSubscriptions>true</EnableSubscriptions>
	  <EnableSinglePurchases>true</EnableSinglePurchases>
	  <FreeResourcesRequireAuthentication>false</FreeResourcesRequireAuthentication>
	  <Quota>2</Quota>
	  <QuotaPeriod>Monthly</QuotaPeriod>
	  <SubscriptionGroups>
		<SubscriptionGroup>
		  <SubscriptionGroupID>57f294fb-9e4e-4d54-bd9c-514d0165650a</SubscriptionGroupID>
		  <Name>Premium</Name>
		  <Title>Premium Subscription</Title>
		  <Price>10.00</Price>
		  <Period>Monthly</Period>
		</SubscriptionGroup>
		<SubscriptionGroup>
		  <SubscriptionGroupID>e3786c3e-f733-4777-a34f-d89fb48085e5</SubscriptionGroupID>
		  <Name>Default</Name>
		  <Title>Subscription</Title>
		  <Price>5.00</Price>
		  <Period>Monthly</Period>
		</SubscriptionGroup>
	  </SubscriptionGroups>
	  <PricingGroups>
		<PricingGroup>
		  <PricingGroupID>a0dbe1be-eef9-4f2e-a10f-5a4c35ac2caa</PricingGroupID>
		  <Name>Pay What You Want</Name>
		  <IsDefault>false</IsDefault>
		  <PricingModel>VariablePrice</PricingModel>
		  <Price>0.00</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.00<TargetConversionRate>
		<TargetConversionPriceFloor>0.00</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>0</TargetConversionHitsPerRecalculationPeriod>
		</PricingGroup>
		<PricingGroup>
		  <PricingGroupID>ea45a17f-b4b3-474f-8871-b769bdfbebaf</PricingGroupID>
		  <Name>Premium</Name>
		  <IsDefault>false</IsDefault>
		  <PricingModel>FixedPrice</PricingModel>
		  <Price>1.00</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.00<TargetConversionRate>
		<TargetConversionPriceFloor>0.00</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>0</TargetConversionHitsPerRecalculationPeriod>
		</PricingGroup>
		<PricingGroup>
		  <PricingGroupID>d0cb0c67-743f-41e7-bd90-dc3991743f90</PricingGroupID>
		  <Name>Default</Name>
		  <IsDefault>true</IsDefault>
		  <PricingModel>FixedPrice</PricingModel>
		  <Price>0.50</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.00<TargetConversionRate>
		<TargetConversionPriceFloor>0.00</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>0</TargetConversionHitsPerRecalculationPeriod>
		</PricingGroup>
		<PricingGroup>
		  <PricingGroupID>d0cb0c67-743f-41e7-bd90-dc3991743f90</PricingGroupID>
		  <Name>Default</Name>
		  <IsDefault>true</IsDefault>
		  <PricingModel>FixedPrice</PricingModel>
		  <Price>0.50</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.00<TargetConversionRate>
		<TargetConversionPriceFloor>0.00</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>0</TargetConversionHitsPerRecalculationPeriod>
		</PricingGroup>
		<PricingGroup>
		  <PricingGroupID>f3a10c67-28b4-41e7-bd90-dc3991746cd4</PricingGroupID>
		  <Name>Features</Name>
		  <IsDefault>true</IsDefault>
		  <PricingModel>TargetConversion</PricingModel>
		  <Price>0.50</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.20</TargetConversionRate>
		<TargetConversionPriceFloor>0.05</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>100</TargetConversionHitsPerRecalculationPeriod>

	  </PricingGroups>
	</Property>

### GET ALL RESOURCES

Format: `GET /api/Property/{propertyID}/Resource`

Returns all the resources belonging to a property. An example would look like:

	[
	  {
		"Name": "Third Post",
		"ExternalKey": "13",
		"Active": true,
		"URL": "http://localhost:64653/?p=13",
		"Title": "Third Post",
		"Byline": "",
		"Description": "",
		"PublicationDate": "2014-07-07T16:08:30",
		"PricingGroup": {
		  "PricingGroupID": "a0dbe1be-eef9-4f2e-a10f-5a4c35ac2caa",
		  "Name": "Pay What You Want",
		  "IsDefault": false,
		  "PricingModel": "VariablePrice",
		  "Price": 0.00,
		  "ExpirationPeriodUnit": "Never",
		  "ExpirationPeriodValue": 0
		},
		"PricingModel": "Inherit",
		"Price": 0.00,
		"ExpirationPeriodUnit": "Never",
		"ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.00,
		"TargetConversionPriceFloor": 0.00,
		"TargetConversionHitsPerRecalculationPeriod": 0,
		"Property": null
	  },
	  {
		"Name": "Hello, world.",
		"ExternalKey": "1",
		"Active": true,
		"URL": "http://localhost:64653/?p=1",
		"Title": "Hello, world.",
		"Byline": "by Chris Wilson",
		"Description": "",
		"PublicationDate": "2014-06-13T09:35:07",
		"PricingGroup": {
		  "PricingGroupID": "d0cb0c67-743f-41e7-bd90-dc3991743f90",
		  "Name": "Default",
		  "IsDefault": true,
		  "PricingModel": "FixedPrice",
		  "Price": 0.50,
		  "ExpirationPeriodUnit": "Never",
		  "ExpirationPeriodValue": 0
		},
		"PricingModel": "Inherit",
		"Price": 0.00,
		"ExpirationPeriodUnit": "Never",
		"ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.00,
		"TargetConversionPriceFloor": 0.00,
		"TargetConversionHitsPerRecalculationPeriod": 0,
		"Property": null
	  }
	]

As XML, the same response would look like:

	<ArrayOfResource xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	  <Resource>
		<Name>Third Post</Name>
		<ExternalKey>13</ExternalKey>
		<Active>true</Active>
		<URL>http://localhost:64653/?p=13</URL>
		<Title>Third Post</Title>
		<Byline />
		<Description />
		<PublicationDate>2014-07-07T16:08:30</PublicationDate>
		<PricingGroup>
		  <PricingGroupID>a0dbe1be-eef9-4f2e-a10f-5a4c35ac2caa</PricingGroupID>
		  <Name>Pay What You Want</Name>
		  <IsDefault>false</IsDefault>
		  <PricingModel>VariablePrice</PricingModel>
		  <Price>0.00</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		</PricingGroup>
		<PricingModel>Inherit</PricingModel>
		<Price>0.00</Price>
		<ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		<ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.00<TargetConversionRate>
		<TargetConversionPriceFloor>0.00</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>0</TargetConversionHitsPerRecalculationPeriod>
	  </Resource>
	  <Resource>
		<Name>Hello, world.</Name>
		<ExternalKey>1</ExternalKey>
		<Active>true</Active>
		<URL>http://localhost:64653/?p=1</URL>
		<Title>Hello, world.</Title>
		<Byline>by Chris Wilson</Byline>
		<Description />
		<PublicationDate>2014-06-13T09:35:07</PublicationDate>
		<PricingGroup>
		  <PricingGroupID>d0cb0c67-743f-41e7-bd90-dc3991743f90</PricingGroupID>
		  <Name>Default</Name>
		  <IsDefault>true</IsDefault>
		  <PricingModel>FixedPrice</PricingModel>
		  <Price>0.50</Price>
		  <ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		  <ExpirationPeriodValue>0</ExpirationPeriodValue>
		</PricingGroup>
		<PricingModel>Inherit</PricingModel>
		<Price>0.00</Price>
		<ExpirationPeriodUnit>Never</ExpirationPeriodUnit>
		<ExpirationPeriodValue>0</ExpirationPeriodValue>
		<TargetConversionRate>0.00<TargetConversionRate>
		<TargetConversionPriceFloor>0.00</TargetConversionPriceFloor>
		<TargetConversionHitsPerRecalculationPeriod>0</TargetConversionHitsPerRecalculationPeriod>
	  </Resource>
	</ArrayOfResource>

### GET SINGLE RESOURCE

Format: `GET /api/Property/{propertyID}/Resource/{externalKey}`

Returns a resource, identified by an external key.

This call has an optional parameter called `includePropertyData`. If set to true, the settings for the property will also be returned.

An example of this response (in JSON format) without the `includePropertyData `parameter would look like:

	{
	  "Name": "Hello, world.",
	  "ExternalKey": "1",
	  "Active": true,
	  "URL": "http://localhost:64653/?p=1",
	  "Title": "Hello, world.",
	  "Byline": "by Chris Wilson",
	  "Description": "",
	  "PublicationDate": "2014-06-13T09:35:07",
	  "PricingGroup": {
		"PricingGroupID": "d0cb0c67-743f-41e7-bd90-dc3991743f90",
		"Name": "Default",
		"IsDefault": true,
		"PricingModel": "FixedPrice",
		"Price": 0.50,
		"ExpirationPeriodUnit": "Never",
		"ExpirationPeriodValue": 0
	  },
	  "PricingModel": "Inherit",
	  "Price": 0.00,
	  "ExpirationPeriodUnit": "Never",
	  "ExpirationPeriodValue": 0,
	  "TargetConversionRate": 0.00,
	  "TargetConversionPriceFloor": 0.00,
	  "TargetConversionHitsPerRecalculationPeriod": 0,
	  "Property": null
	}

The same response with the  `includePropertyData` parameter set to true would include the same data that would look like:

	{
	  "Name": "Hello, world.",
	  "ExternalKey": "1",
	  "Active": true,
	  "URL": "http://localhost:64653/?p=1",
	  "Title": "Hello, world.",
	  "Byline": "by Chris Wilson",
	  "Description": "",
	  "PublicationDate": "2014-06-13T09:35:07",
	  "PricingGroup": {
		"PricingGroupID": "d0cb0c67-743f-41e7-bd90-dc3991743f90",
		"Name": "Default",
		"IsDefault": true,
		"PricingModel": "FixedPrice",
		"Price": 0.50,
		"ExpirationPeriodUnit": "Never",
		"ExpirationPeriodValue": 0,
		"TargetConversionRate": 0.00,
		"TargetConversionPriceFloor": 0.00,
	   "TargetConversionHitsPerRecalculationPeriod": 0,
	  },
	  "PricingModel": "Inherit",
	  "Price": 0.00,
	  "ExpirationPeriodUnit": "Never",
	  "ExpirationPeriodValue": 0,
	  "TargetConversionRate": 0.00,
	  "TargetConversionPriceFloor": 0.00,
	  "TargetConversionHitsPerRecalculationPeriod": 0,
	  "Property": {
		"Name": "WordPress Plugin Sandbox",
		"Title": "WordPress Plugin Sandbox",
		"DynamicallyCreateResources": false,
		"EnableQuota": true,
		"EnableSubscriptions": true,
		"EnableSinglePurchases": true,
		"FreeResourcesRequireAuthentication": false,
		"Quota": 2,
		"QuotaPeriod": "Monthly",
		"SubscriptionGroups": [
		  {
			"SubscriptionGroupID": "57f294fb-9e4e-4d54-bd9c-514d0165650a",
			"Name": "Premium",
			"Title": "Premium Subscription",
			"Price": 10.00,
			"Period": "Monthly"
		  },
		  {
			"SubscriptionGroupID": "e3786c3e-f733-4777-a34f-d89fb48085e5",
			"Name": "Default",
			"Title": "Subscription",
			"Price": 5.00,
			"Period": "Monthly"
		  }
		],
		"PricingGroups": [
		  {
			"PricingGroupID": "d0cb0c67-743f-41e7-bd90-dc3991743f90",
			"Name": "Default",
			"IsDefault": true,
			"PricingModel": "FixedPrice",
			"Price": 0.50,
			"ExpirationPeriodUnit": "Never",
			"ExpirationPeriodValue": 0,
			"TargetConversionRate": 0.00,
			"TargetConversionPriceFloor": 0.00,
			"TargetConversionHitsPerRecalculationPeriod": 0
		  },
		  {
			"PricingGroupID": "a0dbe1be-eef9-4f2e-a10f-5a4c35ac2caa",
			"Name": "Pay What You Want",
			"IsDefault": false,
			"PricingModel": "VariablePrice",
			"Price": 0.00,
			"ExpirationPeriodUnit": "Never",
			"ExpirationPeriodValue": 0,
			"TargetConversionRate": 0.00,
			"TargetConversionPriceFloor": 0.00,
			"TargetConversionHitsPerRecalculationPeriod": 0
		  },
		  {
			"PricingGroupID": "ea45a17f-b4b3-474f-8871-b769bdfbebaf",
			"Name": "Premium",
			"IsDefault": false,
			"PricingModel": "FixedPrice",
			"Price": 1.00,
			"ExpirationPeriodUnit": "Never",
			"ExpirationPeriodValue": 0,
			"TargetConversionRate": 0.00,
			"TargetConversionPriceFloor": 0.00,
			"TargetConversionHitsPerRecalculationPeriod": 0
		  }
		]
	  }
	}

### PUT SINGLE RESOURCE

Format: `PUT /api/Property/{propertyID}/Resource/{externalKey}`

Saves a resource, identified by an external key. If a resource with the specified external key doesn’t exist, a new resource is created with that key. The content posted with this request would look like the same content received from a GET request to the same resource URI.

Only values that are supplied will be updated. For instance, if a Title field is included in the request body, then the Title field will be set to that value. If the field isn’t included, the existing field value will not be changed. The following request data would set just the title of the resource:

	{
  	"Title": "Hello, world."
	}

Some values cannot be updated with this call. For instance, the ExternalKey cannot be changed.

To change the pricing group that a resource belongs to, the pricing group ID should be sent. All other data sent in a `PricingGroup` object will be ignored – this call only changes data belonging to the resource, not data belonging to the pricing group. For instance, the following would change the pricing group:

	{
	  "PricingGroup": {
	    "PricingGroupID": "15bf02c5-d106-e411-acf1-bc305bd0d54e"
	  }
	}

Pricing tiers are stored as an array called `ResourcePricingTiers`. If that object is null or not-defined, pricing tiers are not updated; if that array is present, than all existing pricing tiers are replaced by the array. So if any pricing tiers are set, then all pricing tiers must be set. For example:

	{
	  "ExternalKey": "Article1",
	  "ResourcePricingTiers": [
		{
		  "Tier": 0,
		  "Price": 0.00
		},
		{
		  "Tier": 2,
		  "Price": 0.18
		},
		{
		  "Tier": 5,
		  "Price": 0.50
		},
		{
		  "Tier": 10,
		  "Price": 0.72
		}
	  ]
	}

