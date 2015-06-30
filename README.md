Campaign
========

```javascript
analytics.use(Campaign({
  events: {
    '^/checkout(/?\\?.*)$': 'checkout'
  }
}));
```
