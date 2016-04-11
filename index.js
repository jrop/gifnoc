'use strict'

const path = require('path')
const _merge = require('lodash.merge')

function findRequire(dir, name) {
	let up
	while((up = path.dirname(dir)) != dir) {
		try {
			return require.resolve(path.join(dir, name))
		} catch (e) {
			dir = up
		}
	}
}

function cacheMiss(startDir) {
	const configFile = findRequire(startDir, 'config')

	if (configFile) {
		const configMain = require(configFile)
		if (path.basename(configFile).startsWith('index.')) {
			const env = process.env.NODE_ENV || 'development'
			const envFile = findRequire(startDir, path.join('config', env))
			if (envFile)
				return _merge({}, configMain, require(envFile))
		}
		return _merge({}, configMain)
	}
	return false
}

module.exports = function loader(startDir) {
	startDir = (startDir && path.resolve(startDir)) || path.dirname(require.main.filename)

	let res = module.exports.cache[startDir]
	if (res === undefined)
		res = module.exports.cache[startDir] = cacheMiss(startDir)
	if (res === false)
		throw new Error(`Could not find config from: ${startDir}`)

	return res
}
module.exports.cache = { }
