gifnoc
======

> Not your usual config

[![Build Status](https://travis-ci.org/jrop/gifnoc.svg?branch=master)](https://travis-ci.org/jrop/gifnoc)

A small utility that searches up for the nearest `config/index.js` file, and loads the contained configuration, merging any other relevant files:

* config/`NODE_ENV`.js
* config/`hostname`.js
* config/`username`.js
* Environment variables starting with "config": `config.something.somethingElse=value`
* CLI arguments starting with "--config": `--config.something.somethingElse=value`

## Installation

```sh
npm install --save gifnoc
# or
yarn add gifnoc
```

## Use

```js
const gifnoc = require('gifnoc')

const config = gifnoc(__dirname) // pass in where to start looking
// or
const config = gifnoc() // defaults to path.dirname(require.main.filename)
```

## License

ISC License (ISC)
Copyright (c) 2017, Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
