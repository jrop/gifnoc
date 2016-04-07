'use strict'

const co = require('co')
const findUp = require('find-up')
const path = require('path')
const _merge = require('lodash.merge')

function _req(file) {
	try {
		return require(file)
	} catch (e) {
		return { }
	}
}

module.exports = co.wrap(function * loader() {
	const parentDirName = path.dirname(module.parent.filename)
	const configFile = yield findUp('config/index.js', { cwd: parentDirName })

	if (configFile) {
		const env = process.env.NODE_ENV || 'development'
		const envFile = path.join(path.dirname(configFile), `${env}.js`)
		return _merge(_req(configFile), _req(envFile))
	}
	return { }
})
