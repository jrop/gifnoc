'use strict'

const flat = require('flat')
const fs = require('fs')
const minimist = require('minimist')
const path = require('path')
const userInfo = require('user-info')
const _merge = require('lodash.merge')
const _set = require('lodash.set')

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
		argv: process.argv.slice(2),
		env: process.env.NODE_ENV || 'development',
		envVars: process.env,
		hostname: require('os').hostname(),
		username: userInfo().username,
	}, options)

	do {
		// try to load config at this location:
		const rootConfig = tryRequire(path.join(dir, 'config'))
		if (rootConfig) {
			return _merge({}, ...[
				rootConfig,
				...[
					tryRequire(path.join(dir, 'config', options.env)),
					tryRequire(path.join(dir, 'config', options.hostname)),
					tryRequire(path.join(dir, 'config', options.username)),
				],
				flat.unflatten(options.envVars).config,
				minimist(options.argv).config,
			])
		}

		// could not find config: continue on
		// cd ..:
		const nextDir = path.dirname(dir)
		if (dir == nextDir) break
		dir = nextDir
	} while (true)
}
