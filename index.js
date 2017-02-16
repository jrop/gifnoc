'use strict'

const fs = require('fs')
const _merge = require('lodash.merge')
const path = require('path')

module.exports = function gifnoc(dir, options) {
	dir = (dir && path.resolve(dir)) || path.dirname(require.main.filename)
	options = Object.assign({
		env: process.env.NODE_ENV || 'development',
		hostname: require('os').hostname(),
		username: require('os').userInfo().username,
	}, options)

	do {
		// try to load config at this location:
		try {
			const tryLoad = function(id) {
				try {return require(id)}
				catch (e) {return}
			}
			const paths = [
				require.resolve(path.join(dir, 'config')),
				path.join(dir, 'config', options.env),
				path.join(dir, 'config', options.hostname),
				path.join(dir, 'config', options.username),
			]
			return _merge({}, ...paths.map(tryLoad))
		} catch (e) {}

		// could not find config: continue on
		// cd ..:
		const nextDir = path.dirname(dir)
		if (dir == nextDir) break
		dir = nextDir
	} while (true)
}
