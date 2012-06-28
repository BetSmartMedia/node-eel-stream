module.exports = function (formatter, stream) {
	return function (entry) {
		var output = formatter(entry)
		if (!output) return
		stream.write(output + '\n')
	}
}
