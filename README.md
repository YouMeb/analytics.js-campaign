Campaign
========

```javascript
analytics.use(Campaign({
  events: {
    // 進入 /checkout 頁面時觸發事件，送 `campaign:checkout` 到後端
    '^/checkout(/?\\?.*)$': 'checkout'
  }
}));
```
