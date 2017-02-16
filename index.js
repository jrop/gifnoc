'use strict'

const fs = require('fs')
const _merge = require('lodash.merge')
const path = require('path')

function tryRequire(id) {
	let exists = false
	try {
		require.resolve(id)
		exists = true
	} catch (e) {}
	if (exists)
		return require(id)
}

module.exports = function gifnoc(dir, options) {
	dir = (dir && path.resolve(dir)) || path.dirname(require.main.filename)
	options = Object.assign({
		env: process.env.NODE_ENV || 'development',
		hostname: require('os').hostname(),
		username: require('os').userInfo().username,
	}, options)

	do {
		// try to load config at this location:
		let rootConfig
		try {rootConfig = tryRequire(path.join(dir, 'config'))} catch (e) {}

		if (rootConfig) {
			const paths = [
				path.join(dir, 'config', options.env),
				path.join(dir, 'config', options.hostname),
				path.join(dir, 'config', options.username),
			]
			return _merge({}, ...[rootConfig, ...paths.map(tryRequire)])
		}

		// could not find config: continue on
		// cd ..:
		const nextDir = path.dirname(dir)
		if (dir == nextDir) break
		dir = nextDir
	} while (true)
}
