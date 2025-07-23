# thingpark-oss-api-examples

Please update the constants at the beginning of the examples:
```javascript
const platform_hostname = 'community.thingpark.io';
const client_id = 'sub-XXXXXXXXX/YYY';
const client_secret = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```

The values of the `platform_hostname` constan can bee the following:

- Community: `community.thingpark.io`
- Europe: `thingparkenterprise.eu.actility.com`
- Australia: `thingparkenterprise.au.actility.com`
- United-States: `thingparkenterprise.us.actility.com`

Please study our [online docs on Service Accounts](https://docs.thingpark.com/thingpark-enterprise/latest/docs/user-guide/subscription/advanced-administration/manage-service-account) for generating the `client_id` and `client_secret` constants.

Then you can run the example scripts like this:
```javascript
node ./retrieve_dev_gw.js
```
