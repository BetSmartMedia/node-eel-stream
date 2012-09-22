# eel-stream - EventEmitter logging -> writeable streams [![Build Status](https://secure.travis-ci.org/BetSmartMedia/node-eel-stream.png?branch=master)](http://travis-ci.org/BetSmartMedia/node-eel-stream)

An incredibly simple module, just 6 lines:

```javascript
module.exports = function (formatter, stream) {
	return function (entry) {
		var output = formatter(entry)
		if (!output) return
		stream.write(output + '\n')
	}
}
```

## Usage

Install it like this:

    npm install eel-stream

Use it like this:

```javascript
var fs  = require('fs')
var log = require('eel')
var handler = require('eel-stream')(JSON.stringify, fs.createWriteStream(__dirname+'/myapp.log'))

log.on('entry', handler)

log('test1', {ok: true})
log('test2', {ok: false})
```

And get log entries like this in `myapp.log`:

	{"type":"test1","level":"info","timestamp":"2012-06-28T18:48:01.249Z","ok":true}
	{"type":"test2","level":"info","timestamp":"2012-06-28T18:48:01.250Z","ok":false}

## Parameters

 * formatter: A callback with the signature (entry) -> String|Buffer
 * stream: A writable stream

## License

BSD
