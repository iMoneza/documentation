---
title: API Documentation | iMoneza Documentation
---

## API Documentation

All of the publicly-accessible API's are documented on this page.  If you have any questions, have feedback or corrections,
please [contact us](http://imoneza.com/contact-us).

---

### Resource Access API

*The Resource Access API is used for access control, validating a user’s access to content.*

{% include swagger-block.html baseurl="https://accessapi.imoneza.com" swagger=site.data.accessapi %}

---

### Resource Management API

*This API is used for managing resource data, providing merchants access to certain resource-level configuration without needing to use the Management UI.*

{% include swagger-block.html baseurl="https://manageapi.imoneza.com" swagger=site.data.manageapi %}

---

**SPECIAL NOTES**

When executing a PUT request on a resource, it will either create or update the item.  Any subsequent calls with that external ID
will update only the parameters sent.  For example, if the next request contains only the `Title` property, all other properties
will remain the same, only the `Title` will be changed.  The `ExternalKey` cannot be changed with this request.

To change the pricing group that a resource belongs to, the pricing group ID should be sent. All other data sent in 
a `PricingGroup` object will be ignored.  For instance, the following would change the pricing group:

    {
      "PricingGroup": {
        "PricingGroupID": "15bf02c5-d106-e411-acf1-bc305bd0d54e"
      }
    }

Pricing tiers are stored as an array called `ResourcePricingTiers`. If that object is null or not-defined, pricing tiers 
are not updated; if that array is present, then all existing pricing tiers are replaced by the array. So if any pricing 
tiers are set, then all pricing tiers must be set. For example:

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