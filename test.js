fs     = require('fs')
log    = require('eel')
assert = require('assert')

filename = __dirname + '/test.log'
stream = fs.createWriteStream(filename)
log.on('entry', require('./')(JSON.stringify, stream))

log('test1', {ok: true})
log('test2', {ok: false})

stream.on('drain', function () {
	stream.end()
	stream.on('close', function () {
		var data = fs.readFileSync(__dirname + '/test.log', 'utf8')
			.split('\n')
			.filter(Boolean)
			.map(function (e) {
				e = JSON.parse(e)
				assert(e.timestamp)
				delete e.timestamp
				return e
			})

		assert.deepEqual(data, [
			{'type': 'test1', 'level': 'info', 'ok': true},
			{'type': 'test2', 'level': 'info', 'ok': false}
		])
		console.log('1..1\nok - wrote to stream correctly')
		fs.unlinkSync(filename)
	})
})

