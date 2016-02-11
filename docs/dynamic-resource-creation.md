---
layout: documentation
title: Dynamic Resource Creation | iMoneza Documentation
---
## Dynamic Resource Creation

Dynamic resource creation can occur automatically without any additional data being required on the resource. It only occurs the first time an access attempt is made against a resource.

### HTML Tags

By default, iMoneza will use the HTML `title` tag and `meta name="description"` tags to populate the resource metadata. The following HTML code, for instance, would result in a resource with a title of “Test Resource” and a description of “This is a test resource.” Additionally, because the publication date and URL fields would be set based on the URL that was indexed and the time when the indexing occurred:

    <html>
        <head>
            <title>Test Resource</title>
            <meta name="description" content="This is a test resource." />
        </head>
        <body>
            This is the body.
        </body>
    </html>
    
### XML Metadata Blocks

A resource can include additional metadata that will get sent to iMoneza by including an XML block. Multiple XML blocks can occur on a resource, with those closest to the end of the page taking precedence. The XML blocks are only loaded the first time a consumer attempts to access a dynamic resource; subsequent changes to the data in the XML block will be ignored.

The XML block is included within an HTML script tag with a type of application/imoneza. The top level of the XML block is an element called Resource, which can include elements for:

* Name
* Title
* Description
* Byline
* PublicationDate
* PricingGroup
* PricingModel
* Price
* ExpirationPeriodUnit
* ExpirationPeriodValue
* TargetConversionRate
* TargetConversionPriceFloor
* TargetConversionHitsPerRecalculationPeriod
* ResourcePricingTiers
  * ResourcePricingTier
    * Tier
    * Price
    
All elements are optional. Any referenced pricing groups must already exist. If the `PricingModel` is “Inherit”, other pricing tags will be ignored. 

If there is bad data in a tag or a `PricingModel` or `PricingGroup` does not align with what is in the system, the resource will be made available and will not be managed by iMoneza. It is up to the merchant to provide correct information in the tags so the resources can be created and tracked by iMoneza.

Here’s a sample HTML page snippet with this XML block:

    <html>
    <head>
        <title>Sample Page</title>
        <script type="application/imoneza">
            <Resource>
                <Name>Sample Page</Name>
                <Title>Sample Page</Title>
                <Description> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id elementum ante, ut aliquet tortor. Curabitur a facilisis odio, eu iaculis dolor. Pellentesque condimentum ut enim et pulvinar.</Description>
                <Byline>by John Doe</Byline>
                <PricingGroup>Default</PricingGroup>
                <PricingModel>FixedPrice</PricingModel>
                <Price>1.50</Price>
            </Resource>
        </script>
    </head>
    <body>
       … additional content goes here …
    </body>
    </html>
