# Summary.js #

![](https://api.travis-ci.org/Lian-D/Summary.JS.svg?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
 
 - [Demo](https://lian-d.github.io/Summary.js/)
 
 ## Main

 ```text
dist/
├── summary.js        (UMD)
├── summary_minfied.js    (UMD, compressed)
├── summary_legacy.js s (Old legacy summarizer)
└── summary_legacy_minfied.js    (Old legacy summarizer, compressed)
```
### Installation
Include files:

```html
<script src="/path/to/summary.js"></script>

```

### Usage
```js
summarize(text, sentences, keywordsInt);
```
where text is the input text
sentences is the number of sentences you want to return
keywordsInt is the number of keywords you want to factor in during the scoring process

This will return an object:
```js
{
keywords: an array of keywords,
text: the raw string summary
characterSummed: the number or words in this summary
characterOrig: the number of words in the original summary
reductionfactor: the % reduction factor
}
```


## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md).
