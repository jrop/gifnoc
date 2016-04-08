'use strict'

const path = require('path')
const _merge = require('lodash.merge')

function _req(file) {
	try {
		return require(file)
	} catch (e) {
		return { }
	}
}

function findRequire(dir, name) {
	dir = path.resolve(dir)
	let up
	while((up = path.dirname(dir)) != dir) {
		try {
			return require.resolve(path.join(dir, name))
		} catch (e) {
			dir = up
		}
	}
}

module.exports = function loader(startDir) {
	startDir = startDir || path.dirname(module.parent.filename)
	const configFile = findRequire(startDir, 'config')

	if (configFile) {
		const configMain = _req(configFile)
		if (path.basename(configFile).startsWith('index.')) {
			const env = process.env.NODE_ENV || 'development'
			const envFile = findRequire(startDir, path.join('config', env))
			if (envFile)
				return _merge({}, configMain, _req(envFile))
		}
		return configMain
	}
	return { }
}
